import "./searchBar.css";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DatePicker from "react-datepicker";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import "react-datepicker/dist/react-datepicker.css"; // 달력 css
import { format } from "date-fns";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchBar = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const lodgment = props.lodgment;
  const setLodgment = props.setLodgment;
  const guest = props.guest;
  const setGuest = props.setGuest;
  const startDate = props.startDate;
  const setStartDate = props.setStartDate;
  const endDate = props.endDate;
  const setEndDate = props.setEndDate;
  const startDay = props.startDay;
  const endDay = props.endDay;
  const onClick = props.onClick;

  const { searchRef } = props;

  const [lodgmentSearch, setLodgmentSearch] = useState([]);
  const [lodgmentSearchName, setLodgmentSearchName] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [guestDropdownOpen, setGuestDropdownOpen] = useState(false);
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
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
  };

  const formattedStartDate = startDate ? format(startDate, "yyyy-MM-dd") : "";
  const formattedEndDate = endDate ? format(endDate, "yyyy-MM-dd") : "";
  const lodgmentChange = (e) => {
    const value = e.target.value;
    setLodgment(value.trim());
    if (value.length > 0) {
      axios
        .get(`${backServer}/lodgment/search/${value}`)
        .then((res) => {
          setLodgmentSearch(res.data.list || []);
          setLodgmentSearchName(res.data.name || []);
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "서버 에러.",
            text: "잠시후에 다시 시도해주세요.",
            confirmButtonText: "확인",
          });
          navigate(`/`);
        });
    }

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
        <form
          className="search-form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="lodgment-table-wrap">
            <table className="lodgment-search-table">
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
                    <div className="search-left-wrap search-lodgment">
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
                          value={lodgment}
                          onChange={lodgmentChange}
                        />
                        {dropdownOpen && (
                          <ul className="lodgment-popup">
                            {lodgmentSearch.map((search, i) => (
                              <SearchList
                                key={i}
                                search={search}
                                setLodgment={setLodgment}
                                dropdownOpen={dropdownOpen}
                                setDropdownOpen={setDropdownOpen}
                              />
                            ))}

                            {lodgmentSearchName.map((searchName, i) => (
                              <SearchName
                                key={searchName + i}
                                search={searchName}
                                setLodgment={setLodgment}
                                dropdownOpen={dropdownOpen}
                                setDropdownOpen={setDropdownOpen}
                              />
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="search-lodgment middle-search">
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
                            minDate={new Date(Date.now() + 86400000)}
                            maxDate={new Date(Date.now() + 180 * 86400000)}
                            selectsRange
                            inline
                          />
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="search-right-wrap search-lodgment">
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
              <button type="button" ref={searchRef} onClick={onClick}>
                숙소 검색
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

const SearchList = (props) => {
  const searchTitle = props.search;
  const setLodgment = props.setLodgment;
  const dropdownOpen = props.dropdownOpen;
  const setDropdownOpen = props.setDropdownOpen;
  return (
    <li
      onClick={() => {
        setLodgment(searchTitle);
        setDropdownOpen(!dropdownOpen);
      }}
    >
      {searchTitle}
    </li>
  );
};

const SearchName = (props) => {
  const searchName = props.search;
  const setLodgment = props.setLodgment;
  const dropdownOpen = props.dropdownOpen;
  const setDropdownOpen = props.setDropdownOpen;
  return (
    <li
      onClick={() => {
        setLodgment(searchName);
        setDropdownOpen(!dropdownOpen);
      }}
    >
      {searchName}
    </li>
  );
};

export default SearchBar;
