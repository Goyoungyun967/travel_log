import DatePicker from "react-datepicker";

const SearchDate = (props) => {
  const { startDate, setStartDate, endDate, setEndDate, setSearch } = props;

  return (
    <div className="seller-search-dateApi">
      <div className="seller-dateApi">
        <div className="start-date-api">
          {/* -- startDate -- */}
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              console.log(1);
              setStartDate(date);
              console.log(date);
            }}
            selectedStart
            startDate={startDate}
            endDate={endDate}
            maxDate={endDate}
          />
        </div>
        <div>
          <span>~</span>
        </div>
        <div className="end-date-api">
          {/* -- endDate -- */}
          <DatePicker
            selected={endDate}
            onChange={(date) => {
              setEndDate(date);
            }}
            selectedEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            //   maxDate={endDate}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchDate;
