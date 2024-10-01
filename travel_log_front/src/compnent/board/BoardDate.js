import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { ko } from "date-fns/locale"; // 한국어 로케일 import
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css"; // 날짜 피커 스타일

const BoardDate = (props) => {
  const { startDate, setStartDate, endDate, setEndDate } = props;
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const datepickerRef = useRef(null);

  const onChange = (start) => {
    const end = new Date(start);

    // 기본적으로 1일 후로 설정
    end.setDate(start.getDate() + 1);

    // 최대 10일로 설정
    if (end > new Date(start.getTime() + 10 * 24 * 60 * 60 * 1000)) {
      end.setDate(start.getDate() + 10);
    }

    setStartDate(start);
    setEndDate(end);
    setDateDropdownOpen(false);
  };

  const formattedStartDate = startDate ? format(startDate, "yyyy-MM-dd") : "";
  const formattedEndDate = endDate ? format(endDate, "yyyy-MM-dd") : "";

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
              minDate={new Date()} // 현재 날짜 이상으로 설정
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
