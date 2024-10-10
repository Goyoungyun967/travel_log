import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useRecoilState } from "recoil";
import { loginNoState } from "../utils/RecoilData";

const LodgmentRoomDetail = (props) => {
  const navigate = useNavigate();
  const {
    roomSearchList = [],
    startDate,
    endDate,
    guest,
    lodgmentInfo,
  } = props; // 기본값을 빈 배열로 설정
  const BackServer = process.env.REACT_APP_BACK_SERVER;
  const checkIn =
    typeof startDate === "string"
      ? format(new Date(startDate), "yyyy-MM-dd")
      : "";
  const checkOut =
    typeof endDate === "string" ? format(new Date(endDate), "yyyy-MM-dd") : "";
  //console.log("startDate:", startDate); // 추가
  //console.log("endDate:", endDate); // 추가

  //console.log("Check-in:", checkIn); // 추가
  //console.log("Check-out:", checkOut); // 추가
  const [loginNo, setLoginNo] = useRecoilState(loginNoState);

  const bookingNow = (room) => {
    if (loginNo === -1) {
      Swal.fire({
        icon: "warning",
        title: "로그인을 해야 서비스 이용이 가능합니다.",
        confirmButtonText: "확인",
      });
    } else {
      Swal.fire({
        icon: "question",
        title: "해당 객실을 예약하겠습니까?",
        showCancelButton: true,
        confirmButtonText: "예",
        cancelButtonText: "아니오",
      }).then((res) => {
        if (res.isConfirmed) {
          navigate("/lodgment/paymentPage", {
            state: { room, guest, checkIn, checkOut, lodgmentInfo },
          });
        }
      });
    }
  };

  return (
    <div className="room-search-list-map">
      {roomSearchList.length === 0 ? (
        <p>예약 가능한 객실이 없습니다.</p>
      ) : (
        roomSearchList.map((room, i) => (
          <div key={"room" + i} className="lodgment-loom-type">
            <table className="lodgment-loom-table">
              <tbody>
                <tr>
                  <td width={"40%"}>
                    <div className="lodgment-loom-type-img">
                      <Carousel>
                        {room.fileList.map((file, j) => (
                          <Carousel.Item key={"file" + j}>
                            <img
                              src={
                                file.roomImg
                                  ? `${BackServer}/seller/room/${file.roomImg}`
                                  : "/image/default_img.png"
                              }
                              alt={room.roomName}
                            />
                          </Carousel.Item>
                        ))}
                      </Carousel>
                    </div>
                  </td>
                  <td width={"60%"}>
                    <table>
                      <tbody>
                        <tr>
                          <td>{room.roomName}</td>
                        </tr>
                        <tr>
                          <td>기준 : {room.roomMaxCapacity} 명</td>
                        </tr>
                        <tr>
                          <td>
                            {room.reservationstatus === "1" ? (
                              <span>
                                {format(new Date(startDate), "yyyy-MM-dd")} ~
                                {format(new Date(endDate), "yyyy-MM-dd")}
                              </span>
                            ) : room.reservationstatus === "2" ? (
                              <span>해당 날짜는 예약이 불가합니다</span>
                            ) : (
                              "머지"
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td>가격 : {room.roomPrice}원</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ textAlign: "right" }}>
                    {room.reservationstatus === "1" ? (
                      <button
                        className="room-detail-btn"
                        onClick={() => bookingNow(room)}
                      >
                        예약가능
                      </button>
                    ) : room.reservationstatus === "2" ? (
                      <button className="room-detail-btn2">예약불가</button>
                    ) : (
                      "서버 에러 관리자게에 문의 해주세요."
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default LodgmentRoomDetail;
