import React, { useEffect, useState } from "react";
import axios from "axios";
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
import {
  Modal as MuiModal,
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  FormControl,
  FormLabel,
} from "@mui/material";

const LodgmentReviewUpdate = (props) => {
  const navigate = useNavigate();
  const lodgmentNo = props.lodgmentNo;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  //댓글 페이지네비
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  const [loginNo] = useRecoilState(loginNoState);

  const [availableReview, setAvailableReview] = useState(false);
  const [viewReview, setViewReview] = useState([]);
  const [success, setSuccess] = useState(false);

  //신고 모달창
  const [openModal, setOpenModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");

  useEffect(() => {
    axios
      .get(
        `${backServer}/lodgment/reviewList/${lodgmentNo}/${reqPage}/${loginNo}`
      )
      .then((res) => {
        //console.log(res);
        setPi(res.data.pi);
        setAvailableReview(res.data.availableReview);
        setViewReview(res.data.list);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loginNo, reqPage, success]);

  //댓글 좋아요, 좋아요 취소
  const handleLike = (reviewNo, likeCount) => {
    if (loginNo === -1) {
      Swal.fire({
        icon: "info",
        text: "로그인을 해주세요.",
      });
      return;
    }

    const url =
      likeCount === 0
        ? `${backServer}/lodgment/reviewLike`
        : `${backServer}/lodgment/reviewLikeCancle`;
    axios
      .post(url, { reviewNo, loginNo })
      .then((res) => {
        if (res.data) {
          setSuccess(!success);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedReason("");
  };

  //리뷰 신고
  const handleReportSubmit = (reviewNo, reportCount) => {
    if (loginNo == -1) {
      setOpenModal(false);
      Swal.fire({
        icon: "warning",
        text: "로그인을 해주세요.",
      });
      return;
    }

    if (reportCount === 1) {
      setOpenModal(false);
      Swal.fire({
        icon: "warning",
        text: "신고 완료 된 댓글입니다.",
      });
      return;
    }
    if (!selectedReason) {
      setOpenModal(false);
      Swal.fire({
        icon: "warning",
        text: "신고 사유를 선택해주세요.",
      });
      return;
    }

    axios
      .post(`${backServer}/lodgment/report`, {
        reviewNo,
        loginNo,
        selectedReason,
      })
      .then((res) => {
        console.log("dd" + res);
        setSuccess(!success);
        setOpenModal(false);
        setSelectedReason("");
      })
      .catch((err) => {
        console.log(err);
        setOpenModal(false);
      });
  };

  const reportReasons = [
    { id: 1, label: "욕설" },
    { id: 2, label: "타인에게 불편함" },
    { id: 3, label: "광고성" },
    { id: 4, label: "기타" },
  ];
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
    <div>
      <div className="lodgment-review-wrap">
        {availableReview && (
          <>
            <div className="review-no-comment">
              예약 가능한 리뷰가 있습니다. 리뷰를 작성하러 가기
              <button
                className="review-btn"
                onClick={() => {
                  navigate(`/member/mypage/myReservation`);
                }}
              >
                리뷰 작성
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
                  <div>
                    <span
                      dangerouslySetInnerHTML={{ __html: review.reviewContent }}
                    ></span>
                  </div>
                  <div className="review-text-area">
                    <span>
                      {review.likeCount === 0 ? (
                        <ThumbUpOffAltIcon
                          className="lodgment-review-thumb"
                          onClick={() =>
                            handleLike(review.reviewNo, review.likeCount)
                          }
                        />
                      ) : (
                        <ThumbUpAltIcon
                          className="lodgment-review-thumb"
                          onClick={() =>
                            handleLike(review.reviewNo, review.likeCount)
                          }
                        />
                      )}
                      {review.totalLikeCount}
                    </span>
                    <span> | </span>
                    <span
                      onClick={handleOpenModal}
                      className="lodgment-review-report"
                    >
                      신고하기
                    </span>
                    <MuiModal
                      open={openModal === true}
                      onClose={handleCloseModal}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: 400,
                          bgcolor: "background.paper",
                          border: "2px solid #000",
                          boxShadow: 24,
                          p: 4,
                          borderRadius: 1,
                        }}
                      >
                        <Typography variant="h6" component="h2" gutterBottom>
                          신고 사유 선택
                        </Typography>
                        <FormControl component="fieldset" fullWidth>
                          <FormLabel component="legend">신고 사유</FormLabel>
                          <RadioGroup
                            value={selectedReason}
                            onChange={(e) => setSelectedReason(e.target.value)}
                          >
                            {reportReasons.map((reason) => (
                              <FormControlLabel
                                key={reason.id}
                                value={reason.id}
                                control={<Radio />}
                                label={reason.label}
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <Button
                          variant="contained"
                          onClick={() =>
                            handleReportSubmit(
                              review.reviewNo,
                              review.reportCount
                            )
                          }
                          sx={{ mt: 3 }}
                          fullWidth
                        >
                          신고 제출
                        </Button>
                      </Box>
                    </MuiModal>
                  </div>
                  {review.memberNo === loginNo && (
                    <div
                      onClick={() => {
                        console.log("수정하기 클릭됨"); // 확인용 로그
                        navigate(`/lodgment/reviewUpdate`, {
                          state: { reviewNo: review.reviewNo },
                        });
                      }}
                    >
                      수정하기
                    </div>
                  )}
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

export default LodgmentReviewUpdate;
