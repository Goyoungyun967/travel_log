import { useEffect, useState } from "react";
import "./css/room_view.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import KakaoMap from "./sellerUtil/KakaoMap";
import { SlideImg } from "./sellerUtil/SlideImg";

const RoomView = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const lodgmentNo = params.lodgmentNo;
  const roomNo = params.roomNo;
  const [lodgmentInfo, setlodgmentInfo] = useState({}); // 호텔 정보
  const [roomInfo, setRoomInfo] = useState({}); // 객실 정보 + 파일 + 해시태그
  const [roomFile, setRoomFile] = useState([]); // 객실 이미지
  const [serviceTag, setServiceTag] = useState([]);
  console.log(roomInfo);
  useEffect(() => {
    axios
      .get(`${backServer}/seller/roomView/${lodgmentNo}/${roomNo}`) // *** 임시로 판매자 번호 1로 넣어둠
      .then((res) => {
        console.log(res);
        setlodgmentInfo(res.data.lodgment);
        setRoomInfo(res.data.room);
        setRoomFile(res.data.room.fileList);
        setServiceTag(res.data.room.serviceTagList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="seller-room-wrap">
        <h3>객실 정보</h3>
        <div className="hotel-info">
          <div className="image">
            <SlideImg
              roomFile={roomFile}
              imgsize={"seller-lodgmentView-custom-image"}
            />
          </div>
          <div className="room-item-wrap">
            <div className="room-item">
              <h5>숙소명</h5>
              <span>{lodgmentInfo.lodgmentName}</span>
            </div>
            <div className="room-item">
              <h5>객실명</h5>
              <span>{roomInfo.roomName}</span>
            </div>
            <div className="room-item">
              <h5>1박 가격</h5>
              <span>{roomInfo.roomPrice} 원</span>
            </div>
            <div className="room-item">
              <h5>수량</h5>
              <span>{roomInfo.roomQua}</span>
            </div>
            <div className="room-item">
              <h5>객실 최대 인원</h5>
              <span>{roomInfo.roomMaxCapacity}</span>
            </div>
            <div className="room-item">
              <h5>체크인 ~ 체크아웃</h5>
              <span>
                {lodgmentInfo.lodgmentCheckIn} ~ {lodgmentInfo.lodgmentCheckOut}
              </span>
            </div>
            <div className="room-item">
              <ServiceTags serviceTag={serviceTag} />
            </div>
          </div>
        </div>
        <div className="seller-room-sc-wrap">
          <h3>위치</h3>
          <KakaoMap lodgmentAddr={lodgmentInfo.lodgmentAddr} />
        </div>
        <div className="item-notice">
          <h3>공지사항</h3>
          <div
            className="ql-editor notice-ed"
            dangerouslySetInnerHTML={{ __html: roomInfo.roomInfo }}
          />
        </div>
        <div className="seller-btn-div">
          <div className="seller-update-btn">
            <Link
              to={`/seller/updateRoom/${roomInfo.roomNo}`}
              className="s-btn"
            >
              객실 수정
            </Link>
          </div>
          <div className="seller-del-btn">
            <Link
              to={`/seller/deleteRoom/${roomInfo.roomNo}`}
              className="d-btn"
            >
              객실 삭제
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

const ServiceTags = (props) => {
  const serviceTag = props.serviceTag;
  console.log(serviceTag);
  return (
    <div className="service-tags">
      {serviceTag.map((tag, index) => (
        <span key={index} className="service-tag">
          {tag.serviceTagType}
        </span>
      ))}
    </div>
  );
};

export default RoomView;
