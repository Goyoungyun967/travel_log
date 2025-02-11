import { Backspace } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Quill } from "react-quill";
import BoardUqillEditor from "../utils/BoardUqillEditor";
import { loginNoState } from "../utils/RecoilData";
import AccompanyFrm from "./AccompanyFrm";
import dayjs from "dayjs";
import Swal from "sweetalert2";

const AccompanyUpdate = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const boardNo = params.boardNo;
  const updateNo = params.updateNo;
  const navigate = useNavigate();

  console.log(boardNo);
  const [loginNo, setLoginNo] = useRecoilState(loginNoState);
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
    { title: "전남" },
    { title: "제주" },
  ]);
  const [selectedArea, setSelectedArea] = useState("");

  // 새로 전송하기 위한 state
  const [thumbnail, setThumbnail] = useState(null);
  const [boardFile, setBoardFile] = useState([]);

  // 조회해온 걸 화면에 보여주기 위한 state
  const [boardThumb, setBoardThumb] = useState(null);
  const [fileList, setFileList] = useState([]);

  // 기존 첨부파일을 삭제하면 삭제한 파일 번호를 저장할 배열
  const [delBoardFileNo, setDelBoardFileNo] = useState([]);

  const inputTitle = (e) => {
    setBoardTitle(e.target.value);
  };

  const [accompanyType, setAccompanyType] = useState([
    { accompany_tag_no: 1, accompany_type: "부분 동행" },
    { accompany_tag_no: 2, accompany_type: "숙박 공유" },
    { accompany_tag_no: 3, accompany_type: "전체 동행" },
    { accompany_tag_no: 4, accompany_type: "투어 동행" },
    { accompany_tag_no: 5, accompany_type: "식사 동행" },
    { accompany_tag_no: 6, accompany_type: "공동 구매" },
  ]);

  // 초기 일정 설정
  const startDay = dayjs().add(1, "day");
  const endDay = dayjs().add(2, "day");

  // 체크인 날짜, 체크아웃 날짜 상태 관리
  const [startDate, setStartDate] = useState(startDay.format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(endDay.format("YYYY-MM-DD"));

  const [selectedType, setSelectedType] = useState([]); // 실제 바뀐 값
  const [daysDifference, setDaysDifference] = useState(0); // 날짜 차이 상태 관리
  const [accompanyContent, setAccompanyContent] = useState([]);

  const inputContent = (e) => {
    setBoardContent(e.target.value);
  };

  const [accompanyArea, setAccompanyArea] = useState("1");

  useEffect(() => {
    axios
      .get(`${backServer}/board/accompanyNo/${boardNo}`)
      .then((res) => {
        console.log(res.data);
        setBoardThumb(res.data.boardThumb);
        setBoardTitle(res.data.boardTitle);
        setBoardContent(res.data.boardContent);
        setSelectedArea(res.data.boardArea);
        setFileList(res.data.fileList);
        setStartDate(res.data.startDay);
        setEndDate(res.data.endDay);
        setDaysDifference(res.data.accompanyDate);
        setSelectedType(res.data.accompanyTypeTags);

        // accompanyContent가 배열이 아닐 경우 처리
        const accompanyContentArray = Array.isArray(res.data.accompanyContent)
          ? res.data.accompanyContent
          : res.data.accompanyContent.split("&*&").map((type) => type.trim());

        // 각 요소를 개별적으로 상태에 설정
        setAccompanyContent(accompanyContentArray);
        console.log(accompanyContentArray); // 변환된 배열 출력
      })
      .catch((err) => {
        console.log(err);
      });
  }, [backServer, boardNo]); // backServer와 boardNo를 의존성 배열에 추가

  const updateBoard = () => {
    let isValid = true; // 유효성 검사를 위한 플래그

    const titleRegex = /^.{1,20}$/; // 제목: 1~20글자
    const contentRegex = /^.{1,1000}$/; // 내용: 1~1000글자

    // 제목 유효성 검사
    if (!titleRegex.test(boardTitle)) {
      isValid = false;
      Swal.fire({
        title: "제목을 입력해주세요.",
        text: "제목은 1~20글자 사이여야 합니다.",
        icon: "warning",
      });
    }

    // 내용 유효성 검사
    if (!contentRegex.test(boardContent)) {
      isValid = false;
      Swal.fire({
        title: "글내용을 입력해주세요.",
        text: "내용은 1~1000글자 사이여야 합니다.",
        icon: "warning",
      });
    }
    // 지역 유효성 검사
    if (!selectedArea) {
      isValid = false;
      Swal.fire({
        title: "지역을 선택해주세요.",
        text: "지역을 선택해야 합니다.",
        icon: "warning",
      });
    }

    // 동행 지역 유효성 검사
    if (!accompanyArea) {
      isValid = false;
      Swal.fire({
        title: "동행 지역선택해주세요",
        text: "동행 지역을 선택해야 합니다.",
        icon: "warning",
      });
    }

    // 시작일과 종료일 유효성 검사
    if (!startDate || !endDate) {
      isValid = false;
      Swal.fire({
        title: "동행 날짜를 입력해주세요",
        text: "시작일과 종료일을 다 입력해야 합니다.",
        icon: "warning",
      });
    }
    if (!selectedType) {
      isValid = false;
      Swal.fire({
        title: "동행 유형을 입력해주세요",
        text: "동행 유형을 하나 이상 선택해주세요.",
        icon: "warning",
      });
    }
    if (isValid) {
      const form = new FormData();
      form.append("boardTitle", boardTitle);
      form.append("boardContent", boardContent);
      form.append("boardNo", boardNo);
      form.append("memberNo", loginNo);
      form.append("boardArea", selectedArea);
      form.append("accompanyDate", daysDifference);
      form.append("accompanyContent", accompanyContent.join("&*&"));
      form.append("accompanyArea", accompanyArea);
      form.append("startDay", dayjs(startDate).format("YYYY-MM-DD"));
      form.append("endDay", dayjs(endDate).format("YYYY-MM-DD"));

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
      for (let i = 0; i < selectedType.length; i++) {
        form.append("accompanyTagNo", selectedType[i].accompanyTagNo);
      }
      axios
        .patch(`${backServer}/board/AccompanyUpdate`, form)
        .then((res) => {
          if (res.data) {
            navigate(`/board/list/`);
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
          fileList={fileList}
          setFileList={setFileList}
          updateNo={updateNo}
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

export default AccompanyUpdate;
