import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const BookingInfo = () => {
  const { state } = useLocation();
  const backServer = process.env.REACT_APP_BACK_SERVER;
  //const bookNo = state.bookNo;
  const bookNo = 21;
  console.log("bookNo : " + bookNo);
  const [bookingInfo, setBookingInfo] = useState([]);
  useEffect(() => {
    axios
      .get(`${backServer}/booking/${bookNo}`)
      .then((res) => {
        console.log(res);
        setBookingInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const bookNoInfo = String(bookingInfo.bookNo).padStart(8, "0");

  return (
    <section className="section">
      <div className="booking-info-wrap">
        <div class="booking-container">
          <h2 class="booking-title">예약 현황</h2>
          <div class="booking-card">
            <div class="booking-item">
              <span class="booking-label">예약 번호:</span>
              <span class="booking-value" id="bookNo">
                {bookNoInfo}
              </span>
            </div>
            <div class="booking-item">
              <span class="booking-label">회원 ID:</span>
              <span class="booking-value" id="memberId">
                {bookingInfo.memberId}
              </span>
            </div>
            <div class="booking-item">
              <span class="booking-label">체크인 날짜:</span>
              <span class="booking-value" id="startDate">
                {bookingInfo.startDate}
              </span>
            </div>
            <div class="booking-item">
              <span class="booking-label">체크아웃 날짜:</span>
              <span class="booking-value" id="endDate">
                {bookingInfo.endDate}
              </span>
            </div>
            <div class="booking-item">
              <span class="booking-label">게스트 인원:</span>
              <span class="booking-value" id="guestCount">
                {bookingInfo.guestCount}명
              </span>
            </div>
            <div class="booking-item">
              <span class="booking-label">게스트 이름:</span>
              <span class="booking-value" id="guestName">
                {bookingInfo.guestName}
              </span>
            </div>
            <div class="booking-item">
              <span class="booking-label">전화번호:</span>
              <span class="booking-value" id="guestPhone">
                {bookingInfo.guestPhone}
              </span>
            </div>
            <div class="booking-item">
              <span class="booking-label">요청사항:</span>
              <span class="booking-value" id="guestRequest">
                {bookingInfo.guestRequest
                  ? bookingInfo.guestRequest
                  : "요청사항 없음"}
              </span>
            </div>
            <div class="booking-item">
              <span class="booking-label">숙소 이름:</span>
              <span class="booking-value">{bookingInfo.lodgmentName}</span>
            </div>
            <div class="booking-item">
              <span class="booking-label">숙소 주소:</span>
              <span class="booking-value" id="lodgmentAddr">
                {bookingInfo.lodgmentAddr}
              </span>
            </div>
            <div class="booking-item">
              <span class="booking-label">방 이름:</span>
              <span class="booking-value" id="roomName">
                {bookingInfo.roomName}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="booking-cancle">
        <button>예약 취소</button>
      </div>
    </section>
  );
};
export default BookingInfo;
