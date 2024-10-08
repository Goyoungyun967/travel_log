import { useRecoilState } from "recoil";
import { faqListState, loginNoState } from "../utils/RecoilData";
import { useEffect, useState } from "react";
import axios from "axios";

const MyComment = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [faqList, setFaqList] = useRecoilState(faqListState);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  const [memberNo, setMemberNo] = useRecoilState(loginNoState);

  useEffect(() => {
    axios
      .get(`${backServer}/member/myfaq/list/${memberNo}/${reqPage}}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });
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
          <tr>
            <td className="mk-question-date-list"></td>
            <td className="mk-question-title-list"></td>
            <td className="mk-question-state-list"></td>
          </tr>
        </tbody>
      </table>
      <div className="board-paging-wrap">여기는 페이징 존입니다.</div>
    </div>
  );
};

export default MyComment;
