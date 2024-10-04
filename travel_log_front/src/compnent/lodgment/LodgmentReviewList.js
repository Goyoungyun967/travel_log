import axios from "axios";
import { useEffect, useState } from "react";
import PageNavi from "../utils/PageNavi";
import { useRecoilState } from "recoil";
import { loginNoState } from "../utils/RecoilData";
import { useNavigate } from "react-router-dom";
import "./css/lodgmentReviewList.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Rating from "@mui/material/Rating";

const LodgmentReviewList = (props) => {
  const navigate = useNavigate();
  const lodgmentNo = props.lodgmentNo;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  const [loginNo] = useRecoilState(loginNoState);
  const [availableReview, setAvailableReview] = useState(false);
  const [viewReview, setViewReview] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${backServer}/lodgment/reviewList/${lodgmentNo}/${reqPage}/${loginNo}`
      )
      .then((res) => {
        console.log(res);
        setPi(res.data.pi);
        setAvailableReview(res.data.availableReview);
        setViewReview(res.data.list);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPage, loginNo]);
  // console.log("viewReview" + viewReview[0].reviewContent);
  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // 슬라이드 한 번에 보여줄 개수
    slidesToScroll: 1,
    initialSlide: 0, // 시작 슬라이드
    adaptiveHeight: true, // 슬라이드의 높이를 내용에 맞춰 조정
    // 다른 설정 추가 가능
  };

  return (
    <div>
      <div className="lodgment-review-rwap">
        {availableReview && (
          <>
            <div className="review-no-comment">
              예약 가능한 리뷰가 있습니다 리뷰를 남겨주세요
            </div>
            <div className="lodgment-review-btn-wrap">
              <button
                className="review-btn"
                onClick={() => {
                  navigate(`/lodgment/reviewWrite`, {
                    state: { lodgmentNo },
                  });
                }}
              >
                리뷰작성
              </button>
            </div>
          </>
        )}
      </div>
      <div>
        {viewReview.length === 0 ? (
          <div className="no-review-data">
            <img src="/image/no_review_data.gif" alt="No review data" />
          </div>
        ) : (
          <>
            <div className="review-img-wrap">
              {viewReview.map((review, i) => (
                <div key={`review-${i}`} className="review-content-wrap">
                  {review.fileList.length > 0 && (
                    <Slider {...settings}>
                      {review.fileList.map((file, index) => (
                        <div key={`file-${index}`} className="slider-item">
                          <img
                            src={`${backServer}/review/${file.reviewImgPath}`}
                            alt={`Review Image ${index}`}
                          />
                        </div>
                      ))}
                    </Slider>
                  )}
                  <div>
                    <h4>{review.memberId}</h4>
                  </div>
                  <div>
                    <Rating name="read-only" value={review.rating} readOnly />
                  </div>
                  <div>{review.reviewContent}</div>
                </div>
              ))}
            </div>
            <div className="review-pagenavie-wrap">
              <PageNavi reqPage={reqPage} setReqPage={setReqPage} pi={pi} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default LodgmentReviewList;
