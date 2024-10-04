import { useEffect, useState } from "react";
import "./css/lodgment_view.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import Swal from "sweetalert2";
import KakaoMap from "./sellerUtil/KakaoMap";

import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Comment from "./sellerUtil/Comment";

const LodgmentView = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const params = useParams();
  const lodgmentNo = params.lodgmentNo;
  const [lodgmentList, setLodgmentList] = useState({}); // 숙소 정보
  const [roomList, setRoomList] = useState([]); // 객실 리스트
  const [reviewList, setReviewList] = useState([]); // 리뷰 리스트

  // 페이징 처리
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});

  console.log(reviewList);
  useEffect(() => {
    axios
      .get(`${backServer}/seller/lodgmentView/${lodgmentNo}/${reqPage}`)
      .then((res) => {
        console.log("lodgment res", res);
        // 호텔 삭제하고 뒤로가기를 누르면 호텔 정보가 null값이 되어서 오류가 뜸
        // 호텔 정보가 null값이면 호텔 리스트로 이동하게 함
        if (res.data.lodgment !== null) {
          console.log("lod", res);
          setLodgmentList(res.data.lodgment);
          setRoomList(res.data.list);
          setReviewList(res.data.review);
          setPi(res.data.pi);
        } else {
          navigate("/seller/list");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPage]);

  // 삭제지만.. 1(보여지는거) => 0으로 바뀌게 해야하므로 패치 사용
  const deleteLodgment = () => {
    Swal.fire({
      icon: "warning",
      title: "호텔 삭제",
      text: "삭제하시겠습니까? 입력한 객실까지 같이 삭제됩니다.",
      showCancelButton: true,
      confirmButtonText: "삭제하기",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .patch(`${backServer}/seller/delLodgment`, null, {
            params: { lodgmentNo: lodgmentNo },
          })
          .then((res) => {
            console.log(res);
            if (res.data !== 0) {
              navigate("/seller/list");
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  };

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          <button type="button" onClick={deleteLodgment}>
            호텔 삭제
          </button>
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
              console.log("room-", room);
              return <RoomItem key={"room - " + i} room={room} />;
            })}
          </div>
        </div>
      </div>
      <div className="item-tr-wrap">
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="지도" value="1" />
              <Tab label="숙소 공지사항" value="2" />
              <Tab label="리뷰" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <KakaoMap lodgmentAddr={lodgmentList.lodgmentAddr} />
          </TabPanel>
          <TabPanel value="2">
            <div className="item-notice">
              <h1>공지사항</h1>
              <div
                className="ql-editor"
                dangerouslySetInnerHTML={{
                  __html: lodgmentList.lodgmentNotice,
                }}
              />
            </div>
          </TabPanel>
          <TabPanel value="3">
            <Comment
              reviewList={reviewList}
              setReviewList={setReviewList}
              reqPage={reqPage}
              setReqPage={setReqPage}
              pi={pi}
            />
          </TabPanel>
        </TabContext>
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
        navigate(`/seller/roomView/${room.lodgmentNo}/${room.roomNo}`);
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
