import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

const LodgmentRoomDetail = (props) => {
  //const [roomSearchList, setRoomSearchList] = useState([]);
  const roomSearchList = props.roomSearchList;
  console.log(roomSearchList);
  const BackServer = process.env.REACT_APP_BACK_SERVER;

  return (
    <div className="room-search-list-map">
      {roomSearchList.map((room, i) => {
        return (
          <div key={"room" + i} className="lodgment-loom-type">
            <table className="lodgment-loom-table">
              <tbody>
                <tr>
                  <td width={"40%"}>
                    <div className="lodgment-loom-type-img">
                      <Carousel>
                        {room.fileList.map((file, i) => {
                          return (
                            <Carousel.Item>
                              <img
                                key={"room" + file + i}
                                src={
                                  file.roomImg
                                    ? `${BackServer}/seller/room/${file.roomImg}`
                                    : "/image/default_img.png"
                                }
                              />
                            </Carousel.Item>
                          );
                        })}
                      </Carousel>
                    </div>
                  </td>
                  <td width={"60%"}>
                    <table>
                      <tbody>
                        <tr>{room.roomName}</tr>
                        <tr>기준 : {room.roomMaxCapacity} 명</tr>
                        <tr>00월 00일 00월 00일</tr>
                        <tr>가격 : {room.roomPrice}원</tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} style={{ textAlign: "right" }}>
                    {room.reservationstatus === "1" ? (
                      <button className="room-detail-btn">예약가능</button>
                    ) : room.reservationstatus === "2" ? (
                      <button className="room-detail-btn2">예약불가</button>
                    ) : (
                      "머지"
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default LodgmentRoomDetail;
