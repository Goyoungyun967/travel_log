import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loginNoState } from "../utils/RecoilData";
import { useNavigate } from "react-router-dom";
import PageNavi from "../utils/PageNavi";
import MemberPageNavi from "./MemberPageNavi";

const MyBoard = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [boardList, setBoardList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  const [memberNo, setMemberNo] = useRecoilState(loginNoState);

  useEffect(() => {
    axios
      .get(`${backServer}/member/board/list/${memberNo}/${reqPage}`)
      .then((res) => {
        console.log(res.data);
        setBoardList(res.data.list);
        setPi(res.data.pi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPage, memberNo]);
  return (
    <div className="mk-board-wrap">
      <div className="mk-board-title">
        <h4>나의 게시물</h4>
      </div>
      <table className="mk-board-table">
        <thead>
          <tr>
            <th className="mk-board-thumb">썸네일</th>
            <th className="mk-board-writer">작성자</th>
            <th className="mk-board-title">제목</th>
            <th className="mk-board-date">작성일</th>
          </tr>
        </thead>
        <tbody className="mk-board-list">
          {boardList.map((board, i) => {
            return (
              <BoardItem key={"member-board" + i} board={board}></BoardItem>
            );
          })}
        </tbody>
      </table>
      <div className="mk-paging-wrap">
        <MemberPageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
      </div>
    </div>
  );
};

const BoardItem = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const board = props.board;

  //작성 시간
  const now = new Date();
  const regDate = new Date(board.regDate);
  const time = now - regDate;
  const seconds = Math.floor(time / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30.44);
  const years = Math.floor(months / 12);

  // 시간 포맷
  let timeString = "";
  if (years > 0) timeString = `${years}년 전`;
  else if (months > 0) timeString = `${months}달 전`;
  else if (days > 0) timeString = `${days}일 전`;
  else if (hours > 0) timeString = `${hours}시간 전`;
  else if (minutes > 0) timeString = `${minutes}분 전`;
  else timeString = `방금전`;

  const navigate = useNavigate();
  return (
    <tr
      onClick={() => {
        console.log(board.boardType);
        if (board.boardType === 1) {
          navigate(
            `/board/view/${board.boardNo}/${encodeURIComponent(timeString)}`
          );
        } else if (board.boardType === 2) {
          navigate(
            `/board/AccompanyView/${board.boardNo}/${encodeURIComponent(
              timeString
            )}`
          );
        }
      }}
    >
      <th className="mk-board-thumb-list">
        <img
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
          src={
            board.thumb
              ? `${backServer}/board/thumb/`
              : "/image/board_default_img.png"
          }
        ></img>
      </th>
      <td className="mk-board-writer-list">{board.memberNickname}</td>
      <td className="mk-board-title-list">{board.boardTitle}</td>
      <td className="mk-board-date-list">{board.regDate}</td>
    </tr>
  );
};
export default MyBoard;
