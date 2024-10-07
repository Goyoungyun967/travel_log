import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  bookingListState,
  isLoginState,
  loginNoState,
} from "../utils/RecoilData";
import { useNavigate } from "react-router-dom";
import PageNavi from "../utils/PageNavi";

const MyReservation = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [booking, setBooking] = useRecoilState(bookingListState);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  const [memberId, setMemberId] = useRecoilState(loginNoState);

  useEffect(() => {
    axios
      .get(`${backServer}/member/booking/list/${memberId}/${reqPage}`)
      .then((res) => {
        console.log(res);
        setBooking(res.data.list);
        setPi(res.data.pi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPage, memberId, setBooking]);
  return (
    <div className="mk-reservation-wrap">
      <div className="mk-reservation-title">
        <h4>나의 예약정보</h4>
      </div>
      <table className="mk-reservation-table">
        <thead>
          <tr>
            <th className="mk-reservation-date">예약날짜</th>
            <th className="mk-reservation-room">숙소명</th>
            <th className="mk-reservation-write">방 정보</th>
            <th className="mk-reservation-state">상태</th>
          </tr>
        </thead>
        <tbody className="mk-reservation-list">
          {booking.map((booking, i) => {
            return <BookingItem key={"booking" + i} booking={booking} />;
          })}
        </tbody>
      </table>
      <div className="board-paging-wrap">
        <PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
      </div>
    </div>
  );
};
const BookingItem = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const booking = props.booking;
  const navigate = useNavigate();

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "예약 중";
      case 2:
        return "이용 완료";
      case 3:
        return "예약 취소";
      default:
        return "알 수 없음";
    }
  };

  return (
    <tr
      onClick={() => {
        //여기 링크만 좀 걸어주세요 ~

        navigate(`/lodgment/bookingInfo`, {
          state: { bookNo: booking.bookingNo },
        });
      }}
    >
      <td className="mk-reservation-date-list">{booking.paymentDate}</td>
      <td className="mk-reservation-write-list">{booking.lodgmentName}</td>
      <td className="mk-reservation-room-list">{booking.roomName}</td>
      <td className="mk-reservation-state-list">
        {getStatusText(booking.status)}
      </td>
    </tr>
  );
};
export default MyReservation;
