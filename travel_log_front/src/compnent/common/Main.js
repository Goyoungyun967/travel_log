import SearchBar from "../lodgment/SearchBar";
import React, { useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
//숙소 리코일
import { useRecoilState } from "recoil";
import {
  lodgmentState,
  guestState,
  startDateState,
  endDateState,
} from "../utils/RecoilData";

const Main = () => {
  const navigate = useNavigate();
  const [lodgment, setLodgment] = useRecoilState(lodgmentState);
  const [guest, setGuest] = useRecoilState(guestState);
  const [startDate, setStartDate] = useRecoilState(startDateState);
  const [endDate, setEndDate] = useRecoilState(endDateState);

  //const today = dayjs().toDate();
  //기본 날짜 세팅
  const startDay = dayjs().add(1, "day").toDate();
  const endDay = dayjs().add(2, "day").toDate();

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
    navigate("/lodgment/lodgmentList");
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
