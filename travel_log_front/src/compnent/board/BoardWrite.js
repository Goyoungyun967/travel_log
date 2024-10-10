import { useState } from "react";
import UqillEditor from "../utils/UqillEditor";
import "./board.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import BoardFrm from "./BoardFrm";
import { constructNow } from "date-fns";
import { useRecoilState } from "recoil";
import { loginNoState } from "../utils/RecoilData";
import BoardUqillEditor from "./../utils/BoardUqillEditor";
const BoardWrite = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [boardContent, setBoardContent] = useState("");
  const [loginNo, setLoginNo] = useRecoilState(loginNoState); //로그인한 회원 아이디값 (입력할게 아니기때문에 스테이트사용안함)
  const navigate = useNavigate();
  const [boardTitle, setBoardTitle] = useState(""); //사용자가 입력할 제목
  const [thumbnail, setThumbnail] = useState(null); //썸네일은 첨부파일로 처리
  const [boardFile, setBoardFile] = useState([]);
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
    { title: "전북" },
    { title: "제주" },
  ]);
  const [selectedArea, setSelectedArea] = useState("");

  const inputTitle = (e) => {
    setBoardTitle(e.target.value);
  };
  const inputContent = (e) => {
    setBoardContent(e.target.value);
  };
  console.log(thumbnail);
  const writeBoard = () => {
    const titleRegex = /^.{1,20}$/; // 제목: 1~20글자
    const contentRegex = /^.{1,1000}$/; // 글 내용: 1~1000글자

    let isValid = true; // 유효성 검사를 위한 플래그

    // 제목 유효성 검사
    if (!titleRegex.test(boardTitle)) {
      isValid = false;
      Swal.fire({
        title: "제목 유효성 검사 실패",
        text: "제목은 1~20글자 사이여야 합니다.",
        icon: "warning",
      });
    }

    // 글 내용 유효성 검사
    if (!contentRegex.test(boardContent) && boardContent != null) {
      isValid = false;
      Swal.fire({
        title: "내용 유효성 검사 실패",
        text: "내용은 1~1000글자 사이여야 합니다.",
        icon: "warning",
      });
    }
    console.log(thumbnail);

    // 유효성 검사가 통과하면 게시글 작성 진행
    if (isValid) {
      const form = new FormData();
      form.append("boardTitle", boardTitle);
      form.append("boardContent", boardContent);
      form.append("boardArea", selectedArea);
      form.append("memberNo", loginNo);

      // 썸네일이 첨부된 경우에만 추가
      if (thumbnail !== null) {
        form.append("thumbnail", thumbnail);
      }

      // 첨부파일도 추가한 경우에만 추가
      for (let i = 0; i < boardFile.length; i++) {
        form.append("boardFile", boardFile[i]);
      }

      axios
        .post(`${backServer}/board`, form, {
          headers: {
            "Content-Type": "multipart/form-data",
            processData: false,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data) {
            navigate("/board/list");
          } else {
            Swal.fire({
              title: "제목,내용은 필수 항목입니다.",
              text: "제목과 내용을 입력해주세요.",
              icon: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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
        <BoardFrm
          loginNo={loginNo}
          boardArea={boardArea}
          setBoardArea={setBoardArea}
          boardTitle={boardTitle}
          setBoardTitle={inputTitle}
          thumbnail={thumbnail}
          setThumbnail={setThumbnail}
          boardFile={boardFile}
          setBoardFile={setBoardFile}
          selectedArea={selectedArea}
          setSelectedArea={setSelectedArea}
        />
        <div className="board-editer-wrap">
          <BoardUqillEditor
            boardContent={boardContent}
            setBoardContent={setBoardContent}
          />
        </div>
        <div className="board-btn-zone">
          <button type="submit" className="boardWrite-btn">
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
};
export default BoardWrite;
