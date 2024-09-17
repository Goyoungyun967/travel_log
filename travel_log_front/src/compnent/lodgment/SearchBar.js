import "./searchBar.css";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DatePicker from "react-datepicker";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import "react-datepicker/dist/react-datepicker.css"; // 달력 css
import dayjs from "dayjs";
import { format } from "date-fns";
import Swal from "sweetalert2";

const SearchBar = () => {
  const [lodgement, setLodgement] = useState("");
  const [guest, setGuest] = useState(2);
  const [lodgementSearch, setLodgementSearch] = useState([
    { title: "서울" },
    { title: "인천" },
    { title: "서울" },
    { title: "인천" },
    { title: "서울" },
    { title: "인천" },
  ]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [guestDropdownOpen, setGuestDropdownOpen] = useState(false);
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);

  //const today = dayjs().toDate();
  const startDay = dayjs().add(1, "day").toDate();
  const endDay = dayjs().add(2, "day").toDate();

  const [startDate, setStartDate] = useState(startDay);
  const [endDate, setEndDate] = useState(endDay);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (end) {
      setDateDropdownOpen(false);
    }
    if (end - start > 1123200000) {
      Swal.fire({
        icon: "error",
        title: "일정을 다시 선택해주세요.",
        text: "예약 기간은 최대 2주까지만 가능합니다.",
        confirmButtonText: "확인",
      });
    }
    //console.log(start);
    //console.log(end);
    //console.log(end - start);
  };

  const formattedStartDate = startDate ? format(startDate, "yyyy-MM-dd") : "";
  const formattedEndDate = endDate ? format(endDate, "yyyy-MM-dd") : "";

  const lodgementChange = (e) => {
    const value = e.target.value;
    setLodgement(value);
    setDropdownOpen(value.length > 0);
  };

  const handleOutsideClick = () => {
    setDropdownOpen(false);
    setGuestDropdownOpen(false);
    setDateDropdownOpen(false);
  };

  const toggleLodgmentDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleGuestDropdown = () => {
    setGuestDropdownOpen(!guestDropdownOpen);
  };

  const toggleDateDropdown = () => {
    setDateDropdownOpen(!dateDropdownOpen);
  };

  return (
    <section className="section lodgment-bar" onClick={handleOutsideClick}>
      <div className="lodgement-search-wrap">
        <form className="search-form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="table-wrap">
            <table className="search-table">
              <thead>
                <tr style={{ height: "30px" }}>
                  <th style={{ width: "30%" }}>여행지</th>
                  <th style={{ width: "30%" }}>일정</th>
                  <th style={{ width: "20%" }}>인원</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="search-left-wrap search">
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          if (dateDropdownOpen) {
                            toggleDateDropdown();
                          }
                          if (guestDropdownOpen) {
                            toggleGuestDropdown();
                          }
                        }}
                      >
                        <span className="search-icon">
                          <SearchIcon />
                        </span>
                        <input
                          className="search-input lodgment-input"
                          type="text"
                          placeholder="여행지, 숙소 검색"
                          value={lodgement}
                          onChange={lodgementChange}
                        />
                        {dropdownOpen && (
                          <ul className="lodgment-popup">
                            {lodgementSearch.map((search, i) => (
                              <SearchList
                                key={i}
                                search={search}
                                setLodgement={setLodgement}
                              />
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="search middle-search">
                      <CalendarMonthIcon />
                      <input
                        className="search-input date-input"
                        value={`${formattedStartDate} ~ ${formattedEndDate}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDateDropdown();
                          if (dropdownOpen) {
                            toggleLodgmentDropdown();
                          }
                          if (guestDropdownOpen) {
                            toggleGuestDropdown();
                          }
                        }}
                        readOnly
                      />
                      {dateDropdownOpen && (
                        <div
                          className="datepicker-wrap"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <DatePicker
                            dateFormat="yyyy-MM-dd" // 날짜 형식 설정
                            selected={startDate}
                            onChange={onChange}
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDay}
                            selectsRange
                            inline
                          />
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="search-right-wrap search">
                      <PersonIcon />
                      <input
                        className="search-input guest-input"
                        type="text"
                        value={`인원 ${guest}명`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleGuestDropdown();
                          if (dropdownOpen) {
                            toggleLodgmentDropdown();
                          }
                          if (dateDropdownOpen) {
                            toggleDateDropdown();
                          }
                        }}
                        readOnly
                      />
                      {guestDropdownOpen && (
                        <div
                          className="guest-popup"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <div className="minus-btn">
                            <RemoveIcon
                              onClick={() => {
                                if (guest > 1) {
                                  setGuest(guest - 1);
                                }
                              }}
                            />
                          </div>
                          <div>{guest}</div>
                          <div>
                            <AddIcon
                              onClick={() => {
                                setGuest(guest + 1);
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="search-btn-wrap">
              <button>숙소 검색</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

const SearchList = (props) => {
  const searchTitle = props.search.title;
  const setLodgement = props.setLodgement;
  return (
    <li
      onClick={() => {
        setLodgement(searchTitle);
      }}
    >
      {searchTitle}
    </li>
  );
};

export default SearchBar;
