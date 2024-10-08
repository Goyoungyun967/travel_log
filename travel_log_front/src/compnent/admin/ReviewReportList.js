import { Rating } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick/lib/slider";
import PageNavi from "../utils/PageNavi";

const ReviewReportList = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [reviewReportList, setReviewReportList] = useState([]);
  const [pi, setPi] = useState({});
  const [reqPage, setReqPage] = useState(1);
  useEffect(() => {
    axios
      .get(`${backServer}/admin/review/report/list/${reqPage}`)
      .then((res) => {
        console.log(res.data);
        setReviewReportList(res.data.list);
        setPi(res.data.pi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPage]);
  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    adaptiveHeight: true,
  };
  return (
    <div className="admin-review-wrap">
      <div className="review-img-wrap">
        {reviewReportList.map((review, i) => (
          <div key={`review-report-${i}`} className="review-content-wrap">
            {review.fileList.length > 0 && (
              <Slider {...settings}>
                {review.fileList.map((file, index) => (
                  <div key={`file-${index}`} className="slider-item">
                    <img src={`${backServer}/review/${file.reviewImgPath}`} />
                  </div>
                ))}
              </Slider>
            )}
            <div>
              <h4>{review.memberNickname}</h4>
            </div>
            <div>
              <Rating name="read-only" value={review.rating} readOnly />
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: review.reviewContent,
              }}
            ></div>
            <div className="report-count-wrap">
              <p>
                <b>욕설</b> : {review.abuseCount}
              </p>
              <p>
                <b>광고</b> : {review.adCount}
              </p>
              <p>
                <b>불편함</b> : {review.uncomfortableCount}
              </p>
              <p>
                <b>기타</b> : {review.etcCount}
              </p>
            </div>
            <div className="report-btn">
              <button>리뷰 삭제</button>
              <button>신고 무효</button>
            </div>
          </div>
        ))}
      </div>
      <div className="review-pagenavie-wrap">
        <PageNavi reqPage={reqPage} setReqPage={setReqPage} pi={pi} />
      </div>
    </div>
  );
};

export default ReviewReportList;
