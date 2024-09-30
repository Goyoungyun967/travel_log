import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InqSlideImg } from "./sellerUtil/SlideImg";

const InqView = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [inqView, setInqView] = useState({});
  const [fileList, setFileList] = useState([]);
  const { inqNo } = useParams();
  console.log("i - ", inqNo);
  console.log("ib - ", inqView);
  useEffect(() => {
    axios
      .get(`${backServer}/seller/inqView/${inqNo}`)
      .then((res) => {
        console.log(res);
        setInqView(res.data);
        setFileList(res.data.inquiryFileList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="seller-inq-view-wrap">
        <h3>문의 상세</h3>
        <div className="seller-inq-wrap">
          <div className="seller-info-wrap">
            <div className="seller-info-flex">
              <div className="info-item">
                <div className="info-item-title">
                  <h5>문의 제목</h5>
                </div>
                <div className="info-item-content">
                  <h5>{inqView.inquiryTitle}</h5>
                </div>
              </div>
              <div className="info-item">
                <div className="info-item-title">
                  <h5>작성일</h5>
                </div>
                <div className="info-item-content">
                  <h5>2024-09-30</h5>
                </div>
              </div>
            </div>
            <div className="info-item">
              <div className="info-item-content-wrap">
                <div className="info-item-title">
                  <h5>문의 내용</h5>
                </div>
                <div className="info-item-content">
                  <div>환불해줘영</div>
                </div>
              </div>
            </div>
            <div className="info-item"></div>
          </div>
          <div className="seller-img-wrap">
            <InqSlideImg fileList={fileList} />
          </div>
        </div>
      </div>
    </>
  );
};

export default InqView;
