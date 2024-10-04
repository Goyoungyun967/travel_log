import { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { loginNicknameState } from "../utils/RecoilData";

const BoardComment = ({ board }) => {
  const backServer = process.env.REACT_APP_BACK_SERVER; // 백엔드 서버 주소

  const [commentList, setCommentList] = useState([]); // 댓글 목록
  const [commentValue, setCommentValue] = useState(""); // 댓글 입력값
  const [editCommentId, setEditCommentId] = useState(null); // 수정 중인 댓글 ID
  const [editValue, setEditValue] = useState(""); // 수정 입력값
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [loginNickname] = useRecoilState(loginNicknameState);

  // 댓글 목록 불러오기
  useEffect(() => {
    axios
      .get(`${backServer}/board/commentList/${board.boardNo}`)
      .then((response) => {
        console.log(response.data);
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
    if (commentValue.trim() !== "") {
      const form = new FormData();
      form.append("commentContent", commentValue.trim());
      form.append("commentWriter", loginNickname);
      form.append("boardNo", board.boardNo);

      axios
        .post(`${backServer}/board/insertComment`, form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          // 댓글 추가 후 목록을 다시 불러옴
          console.log(res.data);
          setCommentList((prevComments) => [...prevComments, res.data]);
          setCommentValue(""); // 입력 필드 초기화
        })
        .catch((err) => {
          console.error("댓글 추가 실패:", err);
        });
    } else {
      alert("댓글 내용을 입력하세요.");
    }
  };

  // 댓글 수정 핸들러
  const handleCommentEdit = (comment) => {
    setEditCommentId(comment.commentNo);
    setEditValue(comment.commentContent);
  };

  // 댓글 수정 제출 핸들러
  const handleEditSubmit = (commentNo) => {
    if (editValue.trim()) {
      axios
        .patch(`${backServer}/board/editComment/${commentNo}`, {
          commentContent: editValue.trim(),
        })
        .then(() => {
          setCommentList((prevComments) =>
            prevComments.map((comment) =>
              comment.commentNo === commentNo
                ? { ...comment, commentContent: editValue }
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
  const handleCommentDelete = (commentNo) => {
    console.log(commentNo);
    axios
      .delete(`${backServer}/board/deleteComment/${commentNo}`)
      .then(() => {
        setCommentList((prevComments) =>
          prevComments.filter((comment) => comment.commentNo !== commentNo)
        ); // 댓글 목록에서 삭제
      })
      .catch((error) => {
        console.error("댓글 삭제 실패:", error);
        alert("댓글 삭제에 실패했습니다. 다시 시도해 주세요.");
      });
  };

  if (loading) {
    return <p>로딩 중...</p>; // 로딩 상태 표시
  }
  console.log(commentList);

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
            <div className="comment-item" key={comment.commentNo}>
              <div className="comment-user">{comment.commentWriter}</div>
              <div className="comment-content">
                {editCommentId === comment.commentNo ? (
                  <>
                    <textarea
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="edit-textarea"
                    />
                    <button onClick={() => handleEditSubmit(comment.commentNo)}>
                      수정 완료
                    </button>
                  </>
                ) : (
                  <>
                    <p>{comment.commentContent}</p>
                    <button onClick={() => handleCommentEdit(comment)}>
                      수정
                    </button>
                    <button
                      onClick={() => handleCommentDelete(comment.commentNo)}
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
