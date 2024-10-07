import Modal from "react-modal";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const CommentReportModal = ({ commentNo, memberNo, isOpen, onClose }) => {
  const [commmentReportType, setCommmentReportType] = useState("");
  const [commentReportContent, setCommentReportContent] = useState("");
  const backServer = process.env.REACT_APP_BACK_SERVER; // 백엔드 서버 주소

  const handleReportSubmit = () => {
    if (commmentReportType) {
      axios
        .post(`${backServer}/board/commentReport`, {
          commmentReportType,
          commentReportContent,
          commentNo,
          memberNo,
        })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "신고가 접수되었습니다.",
            confirmButtonText: "확인",
          });
          onClose(); // 모달 닫기
        })
        .catch((err) => {
          console.error("신고 중 오류 발생:", err);
          Swal.fire({
            icon: "error",
            title: "오류 발생",
            text: "신고 중 오류가 발생했습니다.",
            confirmButtonText: "확인",
          });
        });
    } else {
      Swal.fire({
        icon: "warning",
        title: "입력 오류",
        text: "신고 유형과 내용을 모두 입력해주세요.",
        confirmButtonText: "확인",
      });
    }
  };

  const handleClose = () => {
    setCommmentReportType(""); // 상태 초기화
    setCommentReportContent(""); // 상태 초기화
    onClose(); // 모달 닫기
  };

  return (
    <Modal
      className="board-Modal"
      isOpen={isOpen}
      onRequestClose={handleClose}
      ariaHideApp={false}
    >
      <h2 className="board-report-type-title">게시물 신고</h2>
      <div className="board-report-wrap">
        <label className="board-report-type">신고 유형</label>
        <select
          className="board-report-type-select"
          value={commmentReportType}
          onChange={(e) => setCommmentReportType(e.target.value)}
        >
          <option value="">선택</option>
          <option value="1">비속어</option>
          <option value="2">혐오성</option>
          <option value="3">광고성</option>
          <option value="4">기타</option>
        </select>
      </div>
      <div className="board-report-content-box">
        <label className="board-report-title">신고 내용</label>
        <textarea
          className="board-report-content"
          value={commentReportContent}
          onChange={(e) => setCommentReportContent(e.target.value)}
          placeholder="신고 사유를 작성해주세요."
        />
      </div>
      <button className="board-report-insert" onClick={handleReportSubmit}>
        신고 제출
      </button>
      <button className="board-no-report" onClick={handleClose}>
        취소
      </button>
    </Modal>
  );
};

export default CommentReportModal;
