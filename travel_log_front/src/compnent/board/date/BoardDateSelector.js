import { DatePicker } from "@mui/x-date-pickers";

const BoardDateSelector = (props) => {
  const { startDate, setStartDate, endDate, setEndDate } = props;

  return (
    <div className="seller-search-dateApi">
      <div className="seller-dateApi">
        <div className="start-date-api">
          <DatePicker
            value={startDate}
            onChange={(date) => {
              setStartDate(date);
              if (endDate && date > endDate) {
                setEndDate(date); // 시작 날짜가 끝 날짜보다 크면 끝 날짜를 시작 날짜로 설정
              }
            }}
            renderInput={(params) => <input {...params} />}
          />
        </div>
        <div>
          <span>~</span>
        </div>
        <div className="end-date-api">
          <DatePicker
            value={endDate}
            onChange={(date) => {
              setEndDate(date);
            }}
            renderInput={(params) => <input {...params} />}
            minDate={startDate} // 시작 날짜 이후로만 선택 가능
          />
        </div>
      </div>
    </div>
  );
};

export default BoardDateSelector;
