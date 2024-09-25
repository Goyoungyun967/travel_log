import { useEffect, useState } from "react";
import "./css/reserve.css";
import axios from "axios";

const Reserve = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [bookInfo, setBookInfo] = useState({});
  console.log(bookInfo);
  // startDate를 Date 객체로 변환
  const startDate = new Date(bookInfo.startDate).toISOString().split("T")[0];
  //   const endDate = new Date(bookInfo.endDate).toISOString().split("T")[0];

  useEffect(() => {
    axios
      .get(`${backServer}/seller/reserve/22`) // *** 일단 예약번호 1로 보냄 나중에 변경
      .then((res) => {
        console.log(res);
        setBookInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="reserve-box-wrap box-radius">
      <h3>
        <span>00호텔</span> - <span>(A객실)</span>
      </h3>
      <div className="reserve-info">
        <div className="item-wrap">
          <div className="item">
            <h3>구매자명</h3>
            <span>{bookInfo.guestName}</span>
          </div>
          <div className="item">
            <h3>시작일 ~ 종료일</h3>
            <span>{startDate} ~</span>
          </div>
          <div className="item">
            <h3>결제일</h3>
            <span>2024-02-01</span>
          </div>
          <div className="item">
            <h3>예약 인원수</h3>
            <span>4</span>
            <span>명</span>
          </div>
          <div className="item">
            <h3>투숙객 전화번호</h3>
            <span>010-0000-0000</span>
          </div>
          <div className="item reserve">
            <h3>예약 완료</h3>
          </div>
        </div>
        <div className="item request-wrap">
          <h3>요청사항</h3>
          <div className="request-box">요청 들어가는 곳</div>
        </div>
      </div>
    </div>
  );
};

export default Reserve;
