const AccompanyDate = () => {
  return (
    <div>
      <div className="accompany-map-title">
        <h4>동행 행선지</h4>
      </div>
      <div className="accompany-map">
        <BoardMap boardArea={boardArea} setBoardArea={setBoardArea} />
      </div>
    </div>
  );
};
export default AccompanyDate;
