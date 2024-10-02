import "./css/lodgmentDetail.css";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import LodgmentDetailMap from "./LodgmentDetailMap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import LodgmentRoomDetail from "./LodgmentRoomDetail";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { loginNoState } from "../utils/RecoilData";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";
import FavoriteIcon from "@mui/icons-material/Favorite";

const LodgmentDetail = () => {
  const BackServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const navigate = useNavigate();
  const lodgmentNo = params.lodgmentInfo;
  const startDate = params.startDate;
  const endDate = params.endDate;
  const guest = params.guest;
  const [lodgmentInfo, setLodgmentInfo] = useState({});
  const [roomSearchList, setRoomSearchList] = useState([]);
  const [loginNo] = useRecoilState(loginNoState);
  const [lodgmentCollection, sestLodgmentCollection] = useState("");
  const [result, setResult] = useState(true);
  //console.log(loginNo);
  useEffect(() => {
    //console.log("loginNo" + loginNo);

    axios
      .get(
        `${BackServer}/lodgment/roomInfo/${lodgmentNo}/${startDate}/${endDate}/${loginNo}`
      )
      .then((res) => {
        console.log(res);
        setLodgmentInfo(res.data.lodgmentInfo);
        setRoomSearchList(res.data.lodgmentInfo.roomSearchList);
        sestLodgmentCollection(res.data.lodgmentCollection);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loginNo, result]);
  //console.log("roomSearchList" + roomSearchList[0].roomNo);
  return (
    <section className="section lodgmentDetail">
      {loginNo}
      {lodgmentCollection}
      <div className="lodgment-detail-img">
        {loginNo === -1 ? (
          <div
            className="lodgment-storage-btn"
            onClick={() => {
              Swal.fire({
                icon: "info",
                title: "로그인 페이지로 이동하겠습니까?",
                showCancelButton: false,
                confirmButtonText: "예",
                cancelButtonText: "아니오",
              }).then((res) => {
                if (res.isConfirmed) {
                  navigate("/"); //로그인 페이지로 이동
                }
              });
            }}
          >
            <FavoriteBorderIcon sx={{ fontSize: 40 }} />
          </div>
        ) : loginNo !== 1 && lodgmentCollection === 0 ? (
          <div
            className="lodgment-storage-btn"
            onClick={() => {
              Swal.fire({
                icon: "info",
                title: "보관함에 저장하시겠습니까?",
                showCancelButton: true,
                confirmButtonText: "예",
                cancelButtonText: "아니오",
              }).then((res) => {
                if (res.isConfirmed) {
                  axios
                    .get(
                      `${BackServer}/lodgment/collect/${lodgmentNo}/${loginNo}`
                    )
                    .then((res) => {
                      // 응답 데이터의 프로퍼티 접근 수정
                      console.log("성공 되는곳");
                      console.log(res);

                      if (res.data === 1) {
                        setResult((prev) => !prev);
                        Swal.fire({
                          icon: "success",
                          title: "저장되었습니다!",
                          text: "보관함에 저장되었습니다.",
                        });
                      } else {
                        Swal.fire({
                          icon: "error",
                          title: "저장 실패",
                          text: "문제가 발생했습니다. 다시 시도해주세요.",
                        });
                      }
                    })
                    .catch((err) => {
                      console.error(err);
                      Swal.fire({
                        icon: "error",
                        title: "서버 오류",
                        text: "서버와의 연결에 문제가 발생했습니다.",
                      });
                    });
                }
              });
            }}
          >
            <FavoriteBorderIcon sx={{ fontSize: 40 }} />
          </div>
        ) : loginNo !== 1 && lodgmentCollection === 1 ? (
          <div
            className="lodgment-storage-btn"
            onClick={() => {
              Swal.fire({
                icon: "info",
                title: "보관함 취소를 하겠습니까??",
                showCancelButton: true,
                confirmButtonText: "예",
                cancelButtonText: "아니오",
              }).then((res) => {
                if (res.isConfirmed) {
                  axios
                    .get(
                      `${BackServer}/lodgment/unCollect/${lodgmentNo}/${loginNo}`
                    )
                    .then((res) => {
                      // 응답 데이터의 프로퍼티 접근 수정
                      console.log("취소 되는곳");
                      console.log(res);
                      if (res.data === 1) {
                        setResult((prev) => !prev);
                        Swal.fire({
                          icon: "success",
                          title: "보관함 취소 되었습니다.",
                        });
                      } else {
                        Swal.fire({
                          icon: "error",
                          title: "취소 실패",
                          text: "문제가 발생했습니다. 다시 시도해주세요.",
                        });
                      }
                    })
                    .catch((err) => {
                      console.error(err);
                      Swal.fire({
                        icon: "error",
                        title: "서버 오류",
                        text: "서버와의 연결에 문제가 발생했습니다.",
                      });
                    });
                }
              });
            }}
          >
            <FavoriteIcon sx={{ fontSize: 40 }} />
          </div>
        ) : (
          "머징"
        )}

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
