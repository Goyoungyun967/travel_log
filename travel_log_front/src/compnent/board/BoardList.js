import { useEffect, useRef, useState } from "react";
import "./board.css"; // 게시판 css
import SearchIcon from "@mui/icons-material/Search"; // 검색 아이콘 import
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"; //화살표
import FavoriteIcon from "@mui/icons-material/Favorite"; // 채워진 하트
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // 빈 하트
import SaveIcon from "@mui/icons-material/Save"; //저장 모양
import PageNavi from "../utils/PageNavi"; //페이지 네비
import ChatBubbleIcon from "@mui/icons-material/ChatBubble"; //댓글
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import AccompanyWrite from "./AccompanyWrite";
import ModalInput from "./BoardModal";
import { useRecoilState } from "recoil";
import { loginNoState } from "../utils/RecoilData";

const BoardList = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [boardList, setBoardList] = useState([]);
  const [accompanyList, setAccompanyList] = useState([]);
  const [loginNo, setLoginNo] = useRecoilState(loginNoState);

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

  const [searchInput, setSearchInput] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  //페이지
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  //스크롤
  const scrollContainerRef = useRef(null);
  const isMouseDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  //모달
  const [showModal, setShowModal] = useState(false);
  const [currentLink, setCurrentLink] = useState("");
  // 검색어 변경
  const boardAreaChange = (e) => {
    const value = e.target.value; //
    setSearchInput(value); //
    setDropdownOpen(value.length > 0); //
  };
  const toggleLodgmentDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  //스크롤
  const handleMouseDown = (e) => {
    isMouseDownRef.current = true;
    startXRef.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isMouseDownRef.current = false;
  };

  const handleMouseUp = () => {
    isMouseDownRef.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isMouseDownRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 2; // 조정값 (속도)
    scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  //일반게시판 가져오기
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
  //동행 게시판
  useEffect(() => {
    axios
      .get(`${backServer}/board/accompanyList/2/${reqPage}`)
      .then((res) => {
        setAccompanyList(res.data.list); // 일반 게시글
        setPi(res.data.pi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // 더보기 누를때 마다 화면 타입으로 바꿔주기
  // const handleMoreClick = () => {
  //   setBoardType((prevType) => (prevType === 1 ? 2 : 1)); // 타입 토글
  // };

  // 모달창
  const handleLinkClick = (link) => {
    setCurrentLink(link); // 클릭한 링크 저장
    setShowModal(true); // 모달 열기
  };

  const handleModalClose = () => {
    setShowModal(false); // 모달 닫기
  };

  const handleInputValue = (inputValue) => {
    console.log(`입력된 값: ${inputValue}`);
    setShowModal(false); // 모달 닫기
    navigate(currentLink); // 저장된 링크로 이동
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
            {areaSearch.map((search, i) => (
              <SearchList
                key={i}
                search={search} // 검색 목록 아이템 전달
                setSearchInput={setSearchInput} // 선택 시 검색어 필드 업데이트
                setDropdownOpen={setDropdownOpen} // 선택 시 드롭다운 닫기
              />
            ))}
          </ul>
        )}
      </div>

      <div className="area-box">{/* 지역*/}</div>
      <div className="board-preview-container">
        <div className="board-page-title flex-spbetw">
          <span>최신 여행 동행</span>
          <span className="board-next">
            {/* onClick={handleMoreClick} */}
            더보기 <ArrowForwardIcon style={{ paddingBottom: "4px" }} />
          </span>
        </div>
        {/* 가로 리스트 출력 */}
        <div className="scrollable-container" ref={scrollContainerRef}>
          <div className="board-preview-wrap width-box">
            {accompanyList.map((accompany, i) => (
              <AccompanyItem key={"accompany-" + i} accompany={accompany} />
            ))}
          </div>
        </div>
        <div className="board-page-title flex-spbetw">
          <span>최신 여행 게시판</span>
        </div>
        <div className="board-preview-wrap height-box">
          {boardList.map((board, i) => (
            <BoardItem key={"board-" + i} board={board} loginNo={loginNo} />
          ))}
        </div>
      </div>
      <div className="board-paging-wrap">
        <PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
      </div>
      <div className="write-box">
        <div
          onClick={() => handleLinkClick("/board/AccompanyWrite")}
          className="accompany-write sub-item"
        >
          동행 게시판 글 작성
        </div>
        <Link to="/board/boardWrite" className="accompany-write sub-item">
          여행 게시판 글 작성
        </Link>
      </div>
      {/* 모달 추가 */}
      <ModalInput
        show={showModal}
        handleClose={handleModalClose}
        handleInput={handleInputValue}
      />
    </div>
  );
};

// SearchList 컴포넌트: 검색 결과 항목을 표시
const SearchList = (props) => {
  const searchTitle = props.search.title;
  const setSearchInput = props.setSearchInput;
  const setDropdownOpen = props.setDropdownOpen;
  return (
    <li
      onClick={() => {
        setSearchInput(searchTitle); // 선택된 검색어로 입력 필드 업데이트
        setDropdownOpen(false);
      }}
    >
      {searchTitle}
    </li>
  );
};

const AccompanyItem = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const accompany = props.accompany;

  const navigate = useNavigate();
  return (
    <div
      className="board-preview-list awbcss"
      onClick={() => {
        navigate(`/board/view${accompany.boardNo}`);
      }}
    >
      <div className="board-preview-thumb">
        <img
          src={
            accompany.boardThumb
              ? `${backServer}/board/thumb/${accompany.boardThumb}`
              : "/image/lodgment_default_img.png"
          }
        />
      </div>
      <div className="board-preview-content">
        <div className="board-preview-title">{accompany.boardTitle}</div>
        <div className="member flex-spbetw ">
          <div className="memberId-age-gender text-min">
            <span>회원아이디</span>
            <span>28</span>
            <span>남</span>
          </div>
          <div className="area text-min">{accompany.boardArea}</div>
        </div>
      </div>
    </div>
  );
};

const BoardItem = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const board = props.board;
  const memberNo = props.loginNo;
  const navigate = useNavigate();

  //작성 시간
  const now = new Date();
  console.log(now);
  const regDate = new Date(board.regDate);
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

  //날짜 계산
  ///${encodeURIComponent(timeString)

  //좋아요
  const [likeCount, setLikeCount] = useState(0); // 초기 좋아요 수
  const [isLiked, setIsLiked] = useState(false); // 좋아요를 눌렀는지 여부

  useEffect(() => {
    console.log(`좋아요 상태: ${isLiked}, 좋아요 수: ${likeCount}`);
  }, [isLiked, likeCount]);

  const likeClick = () => {
    if (isLiked) {
      // 좋아요 취소 요청
      axios
        .delete(`${backServer}/board/unlike/${board.boardNo}/${memberNo}`)
        .then((res) => {
          console.log(res);
          setLikeCount(likeCount - 1); // 좋아요 수 감소
          setIsLiked(false); // 좋아요 상태 변경
        })
        .catch((err) => {
          console.error("좋아요 취소 중 오류 발생:", err);
        });
    } else {
      // 좋아요 추가 요청
      axios
        .post(`${backServer}/board/like/${board.boardNo}/${memberNo}`)
        .then((res) => {
          console.log(res);
          setLikeCount(likeCount + 1); // 좋아요 수 증가
          setIsLiked(true); // 좋아요 상태 변경
        })
        .catch((err) => {
          console.error("좋아요 요청 중 오류 발생:", err);
        });
    }
  };

  return (
    <div className="boardList-preview">
      <div
        className="boardList-content"
        onClick={() => {
          navigate(
            `/board/view/${board.boardNo}/${encodeURIComponent(timeString)}`
          );
        }}
      >
        <div className="boardList-area text-medium">{board.boardArea}</div>
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
              <div className="board-memberId">{board.memberNickName}</div>
              <div className="board-regDate text-min">{timeString}</div>
            </Col>
          </Container>
        </div>
        <div className="board-preview-content">
          <div className="board-preview-title">
            {board.boardTitle}
            <div className="boardList-preview-thumb">
              <img
                src={
                  board.boardThumb
                    ? `${backServer}/board/thumb/${board.boardThumb}`
                    : "/image/lodgment_default_img.png"
                }
                className="board-preview-thumb"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="like-comment-keep">
        <div className="board-like sub-item" onClick={likeClick}>
          {board.likeCount === 0 ? (
            "좋아요"
          ) : (
            <>
              <FavoriteIcon /> {board.likeCount}
            </>
          )}
        </div>
        <div className="board-comment sub-item">
          {board.commentCount === 0 ? (
            "댓글"
          ) : (
            <>
              <ChatBubbleIcon /> {board.commentCount}
            </>
          )}
        </div>
        <div className="board-keep sub-item-right">
          {board.keepCount === 0 ? (
            "저장"
          ) : (
            <>
              <SaveIcon /> {board.keepCount}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardList;
