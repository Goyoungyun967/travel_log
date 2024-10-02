import "./css/lodgmentDetail.css";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import LodgmentDetailMap from "./LodgmentDetailMap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import LodgmentRoomDetail from "./LodgmentRoomDetail";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const LodgmentDetail = () => {
  const BackServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const lodgmentNo = params.lodgmentInfo;
  const startDate = params.startDate;
  const endDate = params.endDate;
  const guest = params.guest;
  const [lodgmentInfo, setLodgmentInfo] = useState({});
  const [roomSearchList, setRoomSearchList] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${BackServer}/lodgment/roomInfo/${lodgmentNo}/${startDate}/${endDate}`
      )
      .then((res) => {
        console.log(res);
        setLodgmentInfo(res.data.lodgmentInfo);
        setRoomSearchList(res.data.lodgmentInfo.roomSearchList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //console.log("roomSearchList" + roomSearchList[0].roomNo);
  return (
    <section className="section lodgmentDetail">
      <div className="lodgment-detail-img">
        <div className="lodgment-storage-btn" onClick={() => {}}>
          <FavoriteBorderIcon sx={{ fontSize: 40 }} />
        </div>
        <img
          src={
            lodgmentInfo.lodgmentImgPath
              ? `${BackServer}/seller/lodgment/${lodgmentInfo.lodgmentImgPath}`
              : "/image/default_img.png"
          }
          // 기본 이미지 경로
          alt={lodgmentInfo.lodgmentName}
          className="lodgment-image"
        />
      </div>
      <div className="lodgment-detail-info">
        <table>
          <tbody>
            <tr>
              <td width={"50%"}>
                {lodgmentInfo.lodgmentTypeNo === 1 ? (
                  <h4 className="lodgment-address">호텔</h4>
                ) : lodgmentInfo.lodgmentTypeNo === 2 ? (
                  <h4 className="lodgment-address">모텔</h4>
                ) : lodgmentInfo.lodgmentTypeNo === 3 ? (
                  <h4 className="lodgment-address">펜션/풀빌라</h4>
                ) : lodgmentInfo.lodgmentTypeNo === 4 ? (
                  <h4 className="lodgment-address">게스트하우스</h4>
                ) : lodgmentInfo.lodgmentTypeNo === 5 ? (
                  <h4 className="lodgment-address">캠핑</h4>
                ) : (
                  ""
                )}
              </td>
              <td className="member-rating" width={"50%"}>
                평점
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="lodgment-detail-name">
                <h1>{lodgmentInfo.lodgmentName}</h1>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="lodgment-detail-map-wrap">
          <LodgmentDetailMap
            lodgmentAddr={lodgmentInfo.lodgmentAddr}
            lodgmentName={lodgmentInfo.lodgmentName}
          />
        </div>
        <div className="lodgment-loom-type-wrap">
          <LodgmentRoomDetail
            roomSearchList={roomSearchList}
            startDate={startDate}
            endDate={endDate}
            guest={guest}
            lodgmentInfo={lodgmentInfo}
          />
        </div>
      </div>

      <div className="user-active-wrap">
        <Tabs
          defaultActiveKey="profile"
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          <Tab eventKey="home" title="이용후기">
            Tab content for Home
          </Tab>
          <Tab eventKey="profile" title="문의하기">
            Tab content for Profile
          </Tab>
          <Tab eventKey="longer-tab" title="공지사항">
            <div
              dangerouslySetInnerHTML={{ __html: lodgmentInfo.lodgmentNotice }}
            ></div>
          </Tab>
        </Tabs>
      </div>
    </section>
  );
};
const LodgmentWrap = () => {
  return (
    <div className="lodgment-detail-img">
      <Carousel fade>
        <Carousel.Item>
          <img src="/image/nesthotel.jpg" text="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img src="/image/nesthotel2.jpg" text="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img src="/image/nesthotel3.jpg" text="First slide" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default LodgmentDetail;
