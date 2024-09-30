// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useRecoilState } from "recoil";
// import { memberNicknameState } from "../utils/RecoilData"; // 사용자 닉네임 상태 관리

// const BoardComment = ({ board }) => {
//   const backServer = process.env.REACT_APP_BACK_SERVER; // 백엔드 서버 주소
//   const [memberNickname] = useRecoilState(memberNicknameState); // 사용자 닉네임
//   const [commentList, setCommentList] = useState([]); // 댓글 목록
//   const [commentValue, setCommentValue] = useState(""); // 댓글 입력값
//   const [editCommentId, setEditCommentId] = useState(null); // 수정 중인 댓글 ID
//   const [editValue, setEditValue] = useState(""); // 수정 입력값

//   // 댓글 목록 불러오기
//   useEffect(() => {
//     axios
//       .get(`${backServer}/board/commentList/${board.boardNo}`)
//       .then((res) => {
//         setCommentList(res.data); // 댓글 목록 저장
//       })
//       .catch((err) => {
//         console.error("댓글 불러오기 실패:", err);
//       });
//   }, [board.boardNo]);

//   // 댓글 제출 핸들러
//   const handleCommentSubmit = () => {
//     const trimmedValue = commentValue.trim();
//     if (trimmedValue) {
//       const newComment = {
//         boardNo: board.boardNo,
//         user: memberNickname,
//         content: trimmedValue,
//         parentCommentId: 0, // 일반 댓글은 parentCommentId가 0
//       };

//       axios
//         .post(`${backServer}/board/AddComment/${memberNickname}`, newComment)
//         .then((res) => {
//           setCommentList((prev) => [...prev, res.data]); // 댓글 목록 업데이트
//           setCommentValue(""); // 입력 필드 초기화
//         })
//         .catch((err) => {
//           console.error("댓글 전송 실패:", err);
//           alert("댓글 전송에 실패했습니다. 다시 시도해 주세요."); // 사용자에게 오류 메시지 표시
//         });
//     }
//   };

//   // 댓글 수정 핸들러
//   const handleCommentEdit = (comment) => {
//     setEditCommentId(comment.commentNo);
//     setEditValue(comment.commentContent);
//   };

//   // 댓글 수정 제출 핸들러
//   const handleEditSubmit = (commentId) => {
//     if (editValue.trim()) {
//       axios
//         .patch(`${backServer}/board/editComment/${commentId}`, {
//           content: editValue,
//         })
//         .then(() => {
//           setCommentList((prevComments) =>
//             prevComments.map((comment) =>
//               comment.commentNo === commentId
//                 ? { ...comment, commentContent: editValue }
//                 : comment
//             )
//           );
//           setEditCommentId(null); // 수정 모드 종료
//           setEditValue(""); // 입력 필드 초기화
//         })
//         .catch((err) => {
//           console.error("댓글 수정 실패:", err);
//           alert("댓글 수정에 실패했습니다. 다시 시도해 주세요."); // 사용자에게 오류 메시지 표시
//         });
//     }
//   };

//   return (
//     <div className="board-comment-section">
//       <h3>댓글</h3>

//       {/* 댓글 입력 영역 */}
//       <div className="comment-input-wrapper">
//         <textarea
//           placeholder="댓글을 입력하세요..."
//           rows="3"
//           value={commentValue}
//           onChange={(e) => setCommentValue(e.target.value)}
//           className="comment-textarea"
//         />
//         <button onClick={handleCommentSubmit} className="submit-comment-btn">
//           작성
//         </button>
//       </div>

//       {/* 댓글 목록 표시 */}
//       <div className="comment-list-wrapper">
//         {commentList.length > 0 ? (
//           commentList.map((comment) => (
//             <div className="comment-item" key={comment.commentNo}>
//               <div className="comment-user">{comment.commentWriter}</div>
//               <div className="comment-content">
//                 {editCommentId === comment.commentNo ? (
//                   <>
//                     <textarea
//                       value={editValue}
//                       onChange={(e) => setEditValue(e.target.value)}
//                       className="edit-textarea"
//                     />
//                     <button onClick={() => handleEditSubmit(comment.commentNo)}>
//                       수정 완료
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     {comment.commentContent}
//                     <button onClick={() => handleCommentEdit(comment)}>
//                       수정
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="no-comments-message">
//             댓글이 없습니다. 첫 댓글을 작성해보세요!
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BoardComment;
