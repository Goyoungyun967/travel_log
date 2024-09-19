import "./css/lodgmentList.css";
import SearchBar from "./SearchBar";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";
import { Backspace } from "@mui/icons-material";

const LodgmentList = () => {
  const BackServer = process.env.REACT_APP_BACK_SERVER;
  console.log(BackServer);
  //메인에서 검색해서 들어올 경우, 검색 정보 저장
  const { state } = useLocation();
  const startDay = dayjs().add(1, "day").toDate();
  const endDay = dayjs().add(2, "day").toDate();

  //state 에서 넘어온 정보가 있을 경우 , 없을 경우들어갈 기본 정보
  const [lodgment, setLodgment] = useState(
    state && state.lodgment ? state.lodgment : ""
  );
  const [guest, setGuest] = useState(state && state.guest ? state.guest : 2);
  const [startDate, setStartDate] = useState(
    state && state.startDate ? state.startDate : startDay
  );
  const [endDate, setEndDate] = useState(
    state && state.endDate ? state.endDate : endDay
  );
  //가격 슬라이더의 초기값
  const [value, setValue] = useState([0, 500000]);

  //가격 슬라이더의 값 업데이트
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //1000단위로 설정
  const numberFormat = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 천 단위 포맷
  };

  //별점초기화 값
  const [starValue, setStarValue] = useState(5);

  //정렬 버튼
  const [radioBtn, setRadioBtn] = useState("null");
  const radioChange = (e) => {
    setRadioBtn(e.target.value);
  };
  //서비스태그
  //select *from service_tag ;
  const [serviceTag, setServiceTag] = useState([]);
  useEffect(() => {
    axios
      .get(`${BackServer}/lodgment/service`)
      .then((res) => {
        //console.log(res);
        setServiceTag(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //console.log(serviceTag);
  //console.log("value[0] :" + value[0]);
  //console.log("value[1] :" + value[1]);

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
        />
      </div>
      <div className="lodgment-search-wrap">
        <div className="etc-search-wrap">
          <div className="choose-price-wrap">
            <div className="price-text-wrap">
              <div className="lodgment-info-text">가격</div>
              <div className="lodgment-sellprice-info">1박 기준</div>
            </div>
            <Box sx={{ width: 280 }}>
              <Slider
                value={value} // 슬라이더의 현재 값
                onChange={handleChange} // 슬라이더 값 변화 시 호출
                aria-labelledby="range-slider" // 슬라이더 설명
                max={500000} // 최대값
                min={0} // 최소값
                step={10000} // 이동 단위
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
            <div>서비스요소들~~~~</div>
          </div>
          <div className="radio-lodgment-wrap">
            <div className="lodgment-info-text">정렬</div>
            <div className="lodgment-radio">
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={radioBtn}
                onChange={radioChange}
              >
                <FormControlLabel
                  value="lowPrice"
                  control={<Radio />}
                  label="낮은가격순"
                />
                <FormControlLabel
                  value="highPrice"
                  control={<Radio />}
                  label="높은 가격순"
                />
                <FormControlLabel
                  value="Popularity"
                  control={<Radio />}
                  label="인기순"
                />
              </RadioGroup>
            </div>
          </div>
        </div>
        <div className="lodgment-info-wrap">
          <div className="lodgment-type-select">
            <button type="button">호텔</button>
            <button type="button">리조트</button>
            <button type="button"> 펜션</button>
          </div>
          <div className="lodgment-info-wrap">
            <LegdmentInfo />
          </div>
        </div>
      </div>
    </section>
  );
};
const LegdmentInfo = () => {
  return <div>정보 정보</div>;
};

export default LodgmentList;
