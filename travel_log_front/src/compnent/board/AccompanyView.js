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
import dayjs from "dayjs";
import AccompanyComment from "./AccompanyComment";
import ReportModal from "./ReportModal";
import Swal from "sweetalert2";

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
  //모달 창 관련
  const [isModalOpen, setIsModalOpen] = useState(false);
  //업데이트넘
  const [updateNo, setUpdateNo] = useState(1);

  const reportBoard = () => {
    setIsModalOpen(true);
  };

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
    Swal.fire({
      title: "삭제하시겠습니까?",
      text: "삭제는 확인 버튼을 클릭하세요.",
      icon: "warning",
      showCancelButton: true, // 취소 버튼 표시
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        // 사용자가 확인 버튼을 클릭했을 때 삭제 요청
        axios
          .delete(`${backServer}/board/delete/${boardNo}`)
          .then((res) => {
            console.log(res);
            if (res.data === 1) {
              Swal.fire("삭제되었습니다!", "", "success");
              navigate("/board/AccompanyList"); // 삭제 후 페이지 이동
            } else {
              Swal.fire("삭제 실패!", "다시 시도해주세요.", "error");
            }
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("삭제 중 오류 발생!", "문제를 해결해주세요.", "error");
          });
      } else {
        Swal.fire("삭제가 취소되었습니다.", "", "info"); // 삭제 취소 알림
      }
    });
  };
  console.log(accompany);
  // accompanyContent가 쉼표로 분리된 배열로 변환
  const accompanyContents = accompany?.accompanyContent
    ?.split("&*&")
    .map((content, index) => ({
      day: index + 1,
      description: content.trim(),
    }));
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
                      {accompany.memberNickname}
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
                  {accompany.boardArea}
                </div>
              </div>
            </div>
            <div className="board-view-title">
              <h5>{accompany.boardTitle}</h5>
            </div>
            <div className="board-silde-wrap">
              <Carousel interval={2000}>
                <Carousel.Item style={{ height: "300px" }}>
                  <img
                    src={
                      accompany.boardThumb
                        ? `${backServer}/board/thumb/${accompany.boardThumb}`
                        : "/image/board_default_img.png"
                    }
                    className="board-img-fluid"
                    alt="슬라이드 이미지"
                  />
                </Carousel.Item>
                {accompany.fileList.length > 0 ? (
                  accompany.fileList.map((file, i) => (
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
            dangerouslySetInnerHTML={{ __html: accompany.boardContent }}
          />
          <div className="board-view-date-wrap">
            <div className="accompany-day-wrap">
              <div className="accompany-day">
                <span>동행 기간 : </span>
                <span>
                  {accompany.startDay
                    ? dayjs(accompany.startDay).format("YYYY-MM-DD")
                    : ""}
                  ~
                  {accompany.endDay
                    ? dayjs(accompany.endDay).format("YYYY-MM-DD")
                    : ""}
                  {"  "}총 {accompany.accompanyDate}일
                </span>
              </div>
              <div className="accompany-type-wrap">
                {accompany.accompanyTypeTags.map((tag) => (
                  <div key={tag.accompanyTagNo} className="accompany-type-item">
                    {tag.accompanyType}
                  </div>
                ))}
              </div>
            </div>
            <div className="accompany-date-wrap">
              <div className="accompany-date-list">
                {accompanyContents &&
                  accompanyContents.map((item) => (
                    <div
                      key={item.day}
                      className="accompany-content-text-border"
                    >
                      <strong>{item.day}일차 : </strong> {item.description}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="view-btn-zone">
          <button className="board-report-btn" onClick={reportBoard}>
            신고
          </button>
          <ReportModal
            boardNo={accompany.boardNo}
            memberNo={loginNo}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
          <>
            {loginNickname === accompany.memberNickname ? (
              <>
                {" "}
                {/* <Link
                  to={`/board/AccompanyUpdate/${accompany.boardNo}/${updateNo}`}
                  className="board-update-btn"
                >
                  수정
                </Link> */}
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
        <div className="board-comment-wrap">
          <AccompanyComment accompany={accompany} />
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
export default AccompanyView;
