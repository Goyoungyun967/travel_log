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

  const scrollContainerRef = useRef(null);
  const isMouseDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

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
          value={searchInput}
          onChange={boardAreaChange}
        />
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
  console.log(now);
  const regDate = new Date(accompany.regDate);
  const time = now - regDate;
  console.log(regDate);
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
  console.log(timeString);

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
                    src="/image/board_default_img.png"
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
                    src="/image/board_default_img.png"
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
                <div className="board-preview-text">
                  {accompany.boardContent}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccompanyList;
