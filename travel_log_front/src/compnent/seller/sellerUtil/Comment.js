import * as React from "react";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import PageNavi from "../../utils/PageNavi";
import { Button } from "@mui/material";
import { ReviewSlideImg } from "./SlideImg";

const Comment = (props) => {
  const { reviewList, setReviewList, reqPage, setReqPage, pi } = props;
  console.log("review - ", reviewList);
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
              <Typography level="title-md">{review.memberId}</Typography>
              <Typography>{review.reviewContent}</Typography>
              <Typography>
                <Button>답글달기</Button>
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

export default Comment;
