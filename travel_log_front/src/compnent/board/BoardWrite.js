import { useState } from "react";
import UqillEditor from "../utils/UqillEditor";
import "./board.css";
const BoardWrite = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [areaSelect, setAreaSelect] = useState([
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

  const writeBoard = () => {};
  return (
    <div className="write-content-wrap">
      <div className="write-page-title">여행 게시글 작성</div>
      <form
        className="board-write-frm"
        onSubmit={(e) => {
          e.preventDefault();
          writeBoard();
        }}
      >
        <UqillEditor />
        <div className="select-area-wrap"></div>
      </form>
    </div>
  );
};
export default BoardWrite;
