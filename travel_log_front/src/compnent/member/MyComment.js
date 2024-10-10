import { useRecoilState } from "recoil";
import { faqListState, InqListState, loginNoState } from "../utils/RecoilData";
import { useEffect, useState } from "react";
import axios from "axios";
import PageNavi from "../utils/PageNavi";
import { useNavigate } from "react-router-dom";
import MemberPageNavi from "./MemberPageNavi";

const MyComment = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [inqList, setInqList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  const [memberNo, setMemberNo] = useRecoilState(loginNoState);

  useEffect(() => {
    axios
      .get(`${backServer}/member/myInq/list/${memberNo}/${reqPage}`)
      .then((res) => {
        console.log(res);
        setInqList(res.data.list);
        setPi(res.data.pi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPage, memberNo]);
  return (
    <div className="mk-question-wrap">
      <div className="mk-question-title">
        <h4>나의 문의글</h4>
      </div>
      <table className="mk-question-table">
        <thead>
          <tr>
            <th className="mk-question-date">문의 날짜</th>
            <th className="mk-question-room">문의 제목</th>
            <th className="mk-question-write">답변상태</th>
          </tr>
        </thead>
        <tbody className="mk-question-list">
          {inqList.map((inquiry, i) => {
            return <InqItem key={"inquiry" + i} inquiry={inquiry} />;
          })}
        </tbody>
      </table>
      <div className="mk-paging-wrap">
        <MemberPageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
      </div>
    </div>
  );
};

const InqItem = (props) => {
  const inquiry = props.inquiry;
  const navigate = useNavigate();

  return (
    <tr
      onClick={() => {
        navigate(`/member/inquiryView/${inquiry.inquiryNo}`);
      }}
    >
      <td className="mk-question-date-list">{inquiry.regDate}</td>
      <td className="mk-question-title-list">{inquiry.inquiryTitle}</td>
      <td className="mk-question-state-list">
        {inquiry.inquiryReplyNo > 0 ? "답변완료" : "임형묵 사망 대기중"}
      </td>
    </tr>
  );
};

export default MyComment;
