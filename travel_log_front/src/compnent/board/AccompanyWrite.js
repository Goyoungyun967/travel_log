import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";
import BoardFrm from "./BoardFrm";
import UqillEditor from "../utils/UqillEditor";
import { useNavigate } from "react-router-dom";
import AccompanyFrm from "./AccompanyFrm";
import dayjs from "dayjs";

const AccompanyWrite = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [boardContent, setBoardContent] = useState("");
  //   const [loginNo, setLoginNo] = useRecoilState(loginIdState); //로그인한 회원 아이디값 (입력할게 아니기때문에 스테이트사용안함)
  const navigate = useNavigate();
  const [boardTitle, setBoardTitle] = useState(""); //사용자가 입력할 제목
  const [thumbnail, setThumbnail] = useState(null); //썸네일은 첨부파일로 처리
  const [boardFile, setBoardFile] = useState([]);
  //동행 일정
  //기본 날짜 세팅
  const startDay = dayjs().add(1, "day").toDate();
  const endDay = dayjs().add(2, "day").toDate();
  //시작날짜 , 끝 날짜
  const [startDate, setStartDate] = useState(startDay);
  const [endDate, setEndDate] = useState(endDay);

  //동행 일정 정보
  const [accompanyDate, setAccompanyDate] = useState("");
  const [accompanyType, setAccompanyType] = useState([
    { title: "부분 동행" },
    { title: "숙박 공유" },
    { title: "전체 동행" },
    { title: "투어 동행" },
    { title: "식사 동행" },
    { title: "공동 구매" },
  ]);
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
  const [accompanyArea, setAccompanyArea] = useState("");
  const [accompanyContent, setAccompanyContent] = useState("");
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
        .post(`${backServer}/accompany`, form, {
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
      <div className="write-page-title">동행 게시글 작성</div>
      <form
        className="board-write-frm"
        onSubmit={(e) => {
          e.preventDefault();
          writeBoard();
        }}
      >
        <BoardFrm
          // loginNo = {loginNo}
          boardArea={boardArea}
          setBoardArea={setBoardArea}
          boardTitle={boardTitle}
          setBoardTitle={inputTitle}
          thumbnail={thumbnail}
          setThumbnail={setThumbnail}
          boardFile={boardFile}
          setBoardFile={setBoardFile}
        />
        <div className="board-accompany-wrap">
          <AccompanyFrm
            accompanyDate={accompanyDate}
            setAccompanyDate={setAccompanyDate}
            accompanyType={accompanyType}
            setAccompanyType={setAccompanyType}
            // accompanyArea={accompanyArea}
            // setAccompanyArea={setAccompanyArea}
            // accompanyContent={accompanyContent}
            // setAccompanyContent={setAccompanyContent}
            startDate={startDate}
            endDate={endDate}
            setEndDate={setEndDate}
            setStartDate={setStartDate}
          />
        </div>
        <div className="board-editer-wrap">
          <UqillEditor
            boardContent={boardContent}
            setBoardContent={setBoardContent}
          />
        </div>

        <div className="board-btn-zone">
          <button type="submit" className="boardWrite-btn">
            동행 일정 등록
          </button>
        </div>
      </form>
    </div>
  );
};
export default AccompanyWrite;
