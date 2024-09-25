import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import "./board.css";

const BoardView = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const boardNo = params.boardNo;
  const [board, setBoard] = useState(null);

  useEffect(() => {
    axios
      .get(`${backServer}/board/boardNo/${boardNo}`)
      .then((res) => {
        setBoard(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [boardNo]);

  return board ? (
    <div className="board-view-wrap">
      <div className="board-view-content">
        <div className="board-view-info">
          <div className="board-view-silde">
            <div className="board-view-head">
              <div className="board-nick-wrap">
                <Container className="board-member-img left flt">
                  <Col xs={6} md={4}>
                    <Image
                      src="/image/board_default_img.png"
                      className="nick-img-circle"
                      roundedCircle
                    />
                  </Col>
                </Container>
              </div>

              <span style={{ width: "30%" }}>{board.boardWriter} 닉네임</span>
              <span style={{ width: "30%" }}>{board.boardDate} 작성일</span>
            </div>
            <div className="board-silde-wrap">
              <Carousel interval={1000}>
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
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default BoardView;
