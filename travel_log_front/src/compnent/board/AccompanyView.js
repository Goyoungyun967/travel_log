import { useRecoilState } from "recoil";
import { loginNicknameState, loginNoState } from "../utils/RecoilData";
import Image from "react-bootstrap/Image";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import SaveIcon from "@mui/icons-material/Save"; //저장 모양
import ChatBubbleIcon from "@mui/icons-material/ChatBubble"; //댓글
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; //뒤로가기 모양

const AccompanyView = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [loginNo, setLoginNo] = useRecoilState(loginNoState);
  const [loginNickname, setLoginNicName] = useRecoilState(loginNicknameState);
  const params = useParams();
  const boardNo = params.boardNo;
  const regDate = params.regDate;
  const [accompany, setAccompany] = useState(null);
  console.log(accompany);

  useEffect(() => {
    axios
      .get(`${backServer}/board/accompanyNo/${boardNo}`)
      .then((res) => {
        setAccompany(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  return accompany ? (
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
                      {loginNickname}
                    </div>
                    <div className="text-min" style={{ paddingLeft: "50px" }}>
                      {regDate}
                    </div>
                  </Col>
                </Container>
              </div>
              <div className="board-flex">
                <div className="boardList-area-view">{accompany.boardArea}</div>
              </div>
            </div>
            <div className="board-view-title">
              <h5>{accompany.boardTitle}</h5>
            </div>
            <div className="board-silde-wrap">
              <Carousel interval={2000}>
                <Carousel.Item>
                  <img
                    src={
                      accompany.boardThumb
                        ? `${backServer}/board/thumb/${accompany.boardThumb}`
                        : "/image/board_default_img.png"
                    }
                    className="board-img-fluid" // 반응형 이미지
                  />
                </Carousel.Item>
                {accompany.fileList.length > 0 ? (
                  accompany.fileList.map((file, i) => (
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
            dangerouslySetInnerHTML={{ __html: accompany.boardContent }}
          />
        </div>

        <div className="view-btn-zone">
          <Link
            to={`/board/AccompanyUpdate/${accompany.boardNo}`}
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
      </div>
    </div>
  ) : (
    ""
  );
};
export default AccompanyView;
