import { useEffect, useRef, useState } from "react";
import "./board.css"; // 게시판 css
import SearchIcon from "@mui/icons-material/Search"; // 검색 아이콘 import
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"; //화살표
import PageNavi from "../utils/PageNavi"; //페이지 네비
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { useRecoilState } from "recoil";
import {
  isLoginState,
  loginNicknameState,
  loginNoState,
} from "../utils/RecoilData";
import Swal from "sweetalert2";

const AccompanyList = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [boardList, setBoardList] = useState([]);
  const [loginNo] = useRecoilState(loginNoState);
  const [searchInput, setSearchInput] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  const [accompanyList, setAccompanyList] = useState([]);
  const [loginNickname] = useRecoilState(loginNicknameState);
  const [isLogin] = useRecoilState(isLoginState);

  const [areaSearch, setAreaSearch] = useState([
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
  const [accompanyType, setAccompanyType] = useState([
    { accompany_tag_no: 1, accompany_type: "부분 동행" },
    { accompany_tag_no: 2, accompany_type: "숙박 공유" },
    { accompany_tag_no: 3, accompany_type: "전체 동행" },
    { accompany_tag_no: 4, accompany_type: "투어 동행" },
    { accompany_tag_no: 5, accompany_type: "식사 동행" },
    { accompany_tag_no: 6, accompany_type: "공동 구매" },
  ]);

  useEffect(() => {
    axios
      .get(`${backServer}/board/boardList/1/${reqPage}`)
      .then((res) => {
        setBoardList(res.data.list); // 일반 게시글
        setPi(res.data.pi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPage]);
  useEffect(() => {
    axios
      .get(`${backServer}/board/accompanyList/2/${reqPage}`)
      .then((res) => {
        console.log(res);
        setAccompanyList(res.data.list);
        setPi(res.data.pi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const boardAreaChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    setDropdownOpen(value.length > 0);
  };
  //검색 기능
  const handleAreaSelect = (selectedArea) => {
    setSearchInput(selectedArea.title); // 선택된 검색어로 입력 필드 업데이트
    setDropdownOpen(false); // 드롭다운 닫기

    // 선택된 지역 정보를 백엔드로 전송
    axios
      .post(`${backServer}/board/accompaySearch`, { area: selectedArea.title })
      .then((res) => {
        setBoardList(res.data);
        // 결과에 따른 후속 처리
      })
      .catch((error) => {
        console.error("지역 검색 실패:", error);
      });
  };

  return (
    <div className="board-list-wrap">
      <div className="search-box-wrap">
        {/* 검색박스 */}
        <span className="search-icon">
          <SearchIcon />
        </span>
        <input
          className="area-search-input"
          type="text"
          placeholder="지역검색"
          value={searchInput} // 입력된 검색어
          onChange={boardAreaChange} // 입력값 변경 시 호출
        />
        {dropdownOpen && (
          // 드롭다운 열림 여부에 따라 목록 표시
          <ul className="boardArea-popup">
            {areaSearch
              .filter((search) => search.title.includes(searchInput)) // 입력된 검색어와 일치하는 항목 필터링
              .map((search, i) => (
                <li key={i} onClick={() => handleAreaSelect(search)}>
                  {search.title}
                </li>
              ))}
          </ul>
        )}
      </div>

      <div className="board-preview-container">
        <div className="board-page-title flex-spbetw">
          <span>동행 게시판</span>
        </div>
        <div className="board-preview-wrap height-box">
          {accompanyList.map((accompany, i) => (
            <AccompanyItem
              key={"accompany-" + i}
              accompany={accompany}
              loginNickname={loginNickname}
              isLogin={isLogin}
            />
          ))}
        </div>
      </div>

      {/* <div className="board-paging-wrap">
        <PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
      </div> */}
      <div className="write-box">
        <Link to="/board/AccompanyWrite" className="accompany-write sub-item">
          동행 게시판 글 작성
        </Link>
        <Link to="/board/boardWrite" className="board-write sub-item">
          여행 게시판 글 작성
        </Link>
      </div>
    </div>
  );
};

const AccompanyItem = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const accompany = props.accompany;
  const navigate = useNavigate();
  const loginNickname = props.loginNickname;
  const isLogin = props.isLogin;

  //작성 시간
  const now = new Date();
  const regDate = new Date(accompany.regDate);
  const time = now - regDate;
  const seconds = Math.floor(time / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30.44);
  const years = Math.floor(months / 12);

  // 시간 포맷
  let timeString = "";
  if (years > 0) timeString = `${years}년 전`;
  else if (months > 0) timeString = `${months}달 전`;
  else if (days > 0) timeString = `${days}일 전`;
  else if (hours > 0) timeString = `${hours}시간 전`;
  else if (minutes > 0) timeString = `${minutes}분 전`;
  else timeString = `방금전`;
  return (
    <>
      {isLogin ? (
        <div
          className="boardList-preview"
          onClick={() =>
            navigate(
              `/board/AccompanyView/${accompany.boardNo}/${encodeURIComponent(
                timeString
              )}`
            )
          }
        >
          <div className="boardList-content">
            <div className="boardList-area text-medium">
              {accompany.boardArea}
            </div>
            <div className="board-memberIcon">
              <Container
                style={{
                  width: "350px",
                  margin: 0,
                  padding: "5px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Col xs={2} md={2} style={{ padding: 0 }}>
                  <Image
                    src={
                      accompany.memberImage
                        ? `${backServer}/member/profile/${accompany.memberImage}`
                        : "/image/lodgment_default_img.png"
                    }
                    className="member-img-circle"
                    roundedCircle
                  />
                </Col>
                <Col xs={10} md={10} style={{ padding: 0 }}>
                  <div className="board-memberId">
                    {accompany.memberNickname}
                  </div>
                  <div className="board-regDate text-min">{timeString}</div>
                </Col>
              </Container>
            </div>
            <div className="board-preview-content">
              <div className="board-preview-title">
                {accompany.boardTitle}

                <div className="boardList-preview-thumb">
                  <img
                    src={
                      accompany.boardThumb
                        ? `${backServer}/board/thumb/${accompany.boardThumb}`
                        : "/image/lodgment_default_img.png"
                    }
                    className="board-preview-thumb"
                  />
                </div>
              </div>
              <div
                className="accompany-content-text"
                dangerouslySetInnerHTML={{
                  __html:
                    accompany.boardContent.length > 10
                      ? accompany.boardContent.slice(0, 10) + "..."
                      : accompany.boardContent,
                }}
              ></div>
              <div className="accompany-type">
                <span>
                  동행 기간 : {accompany.startDay.split(" ")[0]} ~{"  "}
                  {accompany.endDay.split(" ")[0]}{" "}
                </span>
                <span>
                  {" "}
                  동행 유형 : {accompany.accompanyTypes.split(",").join(" / ")}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="boardList-preview"
          onClick={() => {
            Swal.fire({
              title: "로그인 후 이용 가능합니다",
              text: "로그인하세요",
              icon: "info",
            });
            navigate("/login");
          }}
        >
          <div className="boardList-content">
            <div className="boardList-area text-medium">
              {accompany.boardArea}
            </div>
            <div className="board-memberIcon">
              <Container
                style={{
                  width: "350px",
                  margin: 0,
                  padding: "5px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Col xs={2} md={2} style={{ padding: 0 }}>
                  <Image
                    src={
                      accompany.memberImage
                        ? `${backServer}/member/profile/${accompany.memberImage}`
                        : "/image/lodgment_default_img.png"
                    }
                    className="member-img-circle"
                    roundedCircle
                  />
                </Col>
                <Col xs={10} md={10} style={{ padding: 0 }}>
                  <div className="board-memberId">
                    {accompany.memberNickname}
                  </div>
                  <div className="board-regDate text-min">{timeString}</div>
                </Col>
              </Container>
            </div>
            <div className="board-preview-content">
              <div className="board-preview-title">
                <span>{accompany.boardTitle}</span>

                <div className="boardList-preview-thumb">
                  <img
                    src={
                      accompany.boardThumb
                        ? `${backServer}/board/thumb/${accompany.boardThumb}`
                        : "/image/lodgment_default_img.png"
                    }
                    className="board-preview-thumb"
                  />
                </div>
              </div>
              <div
                className="accompany-content-text"
                dangerouslySetInnerHTML={{
                  __html:
                    accompany.boardContent.length > 10
                      ? accompany.boardContent.slice(0, 10) + "..."
                      : accompany.boardContent,
                }}
              ></div>
              <div className="accompany-date-type">
                <span>
                  동행 기간 : {accompany.startDay.split(" ")[0]} ~{"  "}
                  {accompany.endDay.split(" ")[0]}{" "}
                </span>
                <span>
                  {" "}
                  동행 유형 : {accompany.accompanyTypes.split(",").join(" / ")}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccompanyList;
