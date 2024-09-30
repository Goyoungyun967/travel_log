import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import FavoriteIcon from "@mui/icons-material/Favorite"; // 채워진 하트
import "./board.css";
import SaveIcon from "@mui/icons-material/Save"; //저장 모양
import ChatBubbleIcon from "@mui/icons-material/ChatBubble"; //댓글
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; //뒤로가기 모양
import BoardCommnet from "./BoardComment";
import { useRecoilState } from "recoil";
import { loginNoState } from "../utils/RecoilData";
const BoardView = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [loginNo, setLoginNo] = useRecoilState(loginNoState);
  const memberNo = loginNo;
  const navigate = useNavigate();
  const params = useParams();
  const boardNo = params.boardNo;
  const regDate = params.timeString;
  const { isLike: isLikeParam, likeCount: likeCountParam } = useParams();
  const [likeCount, setLikeCount] = useState(Number(likeCountParam));
  const [isLike, setIsLike] = useState(Number(isLikeParam));
  const [board, setBoard] = useState(null);
  console.log(board);

  useEffect(() => {
    axios
      .get(`${backServer}/board/boardNo/${boardNo}`)
      .then((res) => {
        setBoard(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isLike]);
  //
  const deleteBoard = () => {
    axios
      .delete(`${backServer}/board/delete/${boardNo}`)
      .then((res) => {
        console.log(res);
        if (res.data === 1) {
          navigate("/board/list");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const likeClick = () => {
    if (isLike === 1) {
      // 좋아요 취소 요청
      axios
        .delete(`${backServer}/board/unlike/${boardNo}/${memberNo}`)
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
        .post(`${backServer}/board/like/${boardNo}/${memberNo}`)
        .then(() => {
          setLikeCount((prevCount) => prevCount + 1);
          setIsLike(1);
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
                      {board.boardWriter} 닉네임
                    </div>
                    <div className="text-min" style={{ paddingLeft: "50px" }}>
                      {regDate}
                    </div>
                  </Col>
                </Container>
              </div>
              <div className="board-flex">
                <div className="boardList-area-view">{board.boardArea}</div>
              </div>
            </div>
            <div className="board-view-title">
              <h5>{board.boardTitle}</h5>
            </div>
            <div className="board-silde-wrap">
              <Carousel interval={2000}>
                <Carousel.Item>
                  <img
                    src={
                      board.boardThumb
                        ? `${backServer}/board/thumb/${board.boardThumb}`
                        : "/image/board_default_img.png"
                    }
                    className="board-img-fluid" // 반응형 이미지
                  />
                </Carousel.Item>
                {board.fileList.length > 0 ? (
                  board.fileList.map((file, i) => (
                    <Carousel.Item key={`img-file-${i}`}>
                      <img
                        src={`${backServer}/board/${file.filepath}`}
                        className="board-img-fluid"
                      />
                    </Carousel.Item>
                  ))
                ) : (
                  <Carousel.Item>
                    <img
                      src="/image/board_default_img.png"
                      className="board-img-fluid"
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
        </div>
        {/* 좋아요, 댓글 수, 저장 기능 */}
        {/**/}
        <div className="like-comment-keep view-like-comment-keep">
          <div className="board-like sub-item" onClick={likeClick}>
            {board.likeCount === 0 ? (
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
        </div>
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
