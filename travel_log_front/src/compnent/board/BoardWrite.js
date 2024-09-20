import { useState } from "react";
import UqillEditor from "../utils/UqillEditor";
import "./board.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import BoardFrm from "./BoardFrm";
const BoardWrite = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [boardContent, setBoardContent] = useState("");
  //   const [loginNo, setLoginNo] = useRecoilState(loginIdState); //로그인한 회원 아이디값 (입력할게 아니기때문에 스테이트사용안함)
  const navigate = useNavigate();
  const [boardTitle, setBoardTitle] = useState(""); //사용자가 입력할 제목
  const [thumbnail, setThumbnail] = useState(null); //썸네일은 첨부파일로 처리
  const [boardFile, setBoardFile] = useState([]);
  const inputTitle = (e) => {
    setBoardTitle(e.target.value);
  };
  const inputContent = (e) => {
    setBoardContent(e.target.value);
  };
  const writeBoard = () => {
    if (boardTitle !== "" && boardContent !== "") {
      const form = new FormData();
      form.append("boardTitle", boardTitle);
      form.append("boardContent", boardContent);
      //   form.append("boardWriter", loginId);
      //썸네일이 첨부된 경우에만 추가
      if (thumbnail !== null) {
        form.append("thumbnail", thumbnail);
      }
      //첨부파일도 추가한 경우에만 추가 (첨부파일은 여러개가 같은 name으로 전송)
      for (let i = 0; i < boardFile.length; i++) {
        form.append("boardFile", boardFile[i]);
      }
      axios
        .post(`${backServer}/board`, form, {
          headers: {
            contentType: "multipart/form-data",
            processData: false,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data) {
            navigate("/board/list");
          } else {
            Swal.fire({
              title: "에러",
              text: "원인찾아",
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
          // loginNo = {loginNo}
          boardTitle={boardTitle}
          setBoardTitle={inputTitle}
          thumbnail={thumbnail}
          setThumbnail={setThumbnail}
          boardFile={boardFile}
          setBoardFile={setBoardFile}
        />
        <div className="board-editer-wrap">
          <UqillEditor
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
