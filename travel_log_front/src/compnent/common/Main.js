import SearchBar from "../lodgment/SearchBar";
import React, { useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Main = () => {
  const navigate = useNavigate();
  //여행지, 숙소 검색
  const [lodgment, setLodgment] = useState("");
  //인원 검색
  const [guest, setGuest] = useState(2);

  //const today = dayjs().toDate();
  //기본 날짜 세팅
  const startDay = dayjs().add(1, "day").toDate();
  const endDay = dayjs().add(2, "day").toDate();

  //체크인 날짜 , 체크아웃 날짜
  const [startDate, setStartDate] = useState(startDay);
  const [endDate, setEndDate] = useState(endDay);

  const lodgementSearchBtn = () => {
    if (!lodgment) {
      Swal.fire({
        icon: "error",
        title: "여행지, 숙소를 입력해주세요.",
        confirmButtonText: "확인",
      });
      return;
    }
    // 유효한 검색이 이루어졌다면 다음 페이지로 이동
    navigate("/lodgment/lodgmentList", {
      state: { lodgment, guest, startDate, endDate },
    });
  };
  return (
    <div className="section">
      <SearchBar
        lodgment={lodgment}
        setLodgment={setLodgment}
        guest={guest}
        setGuest={setGuest}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        startDay={startDay}
        endDay={endDay}
        onClick={lodgementSearchBtn}
      />
    </div>
  );
};

export default Main;
