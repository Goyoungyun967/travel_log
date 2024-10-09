import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import FavoriteIcon from "@mui/icons-material/Favorite"; // 채워진 하트
import SaveIcon from "@mui/icons-material/Save"; // 저장 모양
import ChatBubbleIcon from "@mui/icons-material/ChatBubble"; // 댓글
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // 뒤로가기 모양
import Modal from "react-modal"; // 모달
import BoardCommnet from "./BoardComment";
import { useRecoilState } from "recoil";
import { loginNicknameState, loginNoState } from "../utils/RecoilData";
import "./board.css";
import ReportModal from "./ReportModal";

const BoardView = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [loginNo, setLoginNo] = useRecoilState(loginNoState);
  const [loginNickname, setLoginNicName] = useRecoilState(loginNicknameState);
  const memberNo = loginNo;
  const navigate = useNavigate();
  const params = useParams();
  const boardNo = params.boardNo;
  const regDate = params.timeString;
  const [likeCount, setLikeCount] = useState();
  const [isLike, setIsLike] = useState(0);
  const [board, setBoard] = useState(null);
  //모달창 관련
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comfirm, setComfirm] = useState(false);

  const reportBoard = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    axios
      .get(`${backServer}/board/boardNo/${boardNo}`)
      .then((res) => {
        setBoard(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [comfirm, likeCount, isLike]);

  const deleteBoard = () => {
    axios
      .delete(`${backServer}/board/delete/${boardNo}`)
      .then((res) => {
        if (res.data === 1) {
          navigate("/board/list");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const likeClick = () => {
    //console.log(board.isLike);
    if (board.isLike === 1) {
      axios
        .delete(`${backServer}/board/unlike/${boardNo}/${memberNo}`)
        .then((res) => {
          if (res.data === 0) {
            setComfirm(!comfirm);
            console.log("삭제 : " + res.data);
          }
        })
        .catch((err) => {
          console.error("좋아요 취소 중 오류 발생:", err);
        });
    } else {
      axios
        .post(`${backServer}/board/like/${boardNo}/${memberNo}`)
        .then((res) => {
          console.log(res.data);
          if (res.data === 1) {
            console.log("좋아요 : " + res.data);
            setComfirm(!comfirm);
          }
        })
        .catch((err) => {
          console.error("좋아요 요청 중 오류 발생:", err);
        });
    }
  };

  return board ? (
    <div className="board-view-wrap">
      <div className="board-view-content">
        <div className="board-view-info">
          <Link className="board-back-icon" to={`/board/list/`}>
            <ArrowBackIcon />
          </Link>
          <div className="board-view-silde">
            <div className="board-view-head">
              <div className="board-nick-wrap">
                <Container
                  style={{
                    width: "500px",
                    margin: 0,
                    padding: "5px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Col xs={2} md={2}>
                    <Image
                      src="/image/board_default_img.png"
                      className="nick-img-circle"
                      roundedCircle
                    />
                  </Col>
                  <Col xs={10} md={10} style={{ padding: 0 }}>
                    <div
                      className="text-medium"
                      style={{ paddingLeft: "23px" }}
                    >
                      {board.memberNickname}
                    </div>
                    <div className="text-min" style={{ paddingLeft: "50px" }}>
                      {regDate}
                    </div>
                  </Col>
                </Container>
              </div>
              <div className="board-flex">
                <div
                  className="boardList-area-view"
                  style={{ marginLeft: "auto" }}
                >
                  {board.boardArea}
                </div>
              </div>
            </div>
            <div className="board-view-title">
              <h5>{board.boardTitle}</h5>
            </div>
            <div className="board-silde-wrap">
              <Carousel interval={2000}>
                <Carousel.Item
                  style={{ height: "300px" }}
                  className="board-carousel-item"
                >
                  <img
                    src={
                      board.boardThumb
                        ? `${backServer}/board/thumb/${board.boardThumb}`
                        : "/image/board_default_img.png"
                    }
                    className="board-img-fluid"
                    alt="슬라이드 이미지"
                  />
                </Carousel.Item>
                {board.fileList.length > 0 ? (
                  board.fileList.map((file, i) => (
                    <Carousel.Item
                      key={`img-file-${i}`}
                      className="board-carousel-item"
                    >
                      <img
                        src={`${backServer}/board/${file.filepath}`}
                        className="board-img-fluid"
                        alt={`파일 이미지 ${i + 1}`}
                      />
                    </Carousel.Item>
                  ))
                ) : (
                  <Carousel.Item className="board-carousel-item">
                    <img
                      src="/image/board_default_img.png"
                      className="board-img-fluid"
                      alt="기본 이미지"
                    />
                  </Carousel.Item>
                )}
              </Carousel>
            </div>
          </div>

          <div
            className="board-view-text-wrap"
            dangerouslySetInnerHTML={{ __html: board.boardContent }}
          />
        </div>

        <div className="view-btn-zone">
          <button className="board-report-btn" onClick={reportBoard}>
            신고
          </button>
          <ReportModal
            boardNo={board.boardNo}
            memberNo={loginNo}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
          <>
            {loginNickname === board.memberNickname ? (
              <>
                <Link
                  to={`/board/update/${board.boardNo}`}
                  className="board-update-btn"
                >
                  수정
                </Link>
                <button
                  type="button"
                  className="board-delete-btn"
                  onClick={deleteBoard}
                >
                  삭제
                </button>
              </>
            ) : (
              ""
            )}
          </>
        </div>

        {/* <div className="view-like-comment-keep">
          <div className="board-like sub-item" onClick={likeClick}>
            {board.isLike === 0 ? (
              "좋아요"
            ) : (
              <>
                <FavoriteIcon /> {board.likeCount}
              </>
            )}
          </div>
          <div className="board-comment sub-item">
            {board.commentCount === 0 ? (
              "댓글"
            ) : (
              <>
                <ChatBubbleIcon /> {board.commentCount}
              </>
            )}
          </div>
          <div className="board-keep sub-item-right">
            {board.keepCount === 0 ? (
              "저장"
            ) : (
              <>
                <SaveIcon /> {board.keepCount}
              </>
            )}
          </div>
        </div> */}

        <div className="board-comment-wrap">
          <BoardCommnet board={board} />
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default BoardView;
