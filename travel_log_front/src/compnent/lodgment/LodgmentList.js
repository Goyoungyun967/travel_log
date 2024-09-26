import "./css/lodgmentList.css";
import SearchBar from "./SearchBar";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useEffect, useRef, useState } from "react";
import Rating from "@mui/material/Rating";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";
import Swal from "sweetalert2";

const LodgmentList = () => {
  const navigate = useNavigate();
  //main=>LodgmentList 에서 가져온 검색정보
  const { state } = useLocation();
  //console.log(state);
  const BackServer = process.env.REACT_APP_BACK_SERVER;
  //하단으로 가면 자동으로 페이지 10개씩 가져오게하는 넘버링
  const [reqPage, setReqPage] = useState(1);

  //일정 기본값 설정
  const startDay = dayjs().add(1, "day").toDate();
  const endDay = dayjs().add(2, "day").toDate();

  //state 에 정보가 있을경우 정보 기입 / 없으면 기본값 설정
  const [lodgment, setLodgment] = useState(state?.lodgment || "");
  const [guest, setGuest] = useState(state?.guest || 2);
  const [startDate, setStartDate] = useState(state?.startDate || startDay);
  const [endDate, setEndDate] = useState(state?.endDate || endDay);

  //숙박 종류 검색
  //0:  전체 검색, 1: 호텔,  2: 모텔, 3: 펜션풀빌라, 4:게스트하우스, 5:캠핑
  const [lodgmentType, setLodgmentType] = useState(0);

  //가격 조정
  const [value, setValue] = useState([0, 500000]);

  //호텔 성급
  const [starValue, setStarValue] = useState(0);

  //정렬 기준
  // 0: 전체 검색, 1 : 낮은가격순, 2: 높은 가격순, 3: 인기순
  const [radioBtn, setRadioBtn] = useState(0);

  //서비스 태그 검색해서 저장할 객체
  const [serviceTag, setServiceTag] = useState([
    { serviceTagNo: "" },
    { serviceTagType: "" },
  ]);
  useEffect(() => {
    axios
      .get(`${BackServer}/lodgment/service`)
      .then((res) => {
        setServiceTag(res.data);
        //console.log(res);
      })
      .catch((err) => {
        //console.log(err);
      });
  }, []);

  //선택된 태그 저장
  const [selectedServiceTags, setSelectedServiceTags] = useState([]);

  //
  const searchRef = useRef(null);

  const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);
  //서비스 태그 선택되면 값 저장
  const handleServiceTagClick = (service) => {
    setSelectedServiceTags((prev) => {
      if (prev.includes(service.serviceTagNo)) {
        return prev.filter((tag) => tag !== service.serviceTagNo);
      } else {
        return [...prev, service.serviceTagNo];
      }
    });
  };

  //검색한 호텔 정보 저장한 state
  const [lodgmentDetailInfo, setLodgmentDetailInfo] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // 1,000단위 포맷
  const numberFormat = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  //값이 변하면 lodgment 검색
  useEffect(() => {
    //메인에서 들어오지 않을 경우
    if (state !== null) {
      lodgmentSearchBtn();
    } else {
      return;
    }
    lodgmentSearchBtn();
  }, [value, starValue, radioBtn, lodgmentType, selectedServiceTags, reqPage]);

  //숙소 검색 누르면 작동
  const lodgmentSearchBtn = () => {
    setReqPage(1);
    if (lodgment === "") {
      Swal.fire({
        icon: "error",
        title: "여행지, 숙소를 입력해주세요.",
        confirmButtonText: "확인",
      });
      return;
    }
    axios
      .get(`${BackServer}/lodgment/searchLodgment`, {
        params: {
          reqPage,
          lodgment,
          startDate,
          endDate,
          guest,
          minPrice: value[0],
          maxPrice: value[1],
          selectedServiceTags: selectedServiceTags.join(","),
          starValue,
          order: radioBtn,
          lodgmentType,
        },
      })
      .then((res) => {
        //console.log(res);
        if (reqPage === 1) {
          setLodgmentDetailInfo(res.data);
        } else {
          setLodgmentDetailInfo((prev) => [...prev, ...res.data]);
        }

        if (res.data.length < 10) {
          setShowScrollToTopButton(true);
        } else {
          setShowScrollToTopButton(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //console.log(lodgmentDetailInfo); axios 안에서는 랜더링이 돌고 값이 들어가기 때문에 확인하려면 밖에서

  useEffect(() => {
    const handleScroll = () => {
      //현재브라우저창의 높이   현재 스크롤 위치   페이지 전체 높이
      //페이지의 하단에 도달했는지 조건문
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        //reqPage 상태 변수 증가
        setReqPage((prevPage) => prevPage + 1);
      } else if (lodgmentDetailInfo.length < reqPage * 10) {
        return;
      }
    };
    //스크롤 이벤트가 발생할때마다 hendleScroll 함수 호출
    window.addEventListener("scroll", handleScroll);
    //이전에 등록한 이벤트 리스너 제거, 메모리 누수 방지
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="section">
      <div className="lodgment-wrap-input">
        <SearchBar
          lodgment={lodgment}
          setLodgment={setLodgment}
          guest={guest}
          setGuest={setGuest}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          onClick={lodgmentSearchBtn}
          searchRef={searchRef}
        />
      </div>
      <div className="lodgment-search-wrap">
        <div className="etc-search-wrap">
          <div className="choose-price-wrap">
            <div className="price-text-wrap">
              <div className="lodgment-info-text">가격</div>
              <div className="lodgment-sellprice-info">1박 기준</div>
            </div>
            <Box sx={{ width: "100%" }}>
              <Slider
                value={value}
                onChange={handleChange}
                aria-labelledby="range-slider"
                max={500000}
                min={0}
                step={1000}
              />
            </Box>
            <div className="lodgment-price-range">
              <div>{numberFormat(value[0])}원 </div>
              <div className="lodgment-price-max">
                {value[1] === 500000
                  ? numberFormat(value[1]) + "원~"
                  : numberFormat(value[1]) + "원"}
              </div>
            </div>
          </div>

          <div className="lodgment-star-range">
            <div className="star-text">
              <span className="lodgment-info-text">호텔 성급</span>
            </div>
            <div className="start-range-wrap">
              <Box sx={{ "& > legend": { mt: 5 } }}>
                <Rating
                  name="simple-controlled"
                  value={starValue}
                  onChange={(event, newValue) => {
                    setStarValue(newValue);
                  }}
                />
              </Box>
            </div>
          </div>
          <div className="lodgment-service-wrap">
            <div className="lodgment-info-text">서비스</div>
            <div className="lodgment-service-box">
              {serviceTag.map((service, i) => (
                <button
                  key={"service=" + i}
                  className={`lodgment-service ${
                    selectedServiceTags.includes(service.serviceTagNo)
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleServiceTagClick(service)}
                >
                  {service.serviceTagType}
                </button>
              ))}
            </div>
          </div>
          <div className="selet-lodgmentType-wrap">
            <div className="lodgment-info-text">숙박 종류</div>
            <div className="lodgment-type-radio">
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={lodgmentType}
                onChange={(e) => setLodgmentType(e.target.value)}
              >
                <FormControlLabel value="1" control={<Radio />} label="호텔" />
                <FormControlLabel value="2" control={<Radio />} label="모텔" />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="펜션/풀빌라"
                />
                <FormControlLabel
                  value="4"
                  control={<Radio />}
                  label="게스트하우스"
                />
                <FormControlLabel value="5" control={<Radio />} label="캠핑" />
              </RadioGroup>
            </div>
            <div className="radio-lodgment-wrap">
              <div className="lodgment-info-text">정렬기준</div>
              <div className="lodgment-radio">
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={radioBtn}
                  onChange={(e) => setRadioBtn(e.target.value)}
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="낮은가격순"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="높은 가격순"
                  />
                  <FormControlLabel
                    value="3"
                    control={<Radio />}
                    label="인기순"
                  />
                </RadioGroup>
              </div>
            </div>
          </div>
        </div>
        <div className="lodgment-info-wrap">
          <LegdmentInfo
            lodgment={lodgment}
            lodgmentDetailInfo={lodgmentDetailInfo}
            navigate={navigate}
            BackServer={BackServer}
            showScrollToTopButton={showScrollToTopButton}
            startDate={startDate}
            endDate={endDate}
            guest={guest}
          />
        </div>
      </div>
    </section>
  );
};

const LegdmentInfo = (props) => {
  const {
    lodgment,
    lodgmentDetailInfo,
    navigate,
    BackServer,
    showScrollToTopButton,
    startDate,
    endDate,
    guest,
  } = props;

  return (
    <div className="lodgment-info-container">
      {lodgment === "" ? (
        <p>여행지를 입력해주세요.</p>
      ) : (
        <div className="lodgment-card-container">
          {lodgmentDetailInfo.length > 0 ? (
            lodgmentDetailInfo.map((info) => (
              <div
                key={info.lodgmentNo}
                className="lodgment-card"
                onClick={() =>
                  navigate(
                    `/lodgment/lodgmentDetail/${info.lodgmentNo}/${startDate}/${endDate}/${guest}`
                  )
                }
              >
                <img
                  src={
                    info.lodgmentImgPath
                      ? `${BackServer}/seller/lodgment/${info.lodgmentImgPath}`
                      : "/image/default_img.png"
                  }
                  // 기본 이미지 경로
                  alt={info.lodgmentName}
                  className="lodgment-image"
                />
                <div className="lodgment-details">
                  {info.lodgmentTypeNo === 1 ? (
                    <h4 className="lodgment-address">호텔</h4>
                  ) : info.lodgmentTypeNo === 2 ? (
                    <h4 className="lodgment-address">모텔</h4>
                  ) : info.lodgmentTypeNo === 3 ? (
                    <h4 className="lodgment-address">펜션/풀빌라</h4>
                  ) : info.lodgmentTypeNo === 4 ? (
                    <h4 className="lodgment-address">게스트하우스</h4>
                  ) : info.lodgmentTypeNo === 5 ? (
                    <h4 className="lodgment-address">캠핑</h4>
                  ) : (
                    ""
                  )}
                  <h2 className="lodgment-name">{info.lodgmentName}</h2>

                  <p className="lodgment-address">{info.lodgmentAddr}</p>
                  {info.lodgmentStarGrade !== 0 ? (
                    <Rating
                      name="read-only"
                      value={info.lodgmentStarGrade}
                      readOnly
                    />
                  ) : (
                    ""
                  )}

                  <p className="lodgment-checkin">
                    체크인: {info.lodgmentCheckIn}
                  </p>
                  <p className="lodgment-checkin">
                    체크아웃: {info.lodgmentCheckOut}
                  </p>
                  {info.lodgmentNotice && (
                    <p className="lodgment-notice">{info.lodgmentNotice}</p>
                  )}
                  <p className="lodgment-price-day">1박당/</p>
                  <p className="lodgment-price">{info.roomPrice}원~</p>
                </div>
              </div>
            ))
          ) : (
            <p>검색 결과가 없습니다.</p>
          )}
        </div>
      )}
      {showScrollToTopButton && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          위로가기
        </button>
      )}
    </div>
  );
};

export default LodgmentList;
