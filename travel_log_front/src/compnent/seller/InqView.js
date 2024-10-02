import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InqSlideImg } from "./sellerUtil/SlideImg";

const InqView = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [inqView, setInqView] = useState({});
  const [fileList, setFileList] = useState([]);
  const [data, setData] = useState();
  const [replyDate, setReplyDate] = useState();
  const { inqNo } = useParams();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월 지정
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`; // 년-월-일 포맷
  };

  useEffect(() => {
    axios
      .get(`${backServer}/seller/searchView/${inqNo}`)
      .then((res) => {
        setInqView(res.data);
        setFileList(res.data.inquiryFileList || []); // 배열
        setData(formatDate(res.data.regDate));
        setReplyDate(
          res.data.inquiryReply
            ? formatDate(res.data.inquiryReply.regDate)
            : null
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [inqNo, backServer]);

  return (
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
                <h5>{data}</h5>
              </div>
            </div>
          </div>
          <div className="seller-img-wrap">
            <InqSlideImg fileList={fileList} />
          </div>
          <div className="info-item">
            <div className="info-item-content-wrap">
              <div className="info-item-title">
                <h5>문의 내용</h5>
              </div>
              <div className="info-item-content">
                <div
                  style={{ textAlign: "center" }}
                  dangerouslySetInnerHTML={{
                    __html: inqView.inquiryContent || "",
                  }}
                ></div>
              </div>
              <hr />
              {inqView.inquiryReply && (
                <div className="info-item-reply-wrap">
                  <div className="reply">
                    <h3>답변</h3>
                  </div>
                  <div className="reply-item">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: inqView.inquiryReply.inquiryReplyContent || "",
                      }}
                    ></p>
                    <span>{replyDate}</span>
                    <span>작성일</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InqView;
