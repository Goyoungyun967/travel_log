import { useEffect, useState } from "react";
import "./css/room_view.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import KakaoMap from "./sellerUtil/KakaoMap";
import { SlideImg } from "./sellerUtil/SlideImg";
import Swal from "sweetalert2";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const RoomView = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const params = useParams();
  const lodgmentNo = params.lodgmentNo;
  const roomNo = params.roomNo;
  const [lodgmentInfo, setlodgmentInfo] = useState({}); // 호텔 정보
  const [roomInfo, setRoomInfo] = useState({}); // 객실 정보 + 파일 + 해시태그
  const [roomFile, setRoomFile] = useState([]); // 객실 이미지
  const [serviceTag, setServiceTag] = useState([]);

  //
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue); // 상태 업데이트
  };

  // 객실 상세
  console.log(roomInfo);
  useEffect(() => {
    axios
      .get(`${backServer}/seller/roomView/${lodgmentNo}/${roomNo}`)
      .then((res) => {
        console.log("r", res);
        setlodgmentInfo(res.data.lodgment);
        // 객실 삭제하고 뒤로가기를 누르면 객실 정보가 null값이 되어서 오류가 뜸
        // 객실 정보가 null값이면 호텔 상세로 이동하게 함
        if (res.data.room !== null) {
          setRoomInfo(res.data.room);
          setRoomFile(res.data.room.fileList);
          setServiceTag(res.data.room.serviceTagList);
        } else {
          navigate(`/seller/lodgmentView/${lodgmentNo}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // 객실 삭제
  const deleteRoom = () => {
    Swal.fire({
      icon: "warning",
      title: "객실 삭제",
      text: "삭제하시겠습니까? 이미 예약된 고객은 ...",
      showCancelButton: true,
      confirmButtonText: "삭제하기",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .patch(`${backServer}/seller/delRoom`, null, {
            params: { roomNo: roomNo },
          })
          .then((res) => {
            console.log(res);
            if (res.data !== 0) {
              navigate(`/seller/lodgmentView/${lodgmentNo}`);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  };

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
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="숙소 위치" value="1" />
                  <Tab label="공지사항" value="2" />
                  <Tab label="문의" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <KakaoMap lodgmentAddr={lodgmentInfo.lodgmentAddr} />
              </TabPanel>
              <TabPanel value="2">
                <div className="item-notice">
                  <h3>공지사항</h3>
                  <div
                    className="ql-editor notice-ed"
                    dangerouslySetInnerHTML={{ __html: roomInfo.roomInfo }}
                  />
                </div>
              </TabPanel>
              <TabPanel value="3">Item Three</TabPanel>
            </TabContext>
          </Box>
        </div>

        <div className="seller-btn-div">
          <div className="seller-update-btn">
            <Link
              to={`/seller/updateRoom/${lodgmentNo}/${roomInfo.roomNo}`}
              className="s-btn"
            >
              객실 수정
            </Link>
          </div>
          <div className="seller-del-btn">
            <button type="button" onClick={deleteRoom}>
              객실 삭제
            </button>
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
