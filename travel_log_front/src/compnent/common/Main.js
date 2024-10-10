import SearchBar from "../lodgment/SearchBar";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { SwiperSlide, Swiper } from "swiper/react";
import {
  isLoginState,
  loginNicknameState,
  memberLevelState,
} from "../utils/RecoilData";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"; //화살표
import img1 from "./main/img1.jpg";
import img2 from "./main/img2.jpg";
import img3 from "./main/img3.jpg";
import img4 from "./main/img4.jpg";
import img5 from "./main/img5.jpg";
import { Autoplay } from "swiper/modules";
//숙소 리코일
import { useRecoilState } from "recoil";
import {
  lodgmentState,
  guestState,
  startDateState,
  endDateState,
} from "../utils/RecoilData";
import SellerLodgmentList from "../seller/SellerLodgmentList";
import StmSeller from "../seller/StmSeller";

const Main = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [lodgment, setLodgment] = useRecoilState(lodgmentState);
  const [guest, setGuest] = useRecoilState(guestState);
  const [startDate, setStartDate] = useRecoilState(startDateState);
  const [endDate, setEndDate] = useRecoilState(endDateState);

  //const today = dayjs().toDate();
  //기본 날짜 세팅
  const startDay = dayjs().add(1, "day").toDate();
  const endDay = dayjs().add(2, "day").toDate();

  // //체크인 날짜 , 체크아웃 날짜
  // const [startDate, setStartDate] = useState(startDay);
  // const [endDate, setEndDate] = useState(endDay);

  //메인 이미지 배열
  const images = [img1, img2, img3, img4, img5];

  const lodgementSearchBtn = () => {
    if (!lodgment) {
      Swal.fire({
        icon: "error",
        title: "여행지, 숙소를 입력해주세요.",
        confirmButtonText: "확인",
      });
      return;
    }
    // 유효한 검색이 이루어졌다면 다음 페이지로 이동
    navigate("/lodgment/lodgmentList");
  };
  //게시판
  const [boardList, setBoardList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [loginNickname, setLoginNicName] = useRecoilState(loginNicknameState);
  const [isLogin, setIsLogin] = useRecoilState(isLoginState); //로그인 여부

  // 멤버 레벨
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState);
  console.log(memberLevel);
  //일반게시판 가져오기
  useEffect(() => {
    axios
      .get(`${backServer}/board/boardList/1/${reqPage}`)
      .then((res) => {
        setBoardList(res.data.list); // 일반 게시글
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPage]);
  //게시판 이동
  const handleMoreClick = () => {
    navigate("/board/list");
  };

  return (
    <>
      {memberLevel === 4 ? ( // 4 : 판매자 zone
        <div className="Seller-Main-List">
          <div className="seller-lodgment-list">
            <SellerLodgmentList />
          </div>
        </div>
      ) : (
        // 회원 zone
        <div className="section">
          <div className="main-sileder-wrap">
            <Swiper
              key="main-slider"
              modules={[Autoplay]}
              speed={1000}
              slidesPerView={1}
              spaceBetween={0}
              grabCursor={true}
              loop={true}
              autoplay={{
                delay: 2500,
              }}
            >
              {images.map((img, i) => (
                <SwiperSlide key={"img-" + i}>
                  <img
                    className="slider-image"
                    style={{ width: "100%" }}
                    src={img}
                    alt={`Main slide ${i + 1}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="main-search-bar">
            <SearchBar
              lodgment={lodgment}
              setLodgment={setLodgment}
              guest={guest}
              setGuest={setGuest}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              startDay={startDay}
              endDay={endDay}
              onClick={lodgementSearchBtn}
            />
          </div>
          {/*게시판 출력 */}
          <div
            style={{ maxWidth: "1000px", margin: "150px auto" }}
            className="main-board-list-wrap"
          >
            <div className="main-board-name  flex-spbetw">
              <span>여행 게시판</span>
              <span className="board-next" onClick={handleMoreClick}>
                {/* onClick={handleMoreClick} */}
                더보기 <ArrowForwardIcon style={{ paddingBottom: "4px" }} />
              </span>
            </div>
            <Swiper
              key="board-slider"
              slidesPerView={3}
              spaceBetween={3}
              grabCursor={true}
              breakpoints={{
                // 미디어 쿼리를 통해 지정한 화면 크기마다 원하는 Swiper 옵션 지정, 반응형
                375: {
                  slidesPerView: 1, //브라우저가 375보다 클 때
                  spaceBetween: 0,
                },
                768: {
                  slidesPerView: 2, //브라우저가 768보다 클 때
                  spaceBetween: 0,
                },
                1024: {
                  slidesPerView: 3, //브라우저가 1024보다 클 때
                  spaceBetween: 0,
                },
              }}
            >
              {/* <div className="board-preview-wrap width-box"> */}
              {boardList.map((board, i) => (
                <SwiperSlide key={"board-" + i}>
                  <BoardItem
                    // key={"board-" + i}
                    board={board}
                    loginNickname={loginNickname}
                    isLogin={isLogin}
                  />
                </SwiperSlide>
              ))}
              {/* </div> */}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};
const BoardItem = (props) => {
  const board = props.board;
  const loginNickname = props.loginNickname;
  const isLogin = props.isLogin;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  return (
    <>
      {isLogin ? (
        <div
          className="board-preview-list awbcss"
          onClick={() => {
            axios
              .patch(`${backServer}/board/updateReadCount/${board.boardNo}`)
              .then((res) => {
                console.log(res.data);
              })
              .catch((err) => {
                console.log("조회수 증가 실패", err);
              });

            navigate(
              `/board/AccompanyView/${board.boardNo}
              )}`
            );
          }}
        >
          <div className="board-preview-thumb">
            <img
              style={{ width: "100%", objectFit: "cover" }}
              src={
                board.boardThumb
                  ? `${backServer}/board/thumb/${board.boardThumb}`
                  : "/image/lodgment_default_img.png"
              }
            />
          </div>
          <div className="board-preview-content">
            <div className="board-preview-title">{board.boardTitle}</div>
            <div className="member flex-spbetw ">
              <div className="memberId-age-gender text-min">
                <span>{board.memberNickname}</span>
              </div>
              <div className="area text-min">{board.boardArea}</div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="board-preview-list awbcss"
          onClick={() => {
            Swal.fire({
              title: "로그인 후 이용 가능합니다",
              text: "로그인하세요",
              icon: "info",
            });
            navigate("/login");
          }}
        >
          <div className="board-preview-thumb">
            <img
              style={{ height: "100%" }}
              src={
                board.boardThumb
                  ? `${backServer}/board/thumb/${board.boardThumb}`
                  : "/image/lodgment_default_img.png"
              }
            />
          </div>
          <div className="board-preview-content">
            <div className="board-preview-title">{board.boardTitle}</div>
            <div className="member flex-spbetw ">
              <div className="memberId-age-gender text-min">
                <span>{board.memberNickname}</span>
              </div>
              <div className="area text-min">{board.boardArea}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Main;
