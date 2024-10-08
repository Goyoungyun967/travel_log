const MyComment = () => {
  return (
    <div className="mk-question-wrap">
      <div className="mk-question-title">
        <h4>나의 예약정보</h4>
      </div>
      <table className="mk-question-table">
        <thead>
          <tr>
            <th className="mk-question-date">문의 날짜</th>
            <th className="mk-question-room">문의 제목</th>
            <th className="mk-question-write">답변상태</th>
          </tr>
        </thead>
        <tbody className="mk-question-list">
          <tr>
            <td className="mk-question-date-list"></td>
            <td className="mk-question-title-list"></td>
            <td className="mk-question-state-list"></td>
          </tr>
        </tbody>
      </table>
      <div className="board-paging-wrap"></div>
    </div>
  );
};

export default MyComment;
