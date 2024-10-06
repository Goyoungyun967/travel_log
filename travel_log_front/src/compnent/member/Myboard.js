const MyBoard = () => {
  return (
    <div className="mk-board-wrap">
      <div className="mk-board-title">
        <h4>나의 게시물</h4>
      </div>
      <table className="mk-board-table">
        <thead>
          <tr>
            <th className="mk-board-writer">작성자</th>
            <th className="mk-board-title">제목</th>
            <th className="mk-board-date">작성일</th>
          </tr>
        </thead>
        <tbody className="mk-board-list">
          <tr>
            <td className="mk-board-writer-list"></td>
            <td className="mk-board-title-list"></td>
            <td className="mk-board-date-list"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MyBoard;
