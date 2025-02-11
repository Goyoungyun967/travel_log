import { Backspace } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import BoardFrm from "./BoardFrm";
import { Quill } from "react-quill";
import BoardUqillEditor from "../utils/BoardUqillEditor";
import { loginNoState } from "../utils/RecoilData";
import Swal from "sweetalert2";
const BoardUpdate = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const boardNo = params.boardNo;
  const navigate = useNavigate();
  console.log(boardNo);

  const [boardTitle, setBoardTitle] = useState("");
  const [boardContent, setBoardContent] = useState("");
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

  const [loginNo, setLoginNo] = useRecoilState(loginNoState);

  //새로 전송하기 위한 state
  const [thumbnail, setThumbnail] = useState(null);
  const [boardFile, setBoardFile] = useState([]);
  //조회해온걸 화면에 보여주기 위한 state
  const [boardThumb, setBoardThumb] = useState(null);
  const [fileList, setFileList] = useState([]);
  //기존 첨부파일을 삭제하면 삭제한 파일 번호를 저장할 배열
  const [delBoardFileNo, setDelBoardFileNo] = useState([]);

  const inputTitle = (e) => {
    setBoardTitle(e.target.value);
  };
  useEffect(() => {
    axios
      .get(`${backServer}/board/boardNo/${boardNo}`)
      .then((res) => {
        console.log(res);
        setBoardThumb(res.data.boardThumb);
        setBoardTitle(res.data.boardTitle);
        setBoardContent(res.data.boardContent);
        setSelectedArea(res.data.boardArea);
        setFileList(res.data.fileList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(boardFile);
  const updateBoard = () => {
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

    // area 유효성 검사
    if (!selectedArea) {
      isValid = false;
      Swal.fire({
        title: "지역 유효성 검사 실패",
        text: "지역을 선택해야 합니다.",
        icon: "warning",
      });
    }
    if (isValid) {
      const form = new FormData();
      form.append("boardTitle", boardTitle);
      form.append("boardContent", boardContent);
      form.append("boardNo", boardNo);
      form.append("boardArea", selectedArea);
      if (boardThumb !== null) {
        form.append("boardThumb", boardThumb);
      }
      if (thumbnail !== null) {
        form.append("thumbnail", thumbnail);
      }
      for (let i = 0; i < boardFile.length; i++) {
        form.append("boardFile", boardFile[i]);
      }
      for (let i = 0; i < delBoardFileNo.length; i++) {
        form.append("delBoardFileNo", delBoardFileNo[i]);
      }
      axios
        .patch(`${backServer}/board`, form)
        .then((res) => {
          if (res.data) {
            navigate(`/board/list/`);
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
      <div className="write-page-title">여행 게시판 수정</div>
      <form
        className="board-write-frm"
        onSubmit={(e) => {
          e.preventDefault();
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
          boardThumb={boardThumb}
          setBoardThumb={setBoardThumb}
          fileList={fileList}
          setFileList={setFileList}
          boardFile={boardFile}
          setBoardFile={setBoardFile}
          selectedArea={selectedArea}
          setSelectedArea={setSelectedArea}
          delBoardFileNo={delBoardFileNo}
          setDelBoardFileNo={setDelBoardFileNo}
        />
        <div className="board-editer-wrap">
          <BoardUqillEditor
            boardContent={boardContent}
            setBoardContent={setBoardContent}
            dangerouslySetInnerHTML={{ __html: boardContent }}
          />
        </div>

        <div className="board-btn-zone">
          <button className="boardWrite-btn" onClick={updateBoard}>
            수정하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default BoardUpdate;
