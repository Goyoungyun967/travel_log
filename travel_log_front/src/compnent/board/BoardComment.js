import { useState, useEffect } from "react";
import axios from "axios";
import { Backspace } from "@mui/icons-material";

const BoardComment = ({ board }) => {
  const backServer = process.env.REACT_APP_BACK_SERVER; // 백엔드 서버 주소

  const [commentList, setCommentList] = useState([]); // 댓글 목록
  const [commentValue, setCommentValue] = useState(""); // 댓글 입력값
  const [editCommentId, setEditCommentId] = useState(null); // 수정 중인 댓글 ID
  const [editValue, setEditValue] = useState(""); // 수정 입력값
  const [loading, setLoading] = useState(true); // 로딩 상태
  const memberNickname = board.memberNickname;

  // 댓글 목록 불러오기
  useEffect(() => {
    axios
      .get(`${backServer}/board/commentList/${board.boardNo}`)
      .then((response) => {
        setCommentList(response.data);
      })
      .catch((error) => {
        console.error("댓글 불러오기 실패:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [board.boardNo]);

  // 댓글 제출 핸들러
  const handleCommentSubmit = () => {
    if (commentValue !== "") {
      const form = new FormData();
      form.append("commentContent", commentValue);
      form.append("memberNickname", memberNickname);
      form.append("boardNo", board.boardNo);
      axios
        .post(`${Backspace}/board/insertComment`, form, {
          headers: {
            contentType: "multipart/form-data",
            processData: false,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // 댓글 수정 핸들러
  const handleCommentEdit = (comment) => {
    setEditCommentId(comment.comment_no);
    setEditValue(comment.comment_content);
  };

  // 댓글 수정 제출 핸들러
  const handleEditSubmit = (commentId) => {
    if (editValue.trim()) {
      axios
        .patch(`${backServer}/board/editComment/${commentId}`, {
          comment_content: editValue,
        })
        .then(() => {
          setCommentList((prevComments) =>
            prevComments.map((comment) =>
              comment.comment_no === commentId
                ? { ...comment, comment_content: editValue }
                : comment
            )
          );
          setEditCommentId(null); // 수정 모드 종료
          setEditValue(""); // 입력 필드 초기화
        })
        .catch((error) => {
          console.error("댓글 수정 실패:", error);
          alert("댓글 수정에 실패했습니다. 다시 시도해 주세요.");
        });
    }
  };

  // 댓글 삭제 핸들러
  const handleCommentDelete = (commentId) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      axios
        .delete(`${backServer}/board/deleteComment/${commentId}`)
        .then(() => {
          setCommentList((prevComments) =>
            prevComments.filter((comment) => comment.comment_no !== commentId)
          ); // 댓글 목록에서 삭제
        })
        .catch((error) => {
          console.error("댓글 삭제 실패:", error);
          alert("댓글 삭제에 실패했습니다. 다시 시도해 주세요.");
        });
    }
  };

  if (loading) {
    return <p>로딩 중...</p>; // 로딩 상태 표시
  }

  return (
    <div className="board-comment-section">
      <h3>댓글</h3>

      {/* 댓글 입력 영역 */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCommentSubmit();
        }}
      >
        <div className="comment-input-wrapper">
          <textarea
            placeholder="댓글을 입력하세요..."
            rows="3"
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
            className="comment-textarea"
            required
          />
          <button type="submit" className="submit-comment-btn">
            작성
          </button>
        </div>
      </form>

      {/* 댓글 목록 표시 */}
      <div className="comment-list-wrapper">
        {commentList.length > 0 ? (
          commentList.map((comment) => (
            <div className="comment-item" key={comment.comment_no}>
              <div className="comment-user">{comment.comment_writer}</div>
              <div className="comment-content">
                {editCommentId === comment.comment_no ? (
                  <>
                    <textarea
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="edit-textarea"
                    />
                    <button
                      onClick={() => handleEditSubmit(comment.comment_no)}
                    >
                      수정 완료
                    </button>
                  </>
                ) : (
                  <>
                    <p>{comment.comment_content}</p>
                    <button onClick={() => handleCommentEdit(comment)}>
                      수정
                    </button>
                    <button
                      onClick={() => handleCommentDelete(comment.comment_no)}
                    >
                      삭제
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="no-comments-message">
            댓글이 없습니다. 첫 댓글을 작성해보세요!
          </p>
        )}
      </div>
    </div>
  );
};

export default BoardComment;
