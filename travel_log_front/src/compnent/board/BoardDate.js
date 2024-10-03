import React, { useState, useEffect, useRef } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
import BoardDateSelector from "./date/BoardDateSelector";
import { ko } from "date-fns/locale";

const BoardDate = (props) => {
  const { startDate, setStartDate, endDate, setEndDate } = props;
  console.log(startDate, setStartDate, endDate, setEndDate);
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const datepickerRef = useRef(null);

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
          value={`${startDate ? format(startDate, "yyyy-MM-dd") : ""} ~ ${
            endDate ? format(endDate, "yyyy-MM-dd") : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
            setDateDropdownOpen((prev) => !prev);
          }}
          readOnly
        />
        {dateDropdownOpen && (
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={ko}>
            <div className="-board-datepicker-wrap">
              <BoardDateSelector
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
              />
            </div>
          </LocalizationProvider>
        )}
      </div>
    </td>
  );
};

export default BoardDate;
