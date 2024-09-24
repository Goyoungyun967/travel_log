import { useEffect, useRef, useState } from "react";
import "./board.css"; // 게시판 css
import SearchIcon from "@mui/icons-material/Search"; // 검색 아이콘 import
import PersonIcon from "@mui/icons-material/Person"; //맴버 아이콘
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"; //화살표
import PageNavi from "../utils/PageNavi"; //페이지 네비
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AccompanyWrite from "./AccompanyWrite";

const BoardList = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [boardList, setBoardList] = useState([]);
  const [accompanyList, setAccompanyList] = useState([]);

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
  const scrollContainerRef = useRef(null);
  //페이지
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  //스크롤
  const isMouseDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
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
  }, []);
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
            <BoardItem key={"board-" + i} board={board} />
          ))}
        </div>
        <div className="board-paging-wrap">
          <PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
        </div>
      </div>
      <div className="write-box">
        <Link to="/board/AccompanyWrite" className="accompany-write sub-item">
          동행 게시판 글 작성
        </Link>
        <Link to={`/board/boardWrite`} className="board-write sub-item-right">
          여행 게시판 글 작성
        </Link>
      </div>
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
  console.log(board);
  const navigate = useNavigate();
  return (
    // return 문으로 JSX 요소를 반환
    <div className="boardList-preview">
      <div
        className="boardList-content"
        onClick={() => {
          navigate(`/board/view/${board.boardNo}`); // 클릭 시 상세 페이지로 이동
        }}
      >
        <div className="boardList-area text-medium">{board.boardArea}</div>
        {/* 지역 표시 */}
        <div className="board-memberIcon">
          <PersonIcon />
          <div className="board-memberId">계정 아이디</div>
          {/* 사용자 아이디 */}
        </div>
        <div className="board-regDate text-min">{board.regDate}</div>
        {/* 등록 날짜 */}
        <div className="board-preview-content">
          <div className="board-preview-title">
            {board.boardContent} {/* 게시물 내용 */}
            <div className="boardList-preview-thumb">
              <img
                src={
                  board.boardThumb
                    ? `${backServer}/board/thumb/${board.boardThumb}` // 게시물 썸네일
                    : "/image/lodgment_default_img.png" // 기본 이미지
                }
                className="board-preview-thumb"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="like-comment-keep">
        <div className="board-like sub-item">좋아요</div>
        <div className="board-comment sub-item">댓글</div>
        <div className="board-keep sub-item-right">저장</div>
      </div>
    </div>
  );
};

export default BoardList;
