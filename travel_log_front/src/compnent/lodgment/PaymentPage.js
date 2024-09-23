import { useState } from "react";
import "./css/paymentPage.css";
import LodgmentDetailMapPayment from "./LodgmentDetailMapPayment";
import LodgmentLoomDetail from "./LodgmentRoomDetail";
import PayMentUserInfo from "./PaymentUserInfo";

const PaymentPage = () => {
  const [guest, setGuest] = useState({
    guestName: "",
    guestPhone: "",
    guestReq: "",
  });

  const [agree, setAgree] = useState(false);

  return (
    <section className="section">
      <div className="lodgment-payment-info-wrap">
        <div className="lodgment-payment-img">
          <img src="/image/nesthotel.jpg" alt="임시사진" />
        </div>
        <div className="lodgment-payment-detail-wrap">
          <table className="lodgment-payment-detail">
            <tbody>
              <tr style={{ height: "50px" }}>
                <td width={"100%"}>업체명</td>
              </tr>
              <tr style={{ height: "50px" }}>
                <td>00월 00일 00월 00일</td>
              </tr>
              <tr>
                <td>
                  <LodgmentDetailMapPayment />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="lodgment-payment-info">
        <LodgmentLoomDetail />
      </div>
      <div className="payment-user-info-wrap">
        <PayMentUserInfo guest={guest} setGuest={setGuest} />
      </div>

      <div className="terms-and-conditions">
        <h3>약관 동의</h3>
        <label>
          <input
            type="checkbox"
            checked={agree}
            onChange={() => setAgree(!agree)}
          />
          약관에 동의합니다.
        </label>
        <textarea className="terms-content">
          개인정보 보호 약관 개인정보의 수집 및 이용 목적 본 서비스는 고객님의
          개인정보를 다음과 같은 목적으로 수집 및 이용합니다: 예약 확인 및 관리
          고객 문의 응대 서비스 제공 및 결제 처리 서비스 개선 및 통계 분석
          수집하는 개인정보 항목 고객님의 개인정보는 다음과 같이 수집합니다:
          이름 연락처 (전화번호) 이메일 주소 예약 정보 개인정보의 보유 및 이용
          기간 고객님의 개인정보는 수집 및 이용 목적이 달성된 후에는 지체 없이
          파기됩니다. 단, 관련 법령에 따라 보존해야 하는 경우는 예외로 합니다.
          개인정보의 제3자 제공 고객님의 개인정보를 제3자에게 제공하지 않으며,
          법령에 의해 요구되는 경우를 제외하고는 사전 동의 없이 개인정보를
          제공하지 않습니다. 개인정보 보호 고객님의 개인정보를 안전하게 보호하기
          위해 필요한 기술적 및 관리적 조치를 시행합니다. 권리와 의무 고객님은
          언제든지 개인정보의 열람, 정정, 삭제를 요구할 수 있으며, 요청 시 즉시
          조치하겠습니다.
        </textarea>
      </div>

      <div className="payment-action">
        <button disabled={!agree}>결제하기</button>
      </div>
    </section>
  );
};

export default PaymentPage;
