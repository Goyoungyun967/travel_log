import { Rating } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick/lib/slider";
import PageNavi from "../utils/PageNavi";
import Swal from "sweetalert2";

const ReviewReportList = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [reviewReportList, setReviewReportList] = useState([]);
  const [pi, setPi] = useState({});
  const [reqPage, setReqPage] = useState(1);
  useEffect(() => {
    axios
      .get(`${backServer}/admin/review/report/list/${reqPage}`)
      .then((res) => {
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
    <>
      {" "}
      <div className="admin-page-title">
        <h3>리뷰 신고 관리</h3>
      </div>
      <div className="admin-review-wrap">
        <div className="review-img-wrap">
          {reviewReportList.map((review, i) => {
            const deleteReport = () => {
              axios
                .delete(`${backServer}/admin/review/report/${review.reviewNo}`)
                .then((res) => {
                  if (res.data > 0) {
                    Swal.fire({
                      title: "신고 삭제 완료",
                      text: "신고 삭제 처리가 완료 되었습니다.",
                      icon: "success",
                    });
                    reviewReportList.splice(i, 1);
                    setReviewReportList([...reviewReportList]);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            };
            const deleteReview = () => {
              axios
                .delete(
                  `${backServer}/lodgment/reviewDelete/${review.reviewNo}`
                )
                .then((res) => {
                  if (res.data > 0) {
                    Swal.fire({
                      title: "리뷰 삭제 완료",
                      text: "리뷰 삭제 처리가 완료 되었습니다.",
                      icon: "success",
                    });
                    reviewReportList.splice(i, 1);
                    setReviewReportList([...reviewReportList]);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            };
            return (
              <div key={`review-report-${i}`} className="review-content-wrap">
                {review.fileList.length > 0 && (
                  <Slider {...settings}>
                    {review.fileList.map((file, index) => {
                      return (
                        <div
                          key={`report-file-${index}`}
                          className="slider-item"
                        >
                          <img
                            src={`${backServer}/review/${file.reviewImgPath}`}
                          />
                        </div>
                      );
                    })}
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
                    <b>불편함</b> : {review.uncomfortableCount}
                  </p>
                  <p>
                    <b>광고</b> : {review.adCount}
                  </p>
                  <p>
                    <b>기타</b> : {review.etcCount}
                  </p>
                  <p>
                    <b>누적 합계</b> : {review.totalCount}
                  </p>
                </div>
                <div className="report-btn">
                  <button onClick={deleteReview}>리뷰 삭제</button>
                  <button onClick={deleteReport}>신고 무효</button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="review-pagenavie-wrap">
          <PageNavi reqPage={reqPage} setReqPage={setReqPage} pi={pi} />
        </div>
      </div>
    </>
  );
};

export default ReviewReportList;
