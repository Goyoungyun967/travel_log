import { useEffect, useState } from "react";
import "./css/lodgment_view.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
const LodgmentView = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const lodgmentNo = params.lodgmentNo;
  const [lodgmentList, setLodgmentList] = useState({});
  useEffect(() => {
    axios
      .get(`${backServer}/seller/lodgmentInfo/${lodgmentNo}`)
      .then((res) => {
        console.log(res);
        setLodgmentList(res.data);
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
        <div className="item-notice">
          <h5>공지사항</h5>
        </div>
        <div className="item-map">지도 들어갈 자리</div>
      </div>
      <div className="lrv-wrap">
        <h4>객실 정보</h4>
        <div className="lrv-item"></div>
      </div>
    </div>
  );
};

export default LodgmentView;
