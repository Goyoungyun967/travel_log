import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccompanyFrm from "./AccompanyFrm";
import dayjs from "dayjs";
import { loginNoState } from "../utils/RecoilData";
import { useRecoilState } from "recoil";
import BoardUqillEditor from "./../utils/BoardUqillEditor";
import AccompanyDate from "./AccompanyDate";
import AccompanyComment from "./AccompanyComment";

const AccompanyWrite = () => {
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
  const [selectedArea, setSelectedArea] = useState([]);
  // 초기 일정 설정
  const startDay = dayjs().add(1, "day");
  const endDay = dayjs().add(2, "day");

  // 체크인 날짜, 체크아웃 날짜 상태 관리
  const [startDate, setStartDate] = useState(startDay.format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(endDay.format("YYYY-MM-DD"));

  console.log(startDate);
  console.log(endDate);

  // 날짜 변경 핸들러

  //타입
  const [accompanyType, setAccompanyType] = useState([
    { accompany_tag_no: 1, accompany_type: "부분 동행" },
    { accompany_tag_no: 2, accompany_type: "숙박 공유" },
    { accompany_tag_no: 3, accompany_type: "전체 동행" },
    { accompany_tag_no: 4, accompany_type: "투어 동행" },
    { accompany_tag_no: 5, accompany_type: "식사 동행" },
    { accompany_tag_no: 6, accompany_type: "공동 구매" },
  ]);

  const [selectedType, setSelectedType] = useState([]); //실제 바뀐 값

  const [daysDifference, setDaysDifference] = useState(0); // 날짜 차이 상태 관리

  const [accompanyContent, setAccompanyContent] = useState([]);
  const inputTitle = (e) => {
    setBoardTitle(e.target.value);
  };

  const inputContent = (e) => {
    setBoardContent(e.target.value);
  };
  const [accompanyArea, setAccompanyArea] = useState("1");

  // 빽으로 보내줘야하는것들 제목,기본 글,지역, 동행날짜 , 동행지역? ,동행내용
  console.log(accompanyContent);
  const writeBoard = () => {
    if (boardTitle !== "" && boardContent !== "") {
      const form = new FormData();
      form.append("boardTitle", boardTitle);
      form.append("boardContent", boardContent);
      form.append("boardArea", selectedArea);
      form.append("memberNo", loginNo);
      form.append("accompanyDate", daysDifference);
      form.append("accompanyContent", accompanyContent.join("&*&"));
      form.append("accompanyTagNo ", selectedType);
      form.append("accompanyArea", accompanyArea);
      form.append("startDay", dayjs(startDate).format("YYYY-MM-DD"));
      form.append("endDay", dayjs(endDate).format("YYYY-MM-DD"));

      //썸네일이 첨부된 경우에만 추가
      console.log(selectedArea);
      if (thumbnail !== null) {
        form.append("thumnail", thumbnail);
        console.log(thumbnail);
      }
      //첨부파일도 추가한 경우에만 추가 (첨부파일은 여러개가 같은 name으로 전송)
      for (let i = 0; i < boardFile.length; i++) {
        form.append("boardFile", boardFile[i]);
      }
      axios
        .post(`${backServer}/board/insertAccompany`, form, {
          headers: {
            contentType: "multipart/form-data",
            processData: false,
          },
        })
        .then((res) => {
          console.log(res);
          navigate("/board/list");
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            title: "에러",
            text: "원인찾아",
            icon: "error",
          });
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
        <AccompanyFrm
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
          startDate={startDate}
          endDate={endDate}
          setEndDate={setEndDate}
          setStartDate={setStartDate}
          accompanyType={accompanyType}
          setAccompanyType={setAccompanyType}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          accompanyContent={accompanyContent}
          setAccompanyContent={setAccompanyContent}
          daysDifference={daysDifference}
          setDaysDifference={setDaysDifference}
          accompanyArea={accompanyArea}
          setAccompanyArea={setAccompanyArea}
        />

        <div className="board-editer-wrap">
          <BoardUqillEditor
            className="board-UpilEditor"
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
export default AccompanyWrite;
