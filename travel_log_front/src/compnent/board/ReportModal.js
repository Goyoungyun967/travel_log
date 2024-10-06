import Modal from "react-modal";
import { useState } from "react";
import axios from "axios";

const ReportModal = ({ boardNo, memberNo, isOpen, onClose }) => {
  const [reportType, setReportType] = useState("");
  const [reportContent, setReportContent] = useState("");
  const backServer = process.env.REACT_APP_BACK_SERVER; // 백엔드 서버 주소

  const handleReportSubmit = () => {
    if (reportType) {
      axios
        .post(`${backServer}/board/report`, {
          reportType,
          reportContent,
          boardNo,
          memberNo,
        })
        .then(() => {
          alert("신고가 접수되었습니다.");
          onClose(); // 모달 닫기
        })
        .catch((err) => {
          console.error("신고 중 오류 발생:", err);
        });
    } else {
      alert("신고 유형과 내용을 모두 입력해주세요.");
    }
  };

  return (
    <Modal
      className="board-Modal"
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
    >
      <h2 className="board-report-type-title">게시물 신고</h2>
      <div className="board-report-wrap">
        <label className="board-report-type">신고 유형</label>
        <select
          className="board-report-type-select"
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
        >
          <option value="">선택</option>
          <option value="1">비속어</option>
          <option value="2">혐오성</option>
          <option value="3">광고성</option>
        </select>
      </div>
      <div className="board-report-content-box">
        <label className="board-report-title">신고 내용</label>
        <textarea
          className="board-report-content"
          value={reportContent}
          onChange={(e) => setReportContent(e.target.value)}
          placeholder="신고 사유를 작성해주세요."
        />
      </div>
      <button className="board-report-insert" onClick={handleReportSubmit}>
        신고 제출
      </button>
      <button className="board-no-report" onClick={onClose}>
        취소
      </button>
    </Modal>
  );
};

export default ReportModal;
