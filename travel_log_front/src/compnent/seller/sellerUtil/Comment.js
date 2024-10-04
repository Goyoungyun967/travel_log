import * as React from "react";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import PageNavi from "../../utils/PageNavi";
import { Button } from "@mui/material";
import { ReviewSlideImg } from "./SlideImg";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Textarea from "@mui/joy/Textarea";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Comment = (props) => {
  const {
    reviewList,
    setReviewList,
    reqPage,
    setReqPage,
    pi,
    sellerText,
    setSellerText,
  } = props;
  console.log("review - ", reviewList);
  const [textComment, setTextComment] = useState(false);
  const [viewTextComment, setViewTextComment] = useState(false);
  const addComment = (reviewNo) => {
    setTextComment((prev) => ({
      ...prev,
      [reviewNo]: !prev[reviewNo], // 현재 reviewNo에 해당하는 값만 토글
    }));
  };
  const viewComment = (reviewNo) => {
    setViewTextComment((prev) => ({
      ...prev,
      [reviewNo]: !prev[reviewNo], // 현재 reviewNo에 해당하는 값만 토글
    }));
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gap: 2,
      }}
    >
      {reviewList.map((review, i) => {
        console.log("review - ", review);
        return (
          <Card variant="outlined" key={i}>
            <CardContent>
              <ReviewSlideImg fileList={review.fileList} />
              <Typography component="div" level="title-md">
                {review.memberId}
              </Typography>
              <Typography component="div">
                <ReviewStar star={review.rating} />
              </Typography>
              <Typography component="div">{review.reviewContent}</Typography>
              <Typography component="div">
                {review.sellerComment === null ? (
                  <>
                    <Button onClick={() => addComment(review.reviewNo)}>
                      {textComment[review.reviewNo] ? "답글 취소" : "답글 달기"}
                    </Button>
                    {textComment[review.reviewNo] ? (
                      <TextForm
                        reviewNo={review.reviewNo}
                        lodgmentNo={review.lodgmentNo}
                        setReviewList={setReviewList}
                        sellerText={sellerText}
                        setSellerText={setSellerText}
                        reqPage={reqPage}
                      />
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  <>
                    <Button onClick={() => viewComment(review.reviewNo)}>
                      {viewTextComment[review.reviewNo]
                        ? "답글 닫기"
                        : "답글 보기"}
                    </Button>
                    {viewTextComment[review.reviewNo] ? (
                      <Card>
                        <CardContent>
                          <Typography component="div" color="primary">
                            [ 판매자 답변 ]
                          </Typography>
                          <Typography component="div">
                            {review.sellerComment}
                          </Typography>
                        </CardContent>
                      </Card>
                    ) : (
                      ""
                    )}
                  </>
                )}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
      <div className="seller-comment-list-r">
        <PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
      </div>
    </Box>
  );
};
// 답글 달기
const TextForm = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const { lodgmentNo, setReviewList, reqPage, setSellerText } = props;
  const [text, setText] = useState("");
  const [replyText, setReplyText] = useState(""); // 상태 추가
  console.log(text);
  const { reviewNo } = props;
  console.log("asdfadsf", reviewNo);
  return (
    <Box
      sx={{
        py: 2,
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        flexWrap: "wrap",
        width: "100%",
      }}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const form = new FormData();
          form.append("reviewNo", reviewNo);
          form.append("sellerComment", text);
          axios
            .patch(`${backServer}/seller/addComment`, form, {
              headers: {
                contentType: "multipart/form-data",
                processData: false,
              },
            })
            .then((res) => {
              console.log(res);
              if (res.data !== 0) {
                setSellerText("ok");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        <Textarea
          placeholder="답글을 적어보세요!"
          sx={{ mb: 1 }}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <Button type="submit">작성 완료</Button>
      </form>
    </Box>
  );
};

// 별
const ReviewStar = (props) => {
  const star = Number(props.star);

  return (
    <Box sx={{ width: 200, display: "flex", alignItems: "center" }}>
      <Rating
        name="text-feedback"
        value={star}
        readOnly
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
    </Box>
  );
};

export default Comment;
