import { useEffect, useState } from "react";
import "./css/lodgment_view.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import KakaoMap from "./KakaoMap";

const LodgmentView = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const lodgmentNo = params.lodgmentNo;
  const [lodgmentList, setLodgmentList] = useState({});
  const [roomList, setRoomList] = useState([]);
  useEffect(() => {
    axios
      .get(`${backServer}/seller/lodgmentView/${lodgmentNo}`)
      .then((res) => {
        console.log(res);
        setLodgmentList(res.data.lodgment);
        setRoomList(res.data.list);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="lv-box-wrap box-radius">
      <div className="lv-item-fr-wrap">
        <div className="lv-img-wrap">
          <img
            src={
              lodgmentList.lodgmentImgPath
                ? `${backServer}/seller/lodgment/${lodgmentList.lodgmentImgPath}`
                : "/image/lodgment_default_img.png"
            }
            style={{ width: "300px" }}
          />
        </div>
        <div className="lv-item-wrap">
          <div className="item-title">
            <h1>{lodgmentList.lodgmentName}</h1>
          </div>
          <div className="item-star">
            <span>{lodgmentList.lodgmentStarGrade}</span>
            <span>성급</span>
          </div>
          <div className="item-addr">
            <p>{lodgmentList.lodgmentAddr}</p>
          </div>
          <div className="chek-in">
            <span>체크인 : </span>
            <span>{lodgmentList.lodgmentCheckIn}</span>
          </div>
          <div className="chek-out">
            <span>체크아웃 : </span>
            <span>{lodgmentList.lodgmentCheckOut}</span>
          </div>

          <Link
            to={`/seller/updateLodgment/${lodgmentList.lodgmentNo}`}
            className="btn primary"
          >
            호텔 수정
          </Link>
        </div>
      </div>
      <div className="item-sc-wrap">
        <Link
          to={`/seller/insertRoom/${lodgmentList.lodgmentNo}`}
          className="btn primary"
        >
          객실 등록
        </Link>
        <div className="lrv-wrap">
          <h4>객실 정보</h4>
          <div className="room-arr">
            {roomList.map((room, i) => {
              return <RoomItem key={"room - " + i} room={room} />;
            })}
          </div>
        </div>
      </div>
      <div className="item-tr-wrap">
        <div className="item-map">
          지도 들어갈 자리
          <KakaoMap lodgmentAddr={lodgmentList.lodgmentAddr} />
        </div>
        <div className="item-notice">
          <h1>공지사항</h1>
          <div
            className="ql-editor"
            dangerouslySetInnerHTML={{ __html: lodgmentList.lodgmentNotice }}
          />
        </div>
      </div>
    </div>
  );
};

const RoomItem = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const room = props.room;
  const fileList = room.fileList[0];
  console.log("room - ", room);
  console.log(fileList);

  return (
    <div
      className="room-item"
      onClick={() => {
        navigate(`/seller/roomView/${room.roomNo}`);
      }}
    >
      <div className="room-img">
        <img
          src={
            fileList !== undefined
              ? `${backServer}/seller/room/${room.fileList[0]?.roomImg}`
              : "/image/lodgment_default_img.png"
          }
          style={{ width: "100px" }}
        />
      </div>
      <div className="room-item-info">
        <h5>{room.roomName}</h5>
        <p>최대인원 : {room.roomQua} 인</p>
        <p>가격 : {room.roomPrice} 원</p>
      </div>
    </div>
  );
};

export default LodgmentView;
