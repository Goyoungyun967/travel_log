import axios from "axios";
import { useEffect, useState } from "react";
import PageNavi from "../utils/PageNavi";

const LodgmentReviewList = (props) => {
  const lodgmentNo = props.lodgmentNo;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  console.log(backServer);
  useEffect(() => {
    axios
      .get(`${backServer}/lodgment/reviewList/${lodgmentNo}/${reqPage}`)
      .then((res) => {
        console.log(res);
        setPi(res.data.pi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <div className="review-wrap">ddddd</div>
      <div>
        <PageNavi reqPage={reqPage} setReqPage={setReqPage} pi={pi} />
      </div>
    </div>
  );
};
export default LodgmentReviewList;
