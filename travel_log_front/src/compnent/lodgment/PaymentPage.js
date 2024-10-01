import { useState } from "react";
import "./css/paymentPage.css";
import LodgmentDetailMapPayment from "./LodgmentDetailMapPayment";
import LodgmentLoomDetail from "./LodgmentRoomDetail";
import PayMentUserInfo from "./PaymentUserInfo";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";

const PaymentPage = () => {
  const BackServer = process.env.REACT_APP_BACK_SERVER;
  const { state } = useLocation();
  const navigate = useNavigate();

  // 투숙객 정보
  const [bookingInfo, setBookingInfo] = useState({
    guestName: "",
    guestPhone: "",
    guestReq: "",
  });

  // 투숙객 정보 입력 변환
  const valueChange = (e) => {
    const { name, value } = e.target;
    setBookingInfo((prev) => ({ ...prev, [name]: value }));
  };

  // 약관 동의
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeInfoSharing, setAgreeInfoSharing] = useState(false);

  // 체크인과 체크아웃 요일
  const checkInDay = new Date(state.checkIn).toLocaleString("ko-KR", {
    weekday: "long",
  });
  const checkOutDay = new Date(state.checkOut).toLocaleString("ko-KR", {
    weekday: "long",
  });

  //checkIn, checkOut 시간 계산
  const checkInClock =
    " " +
    state.lodgmentInfo.lodgmentCheckIn.slice(0, 2) +
    "시 " +
    state.lodgmentInfo.lodgmentCheckIn.slice(3, 5) +
    "분";
  const checkOutClock =
    " " +
    state.lodgmentInfo.lodgmentCheckOut.slice(0, 2) +
    "시 " +
    state.lodgmentInfo.lodgmentCheckOut.slice(3, 5) +
    "분";

  const nights = Math.ceil(
    (new Date(state.checkOut) - new Date(state.checkIn)) / (1000 * 60 * 60 * 24)
  ); // 숙박 일수 계산
  const totalPrice = nights * state.room.roomPrice;
  const priceTax = totalPrice * 0.1;
  const netAmount = totalPrice * 0.9;

  const dateString = Date.now(); // 현재 시간으로 고유 주문번호 생성

  // 결제 요청 함수
  const tossPay = () => {
    navigate("/lodgment/tossPayCheckout");
  };
  return (
    <section className="section">
      <div className="lodgment-payment-info-wrap">
        <h1>예약하기</h1>
        <div className="paymentPage-title"></div>
        <div className="lodgment-payment-img">
          <img
            src={
              state.lodgmentInfo.lodgmentImgPath
                ? `${BackServer}/seller/lodgment/${state.lodgmentInfo.lodgmentImgPath}`
                : "/image/default_img.png"
            }
            alt={state.lodgmentInfo.lodgmentName}
          />
        </div>
        <div className="lodgment-payment-detail-wrap">
          <table className="lodgment-payment-detail">
            <tbody>
              <tr style={{ height: "50px" }}>
                <td width={"100%"}>
                  <h1>{state.lodgmentInfo.lodgmentName}</h1>
                  <div className="booking-roomName">
                    <h2>{state.room.roomName}</h2>
                  </div>
                </td>
              </tr>
              <tr style={{ height: "50px" }}>
                <td>
                  <span>
                    체크인 : {state.checkIn} ({checkInDay}){checkInClock}
                  </span>
                  <h6>
                    체크아웃 : {state.checkOut} ({checkOutDay}){checkOutClock}
                  </h6>
                </td>
              </tr>
              <tr>
                <td></td>
              </tr>
            </tbody>
          </table>
          <div>
            <table className="lodgment-payment-detail">
              <tbody>
                <tr>
                  <th width={"80%"}>
                    <h5>
                      {state.guest}명 / {nights}박
                    </h5>
                  </th>
                  <td width={"20%"}>{netAmount} 원</td>
                </tr>
                <tr>
                  <th width={"80%"}>
                    <h5>세금 및 수수료</h5>
                  </th>
                  <td width={"20%"}>{priceTax} 원</td>
                </tr>
                <tr>
                  <th width={"80%"}>
                    <h5>총 결제 금액</h5>
                  </th>
                  <td width={"20%"}>{totalPrice} 원</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="lodgment-payment-info">
        <BookingLoom />
      </div>
      <div className="payment-user-info-wrap">
        <PayMentUserInfo valueChange={valueChange} />
      </div>

      <div className="terms-and-conditions">
        <h3>개인정보 수집 및 이용 동의 (필수)</h3>
        <label>
          <input
            type="checkbox"
            checked={agreePrivacy}
            onChange={() => setAgreePrivacy(!agreePrivacy)}
          />
          약관에 동의합니다.
        </label>
        <textarea className="terms-content">
          1.개인정보 수집 및 이용목적 상품 제공 계약의 성립, 계약 관련 동의 또는
          철회 본인 의사 확인, 대금환불, 고객상담 2.개인정보 수집 항목 예약자 및
          여행자 정보 : 이름, 이메일, 휴대폰번호, 영문이름(일부상품) 예약내역 :
          예약일자, 결제금액 추가 예약 정보 : 성별 (일부 상품), 생년월일(일부
          상품) 3. 보유 및 이용기간 회원 탈퇴시 까지(단, 관계 법령에 의해 보존할
          경우 그 의무기간 동안 별도 보관) ※ 동의를 거부할 권리 및 동의 거부에
          따른 불이익 개인정보 수집 및 이용에 대해 거부할 권리가 있으며, 동의를
          거부할 경우 상품 예약 및 서비스 이용이 불가함을 알려 드립니다.
        </textarea>
      </div>
      <div className="terms-and-conditions" readOnly>
        <h3>개인정보 제공 동의 (필수)</h3>
        <label>
          <input
            type="checkbox"
            checked={agreeInfoSharing}
            onChange={() => setAgreeInfoSharing(!agreeInfoSharing)}
          />
          약관에 동의합니다.
        </label>
        <textarea className="terms-content" readOnly>
          1.개인 정보를 제공받는자 2.제공하는 개인정보 항목 *예약자 및 여행자
          정보 : 이름, 이메일, 휴대폰번호, 영문이름(일부상품) 예약내역 :
          예약일자, 결제금액 추가 예약 정보 : 성별 (일부 상품), 생년월일(일부
          상품) 3.개인정보를 제공받는 자의 이용 목적 * 판매자와 구매자 거래,
          고객관리(고객상담/불만처리) 4. 보유 및 이용기간 * 여행 완료 후 5일까지
          ※ 동의를 거부할 권리 및 동의 거부에 따른 불이익 제3자제공 동의에 대해
          거부할 권리가 있으며, 동의를 거부할 경우 상품 예약 및 서비스 이용이
          불가함을 알려 드립니다..
        </textarea>
      </div>
      <div className="payment-action">
        <button disabled={!agreePrivacy || !agreeInfoSharing} onClick={tossPay}>
          결제하기
        </button>
      </div>
    </section>
  );
};

const BookingLoom = () => {
  // 필요한 내용 추가
};

export default PaymentPage;
