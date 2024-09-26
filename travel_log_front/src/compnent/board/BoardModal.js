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

  const handleConfirm = () => {
    handleInput({ startDate, endDate, inputValue }); // 입력값 전달
    handleClose(); // 모달 닫기
    setInputValue(""); // 입력값 초기화
    navigate("/board/boardWrite"); // 경로 이동
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
