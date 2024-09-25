import BoardDate from "./BoardDate";
import BoardMap from "./map/BoardMap";

const AccompanyFrm = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const accompanyDate = props.accompanyDate;
  const setAccompanyDate = props.setAccompanyDate;
  const accompanyType = props.accompanyType;
  const setAccompanyType = props.setAccompanyType;
  // const accompanyArea = props.accompanyArea;
  // const setAccompanyArea = props.setAccompanyArea;
  // const accompanyContent = props.accompanyContent;
  // const setAccompanyContent = props.setAccompanyContent;
  //지역input된 지역 정보
  const boardArea = props.boardArea;
  const setBoardArea = props.setBoardArea;
  //날짜
  const startDate = props.startDate;
  const endDate = props.endDate;
  const setEndDate = props.setEndDate;
  const setStartDate = props.setStartDate;
  //<div className="accompany-schedule"></div>;
  return (
    <div>
      <div className="accompany-info-wrap">
        <div className="accompany-date-container">
          <div className="accompany-date-title">동행 날짜 입력</div>
          <div className="accompany-date-wrap">
            <BoardDate
              startDate={startDate}
              endDate={endDate}
              setEndDate={setEndDate}
              setStartDate={setStartDate}
            />
          </div>
        </div>
        <div className="accompany-area-wrap"></div>
      </div>
    </div>
  );
};
export default AccompanyFrm;
