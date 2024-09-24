import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { ko } from "date-fns/locale"; // 한국어 로케일 import
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css"; // 날짜 피커 스타일

const BoardDate = (props) => {
  const startDate = props.startDate;
  const setStartDate = props.setStartDate;
  const endDate = props.endDate;
  const setEndDate = props.setEndDate;
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const datepickerRef = useRef(null); // 날짜 선택기 참조

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if (end) {
      setDateDropdownOpen(false);
    }
    if (end - start > 1123200000) {
      // 2주(14일)
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

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datepickerRef.current &&
        !datepickerRef.current.contains(event.target)
      ) {
        setDateDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <td>
      <div className="board-date-wrap" ref={datepickerRef}>
        <CalendarMonthIcon />
        <input
          className="board-date-input"
          value={`${formattedStartDate} ~ ${formattedEndDate}`}
          onClick={(e) => {
            e.stopPropagation();
            setDateDropdownOpen(!dateDropdownOpen);
          }}
          readOnly
        />
        {dateDropdownOpen && (
          <div className="-board-datepicker-wrap">
            <DatePicker
              dateFormat="yyyy-MM-dd"
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()} // 현재 날짜 이상으로 설정
              selectsRange
              inline
              locale={ko} // 한국어 로케일 설정
            />
          </div>
        )}
      </div>
    </td>
  );
};

export default BoardDate;
