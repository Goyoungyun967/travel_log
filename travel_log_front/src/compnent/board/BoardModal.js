import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./boardModal.css"; // CSS 파일 import
import dayjs from "dayjs";
import BoardDate from "./BoardDate";
import { useNavigate } from "react-router-dom";

const BoardModal = ({ show, handleClose, handleInput }) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  // 기본 날짜 세팅
  const startDay = dayjs().add(1, "day").toDate();
  const endDay = dayjs().add(2, "day").toDate();

  // 시작날짜, 끝 날짜
  const [startDate, setStartDate] = useState(startDay);
  const [endDate, setEndDate] = useState(endDay);

  const [boardArea, setBoardArea] = useState([
    { title: "서울" },
    { title: "경기" },
    { title: "부산" },
    { title: "대구" },
    { title: "인천" },
    { title: "대전" },
    { title: "광주" },
    { title: "울산" },
    { title: "세종" },
    { title: "강원" },
    { title: "충북" },
    { title: "충남" },
    { title: "경북" },
    { title: "경남" },
    { title: "전북" },
    { title: "제주" },
  ]);

  const [selectedArea, setSelectedArea] = useState("");

  const handleChange = (event) => {
    setSelectedArea(event.target.value);
  };

  const handleConfirm = () => {
    if (!selectedArea) {
      alert("지역을 선택하세요.");
      return;
    }
    if (dayjs(endDate).isBefore(dayjs(startDate))) {
      alert("끝 날짜는 시작 날짜 이후여야 합니다.");
      return;
    }

    const totalDays = dayjs(endDate).diff(dayjs(startDate), "day") + 1;
    handleInput({ startDate, endDate, inputValue, selectedArea, totalDays });
    handleClose();
    setInputValue("");

    navigate(
      `/board/accompanyWrite?startDate=${encodeURIComponent(
        startDate.toISOString()
      )}&endDate=${encodeURIComponent(
        endDate.toISOString()
      )}&selectedArea=${encodeURIComponent(
        selectedArea
      )}&totalDays=${totalDays}`
    );
  };

  return (
    <Modal show={show} onHide={handleClose} className="bottom-modal">
      <Modal.Header closeButton>
        <Modal.Title>동행 날짜 선택</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="accompany-date-wrap">
          <BoardDate
            startDate={startDate}
            endDate={endDate}
            setEndDate={setEndDate}
            setStartDate={setStartDate}
          />
        </div>
        <div>
          <div>
            <label htmlFor="area-select">지역 선택</label>
          </div>
          <div>
            <select
              id="area-select"
              value={selectedArea}
              onChange={handleChange}
            >
              <option value="">-- 선택하세요 --</option>
              {boardArea.map((area, index) => (
                <option key={index} value={area.title}>
                  {area.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          취소
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          다음
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BoardModal;
