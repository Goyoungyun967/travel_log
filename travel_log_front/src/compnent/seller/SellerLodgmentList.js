import { useEffect, useState } from "react";
import "./css/lodgment_list.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { isSellerLoginState, sellerLoginNoState } from "../utils/RecoilData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const SellerLodgmentList = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const lodgmentNo = params.lodgmentNo;
  const [lodgmentList, setLodgmentList] = useState([]);
  console.log("rrrrrr", lodgmentList.length);
  const isLogin = useRecoilValue(isSellerLoginState);
  const [loginNo, setLoginNo] = useRecoilState(sellerLoginNoState);
  console.log("loginNo-", loginNo);
  useEffect(() => {
    axios
      .post(`${backServer}/seller/lodgmentList`, null, {
        params: { loginNo: loginNo },
      })
      .then((res) => {
        console.log("r:", res);
        setLodgmentList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loginNo]);

  // 판매자 메인
  return (
    <div className="contanier seller-lodgment-list">
      {/* {isLogin? 현재 로그인이 되어있으면 으로 처리해야함 - 일단 임시로 1로 처리*/}

      {lodgmentList.length !== 0 ? (
        <>
          {isLogin ? (
            <Link to={`/seller/insertLodgment`} className="sellerListLgBtn">
              숙소 등록하기
            </Link>
          ) : (
            ""
          )}
          <Swiper
            spaceBetween={25}
            slidesPerView={3}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            loop={true}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper seller-swiper"
          >
            <div className="item-wrap">
              {lodgmentList.map((list, index) => {
                return (
                  <SwiperSlide key={"slide-" + index}>
                    <ListItem key={"list-" + index} list={list} index={index} />
                  </SwiperSlide>
                );
              })}
            </div>
          </Swiper>
        </>
      ) : (
        <div className="seller-lodgment-no">
          <p>등록된 숙소가 없습니다 등록하시겠습니까?</p>
          <Link to={`/seller/insertLodgment`} className="sellerQusBtn">
            등록하기
          </Link>
        </div>
      )}
    </div>
  );
};

// 숙소 정보 뽑아오는 곳
const ListItem = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const list = props.list;
  console.log(list);
  return (
    <>
      {list.lodgmentDelete === 0 ? (
        <div className="seller-lg-list-item seller-admin-check">
          <p className="seller-check-p">등록 대기 중</p>
          <div className="seller-item-img">
            <img
              src={
                list.lodgmentImgPath
                  ? `${backServer}/seller/lodgment/${list.lodgmentImgPath}`
                  : "/image/lodgment_default_img.png"
              }
              style={{ width: "230px" }}
            />
          </div>
          <div className="item-tx">
            <p className="lodgment-addr">{list.lodgmentAddr}</p>
            <div className="lodgment-star">
              {list.lodgmentStarGrade === 0 ? (
                "등급 미정 숙소"
              ) : (
                <>
                  <span>{list.lodgmentStarGrade}</span>
                  <span>성급</span>
                </>
              )}
            </div>
            <h3 className="lodgment-title">{list.lodgmentName}</h3>
          </div>
        </div>
      ) : (
        <div
          className="seller-lg-list-item"
          onClick={() => {
            navigate(`/seller/lodgmentView/${list.lodgmentNo}`);
          }}
        >
          <div className="seller-item-img">
            <img
              src={
                list.lodgmentImgPath
                  ? `${backServer}/seller/lodgment/${list.lodgmentImgPath}`
                  : "/image/lodgment_default_img.png"
              }
              style={{ width: "230px" }}
            />
          </div>
          <div className="item-tx">
            <p className="lodgment-addr">{list.lodgmentAddr}</p>
            <div className="lodgment-star">
              {list.lodgmentStarGrade === 0 ? (
                "등급 미정 숙소"
              ) : (
                <>
                  <span>{list.lodgmentStarGrade}</span>
                  <span>성급</span>
                </>
              )}
            </div>
            <h3 className="lodgment-title">{list.lodgmentName}</h3>
          </div>
        </div>
      )}
    </>
  );
};

export default SellerLodgmentList;
