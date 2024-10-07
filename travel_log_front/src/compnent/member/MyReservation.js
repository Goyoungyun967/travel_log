import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isLoginState, loginNoState } from "../utils/RecoilData";
import { useNavigate } from "react-router-dom";

const MyReservation = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [booking, setBooking] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  const [memberNo, setMemberNo] = useRecoilState(loginNoState);
  useEffect(() => {
    axios
      .get(`${backServer}/member/booking/list/${memberNo}/${reqPage}`)
      .then((res) => {
        console.log(res);
        setBooking(res.data.list);
        setPi(res.data.pi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPage]);
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
          {booking.map((booking, i) => {
            return <BookingItem key={"booking" + i} booking={booking} />;
          })}
        </tbody>
      </table>
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
        navigate(`/lodgment/bookingInfo/${booking.bookingNo}`);
      }}
    >
      <td className="mk-reservation-date-list">{booking.paymentDate}</td>
      <td className="mk-reservation-room-list">{booking.roomName}</td>
      <td className="mk-reservation-write-list">{booking.businessName}</td>
      <td className="mk-reservation-state-list">
        {getStatusText(booking.status)}
      </td>
    </tr>
  );
};
export default MyReservation;
