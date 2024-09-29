import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite"; // 좋아요 아이콘
import ChatBubbleIcon from "@mui/icons-material/ChatBubble"; // 댓글 아이콘
import SaveIcon from "@mui/icons-material/Save"; // 저장 아이콘
import { useRecoilState } from "recoil";
import { memberNicknameState } from "../utils/RecoilData";

const BoardComment = (props) => {
  const board = props.board;

  const [comments, setComments] = useState([]);
  const [inputValue, setInputValue] = useState("");

  //작성 시간(댓글부분으로 바꾸면 됨)
  const now = new Date();
  console.log(now);
  const regDate = new Date(board.regDate);
  const time = now - regDate;
  console.log(regDate);
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

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (inputValue.trim()) {
      const newComment = {
        id: comments.length + 1, // ID 생성 로직
        user: "{board.boardNickName}", // 실제 사용자 이름으로 대체
        content: inputValue,
        date: timeString,
        likes: 0, // 초기 좋아요 수
      };
      setComments([...comments, newComment]);
      setInputValue(""); // 입력 필드 초기화
    }
  };

  const handleLike = (id) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
      )
    );
  };

  return (
    <div className="comment-section">
      <h3>댓글</h3>

      <div className="comment-input">
        <textarea
          placeholder="댓글을 입력하세요..."
          rows="3"
          value={inputValue}
          onChange={handleInputChange}
          className="comment-textarea"
        />

        <button className="comment-submit-btn" onClick={handleSubmit}>
          댓글 작성
        </button>
      </div>

      <div className="comment-list">
        {comments.map((comment) => (
          <div className="comment-item" key={comment.id}>
            <div className="comment-user">{comment.user}</div>
            <div className="comment-content">{comment.content}</div>
            <div className="comment-date">{comment.date}</div>
            <div className="comment-likes">
              <button onClick={() => handleLike(comment.id)}>👍</button>
              <span>{comment.likes} 좋아요</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardComment;
