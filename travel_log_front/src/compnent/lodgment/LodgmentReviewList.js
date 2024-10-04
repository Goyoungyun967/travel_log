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
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import Swal from "sweetalert2";

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
        setPi(res.data.pi);
        setAvailableReview(res.data.availableReview);
        setViewReview(res.data.list);
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

  const handleLike = (reviewNo, likeCount) => {
    if (loginNo === -1) {
      Swal.fire({
        icon: "info",
        text: "로그인을 해주세요.",
      });
      return;
    }
    if (likeCount === 0) {
      axios
        .post(`${backServer}/lodgment/reviewLike`, { reviewNo, loginNo })
        .then((res) => {
          // 성공 시 UI 업데이트 로직 추가 (예: 상태 재조회)
          console.log(res.data);
          // 필요시 상태 업데이트
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(`${backServer}/lodgment/reviewLikeCancle`, { reviewNo, loginNo })
        .then((res) => {
          // 성공 시 UI 업데이트 로직 추가 (예: 상태 재조회)
          console.log(res.data);
          // 필요시 상태 업데이트
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleReport = (reviewNo, reportCount) => {
    if (loginNo === -1) {
      Swal.fire({
        icon: "info",
        text: "로그인을 해주세요.",
      });
      return;
    }
    if (reportCount === 0) {
      axios
        .post(`${backServer}/lodgment/report`, { reviewNo, loginNo })
        .then((res) => {
          // 성공 시 UI 업데이트 로직 추가 (예: 상태 재조회)
          console.log(res.data);
          // 필요시 상태 업데이트
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(`${backServer}/lodgment/reportCancle`, { reviewNo, loginNo })
        .then((res) => {
          // 성공 시 UI 업데이트 로직 추가 (예: 상태 재조회)
          console.log(res.data);
          // 필요시 상태 업데이트
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
                  <div className="review-text-area">
                    <span>
                      <>
                        {review.likeCount === 0 ? (
                          <>
                            <ThumbUpOffAltIcon
                              onClick={() =>
                                handleLike(review.reviewNo, review.likeCount)
                              }
                            />
                            {review.totalLikeCount}
                          </>
                        ) : review.likeCount === 1 ? (
                          <>
                            <ThumbUpAltIcon
                              onClick={() =>
                                handleLike(review.reviewNo, review.likeCount)
                              }
                            />
                            {review.totalLikeCount}
                          </>
                        ) : null}
                      </>
                    </span>
                    <span> | </span>
                    {review.reportCount === 0 ? (
                      <>
                        <span
                          onClick={() =>
                            handleReport(review.reviewNo, review.reportCount)
                          }
                        >
                          신고하기
                        </span>
                      </>
                    ) : review.reportCount === 1 ? (
                      <>
                        <span
                          onClick={() =>
                            handleReport(review.reviewNo, review.reportCount)
                          }
                        >
                          신고하기
                        </span>
                      </>
                    ) : null}
                  </div>
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
