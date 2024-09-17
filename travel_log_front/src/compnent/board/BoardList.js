import "./board.css";

const BoardList = () => {
  return (
    <section className="section board-list">
      <div className="search-box"></div>
      <div className="area-box"></div>
      <div className="accompany-box">
        <div className="accompany-title gnIvoe">
          최신 여행 동행
          <span className="accompany-next">더보기 ></span>
        </div>
      </div>
      <div className="accompany-list"></div>
    </section>
  );
};
export default BoardList;
