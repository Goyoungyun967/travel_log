const MyReservation = () => {
  const reservations = [
    { date: "2024-10-01", room: "숙소 A", writer: "홍길동", state: "확정" },
    { date: "2024-10-05", room: "숙소 B", writer: "김철수", state: "대기중" },
    { date: "2024-10-10", room: "숙소 C", writer: "이영희", state: "취소" },
  ];
  return (
    <div className="mk-reservation-wrap">
      <div className="mk-reservation-title">
        <h4>나의 예약정보</h4>
      </div>
      <table className="mk-reservation-table">
        <thead>
          <tr>
            <th className="mk-reservation-date">예약날짜</th>
            <th className="mk-reservation-room">숙소정보</th>
            <th className="mk-reservation-write">작성자</th>
            <th className="mk-reservation-state">상태</th>
          </tr>
        </thead>
        <tbody className="mk-reservation-list">
          <tr>
            <td className="mk-reservation-date-list">2024-10-01</td>
            <td className="mk-reservation-room-list">숙소 A</td>
            <td className="mk-reservation-write-list">홍길동</td>
            <td className="mk-reservation-state-list">확정</td>
          </tr>
        </tbody>
        {reservations.map((reservation, index) => (
          <tr key={index}>
            <td className="mk-reservation-date-list">{reservation.date}</td>
            <td className="mk-reservation-room-list">{reservation.room}</td>
            <td className="mk-reservation-write-list">{reservation.writer}</td>
            <td className="mk-reservation-state-list">{reservation.state}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default MyReservation;
