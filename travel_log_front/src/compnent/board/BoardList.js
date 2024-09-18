import { useState } from "react";
import "./board.css"; // 게시판 css
import SearchIcon from "@mui/icons-material/Search"; // 검색 아이콘 import
import PersonIcon from "@mui/icons-material/Person"; //맴버 아이콘

const BoardList = () => {
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
    { title: "제주" },
  ]);

  const [searchInput, setSearchInput] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // 검색어 변경
  const boardAreaChange = (e) => {
    const value = e.target.value; //
    setSearchInput(value); //
    setDropdownOpen(value.length > 0); //
  };
  const toggleLodgmentDropdown = () => {
    setDropdownOpen(!dropdownOpen);
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

      <div className="area-box">{/* 지역 검색박스 */}</div>
      <div className="board-preview-container">
        <div className="board-page-title flex-spbetw">
          <span>최신 여행 동행</span>
          <span className="board-next">더보기=></span>
        </div>
        <div className="board-preview-wrap width-box">
          <div className="board-preview-list awbcss">
            <div className="board-preview-Thumb"></div>
            <div className="board-preview-content">
              <div className="board-preview-title">어쩌구 저쩌구</div>
              <div className="member flex-spbetw text-min">
                <div className="memberId-age-gender ">닉닉닉.28.남자</div>
                <div className="area">경상도</div>
              </div>
            </div>
          </div>
          <div className="board-preview-list awbcss">
            <div className="board-preview-Thumb"></div>
            <div className="board-preview-content">
              <div className="board-preview-title">어쩌구 저쩌구</div>
              <div className="member flex-spbetw text-min">
                <div className="memberId-age-gender text-min">
                  닉닉닉.28.남자
                </div>
                <div className="area">경상도</div>
              </div>
            </div>
          </div>
          <div className="board-preview-list awbcss">
            <div className="board-preview-Thumb"></div>
            <div className="board-preview-content">
              <div className="board-preview-title">어쩌구 저쩌구</div>
              <div className="member flex-spbetw text-min">
                <div className="memberId-age-gender text-min">
                  닉닉닉.28.남자
                </div>
                <div className="area">경상도</div>
              </div>
            </div>
          </div>
          <div className="board-preview-list awbcss">
            <div className="board-preview-Thumb"></div>
            <div className="board-preview-content">
              <div className="board-preview-title">어쩌구 저쩌구</div>
              <div className="member flex-spbetw text-min">
                <div className="memberId-age-gender text-min">
                  닉닉닉.28.남자
                </div>
                <div className="area">경상도</div>
              </div>
            </div>
          </div>
          <div className="board-preview-list awbcss">
            <div className="board-preview-Thumb"></div>
            <div className="board-preview-content">
              <div className="board-preview-title">어쩌구 저쩌구</div>
              <div className="board-member flex-spbetw text-min">
                <div className="memberId-age-gender text-min">
                  닉닉닉.28.남자
                </div>
                <div className="area">경상도</div>
              </div>
            </div>
          </div>
        </div>
        <div className="board-preview-container">
          <div className="board-page-title flex-spbetw">
            <span>최신 여행 게시판</span>
          </div>
          <div className="board-preview-wrap height-box">
            <div className="boardList-preview">
              <div className="boardList-content">
                <div className="boardList-area text-medium">서울</div>
                <div className="board-memberIcon">
                  <PersonIcon />
                  <div className="board-memberId">아이디</div>
                </div>
                <div className="board-regDate text-min">10일전</div>
                <div className="board-preview-content">
                  <div className="board-preview-text">asdasdadas내용내용</div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
        setDropdownOpen(false); // 선택 후 드롭다운 닫기
      }}
    >
      {searchTitle}
    </li>
  );
};

export default BoardList;
