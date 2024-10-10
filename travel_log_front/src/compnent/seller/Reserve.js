import { useEffect, useState } from "react";
import "./css/reserve.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const Reserve = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [bookInfo, setBookInfo] = useState({});
  const [guestRequest, setGuestRequest] = useState();
  const { bookNo } = useParams();
  // startDate를 Date 객체로 변환
  //   const endDate = new Date(bookInfo.endDate).toISOString().split("T")[0];

  useEffect(() => {
    axios
      .get(`${backServer}/seller/reserve/${bookNo}`)
      .then((res) => {
        setBookInfo(res.data);
        setGuestRequest(res.data.guestRequest);
      })
      .catch((err) => {});
  }, []);

  return (
    <div className="reserve-box-wrap box-radius">
      <h3>
        <span>{bookInfo.lodgmentName}</span> -{" "}
        <span>({bookInfo.roomName})</span>
      </h3>
      <div className="reserve-info">
        <div className="item-wrap">
          <div className="item">
            <h3>구매자명</h3>
            <span>{bookInfo.guestName}</span>
          </div>
          <div className="item">
            <h3>시작일 ~ 종료일</h3>
            <span>
              {bookInfo.startDate} ~ {bookInfo.endDate}
            </span>
          </div>
          <div className="item">
            <h3>결제일</h3>
            <span>{bookInfo.paymentDate}</span>
          </div>
          <div className="item">
            <h3>예약 인원수</h3>
            <span>{bookInfo.guestCount}</span>
            <span>명</span>
          </div>
          <div className="item">
            <h3>투숙객 전화번호</h3>
            <span>{bookInfo.guestPhone}</span>
          </div>
          <div className="item reserve">
            <h3>
              {bookInfo.status === 1
                ? "예약 중"
                : bookInfo.status === 2
                ? "이용 완료"
                : "예약취소"}
            </h3>
          </div>
        </div>
        <div className="item request-wrap">
          <h3>요청사항</h3>
          {guestRequest !== null ? (
            <div className="request-box">{bookInfo.guestRequest}</div>
          ) : (
            <div
              className="request-no"
              style={{ textAlign: "center", margin: "20px", color: "#ccc" }}
            >
              요청사항 없음
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reserve;
