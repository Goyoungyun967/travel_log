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

  //서브 부가 검색
  //1 : 호텔  2: 리조트, 3: 펜션
  const [lodgementType, setLodgmentType] = useState("");

  //가격 조정
  const [value, setValue] = useState([0, 500000]);

  //호텔 성급
  const [starValue, setStarValue] = useState(5);
  const [radioBtn, setRadioBtn] = useState("null");

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
        // console.log(res);
      })
      .catch((err) => {
        //console.log(err);
      });
  }, []);

  //선택된 태그 저장
  const [selectedServiceTags, setSelectedServiceTags] = useState([]);

  //
  const searchRef = useRef(null);

  //서비스 태그 선택되면 값 저장
  const handleServiceTagClick = (service) => {
    setSelectedServiceTags((prev) => {
      if (prev.includes(service)) {
        return prev.filter((tag) => tag !== service);
      } else {
        return [...prev, service];
      }
    });
  };

  //값이 변하면 lodgment 검색
  useEffect(() => {
    lodgmentSearchBtn();
  }, [
    selectedServiceTags,
    lodgment,
    value,
    starValue,
    radioBtn,
    lodgementType,
  ]);

  //숙소 검색 누르면 작동
  const lodgmentSearchBtn = () => {
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
          selectedServiceTags,
          starValue,
          order: radioBtn,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // 1,000단위 포맷
  const numberFormat = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

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
                    selectedServiceTags.includes(service) ? "selected" : ""
                  }`}
                  onClick={() => handleServiceTagClick(service)}
                >
                  {service.serviceTagType}
                </button>
              ))}
            </div>
          </div>
          <div className="radio-lodgment-wrap">
            <div className="lodgment-info-text"></div>
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
        <div className="lodgment-info-wrap">
          <div className="lodgment-type-select">
            <button
              onClick={() => setLodgmentType("1")}
              type="button"
              className={
                lodgementType === "1"
                  ? "selectedLodgmentType"
                  : "lodgment-type-select-btn"
              }
            >
              호텔
            </button>
            <button
              onClick={() => setLodgmentType("2")}
              type="button"
              className={
                lodgementType === "2"
                  ? "selectedLodgmentType"
                  : "lodgment-type-select-btn"
              }
            >
              리조트
            </button>
            <button
              onClick={() => setLodgmentType("3")}
              type="button"
              className={
                lodgementType === "3"
                  ? "selectedLodgmentType"
                  : "lodgment-type-select-btn"
              }
            >
              펜션
            </button>
          </div>
          <div className="lodgment-info-wrap">
            <LegdmentInfo lodgment={lodgment} />
          </div>
        </div>
      </div>
    </section>
  );
};

const LegdmentInfo = (props) => {
  const lodgment = props.lodgment;
  return (
    <>
      <div>{lodgment === "" ? "여행지를 입력해주세요." : ""}</div>
    </>
  );
};

export default LodgmentList;
