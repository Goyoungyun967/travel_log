import { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { loginNicknameState, loginNoState } from "../utils/RecoilData";
import dayjs from "dayjs";
import FavoriteIcon from "@mui/icons-material/Favorite"; // 채워진 하트
import { useParams } from "react-router-dom";
import CommentReportModal from "./CommentReportModal";

const BoardComment = ({ board }) => {
  const backServer = process.env.REACT_APP_BACK_SERVER; // 백엔드 서버 주소
  const [loginNo, setLoginNo] = useRecoilState(loginNoState);
  const [commentList, setCommentList] = useState([]); // 댓글 목록
  const [commentValue, setCommentValue] = useState(""); // 댓글 입력값
  const [editCommentId, setEditCommentId] = useState(null); // 수정 중인 댓글 ID
  const [editValue, setEditValue] = useState(""); // 수정 입력값
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [loginNickname] = useRecoilState(loginNicknameState);
  //좋아요
  const { isLike: isLikeParam, likeCount: likeCountParam } = useParams();
  const [likeCount, setLikeCount] = useState(Number(likeCountParam));
  const [isLike, setIsLike] = useState(Number(isLikeParam));
  //신고 모달창
  const [isModalOpen, setIsModalOpen] = useState(false);

  const reportBoard = () => {
    setIsModalOpen(true);
  };

  // 댓글 목록 불러오기
  useEffect(() => {
    axios
      .get(`${backServer}/board/commentList/${board.boardNo}`)
      .then((response) => {
        const commentsWithFormattedDate = response.data.map((comment) => ({
          ...comment,
          commentDate: dayjs(comment.commentDate).format("YYYY-MM-DD"), // 'YYYY-MM-DD' 형식으로 포맷
        }));
        console.log(commentsWithFormattedDate); // 포맷된 날짜 확인
        setCommentList(commentsWithFormattedDate);
      })
      .catch((error) => {
        console.error("댓글 불러오기 실패:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [board.boardNo, commentValue, isLike]);

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
          commentContent: editValue.trim(), // 여기서 commentContent를 사용
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

  // 댓글 좋아요 핸들러
  const commentLikeClick = (comment, loginNo) => {
    const commentNo = comment.commentNo;
    const memberNo = loginNo;
    if (isLike === 1) {
      // 좋아요 취소 요청
      axios
        .delete(`${backServer}/board/unlikeComment/${memberNo}/${commentNo}`)
        .then(() => {
          setLikeCount((prevCount) => prevCount - 1);
          setIsLike(0);
        })
        .catch((err) => {
          console.error("좋아요 취소 중 오류 발생:", err);
        });
    } else {
      // 좋아요 추가 요청
      axios
        .post(`${backServer}/board/likeComment/${memberNo}/${commentNo}`)
        .then(() => {
          setLikeCount((prevCount) => prevCount + 1);
          setIsLike(1);
        })
        .catch((err) => {
          console.error("좋아요 요청 중 오류 발생:", err);
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
            onKeyPress={(e) => {
              // 엔터 키가 눌렸을 때
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // 기본 동작 방지
                handleCommentSubmit(); // 댓글 제출
              }
            }}
          />
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
                      className="comment-edit-textarea"
                      onKeyPress={(e) => {
                        // 엔터 키가 눌렸을 때
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault(); // 기본 동작 방지
                          handleEditSubmit(comment.commentNo); // 댓글 수정 제출
                        }
                      }}
                    />
                  </>
                ) : (
                  <>
                    <p>{comment.commentContent}</p>
                    <div
                      className="commnet-like"
                      onClick={() => commentLikeClick(comment, loginNo)}
                    >
                      {comment.commentLikeCount === 0 ? (
                        "좋아요"
                      ) : (
                        <>
                          <FavoriteIcon /> {comment.commentLikeCount}
                        </>
                      )}
                    </div>
                    <div className="comment-report-div">
                      <button
                        className="commnet-report-btn"
                        onClick={reportBoard}
                      >
                        신고
                      </button>
                      <CommentReportModal
                        commentNo={comment.commentNo}
                        memberNo={loginNo}
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                      />
                    </div>
                    <></>
                    <>
                      {loginNickname === board.memberNickname ? (
                        <>
                          {" "}
                          <button
                            className="comment-update-btn"
                            onClick={() => handleCommentEdit(comment)}
                          >
                            수정
                          </button>
                          <button
                            className="comment-del-btn"
                            onClick={() =>
                              handleCommentDelete(comment.commentNo)
                            }
                          >
                            삭제
                          </button>
                        </>
                      ) : (
                        ""
                      )}
                    </>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="no-comments-message">댓글써줭~</p>
        )}
      </div>
    </div>
  );
};

export default BoardComment;
