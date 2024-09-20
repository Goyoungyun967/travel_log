import { useEffect, useRef, useState } from "react";
import "./css/insert_lodgment.css";
import axios from "axios";
import DaumPostcode from "react-daum-postcode";

const InsertLodgment = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  // YES 나 NO를 누르면 search-hotel이 보이거나 안보이게 하기
  const [isVisible, setIsVisible] = useState(false);
  // yes 누르면 호텔 검색창 보이게
  const yesHotel = () => {
    setIsVisible(true);
  };
  // no 누르면 호텔 검색창 안보이게
  const noHotel = () => {
    setIsVisible(false);
  };

  // 호텔 타입 저장
  const [lodgmentType, setLodgmentType] = useState(1);

  // 선택된 호텔 타입의 value 값을 저장
  const lodgmentTypeChange = (e) => {
    setLodgmentType(Number(e.target.value));
  };

  // 기존 호텔 검색
  const [searchInput, setSearchInput] = useState("");
  const searchInputChange = (e) => {
    setSearchInput(e.target.value);
    axios
      .get(`${backServer}/seller/xlsxLodgment/${searchInput}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(lodgmentType);
  const addrApi = () => {
    // setIsPostcodeVisible(true);
  };
  const addrComplete = (data) => {
    console.log(data); // 선택한 주소 데이터를 처리
    // setIsPostcodeVisible(false); // 주소 선택 후 컴포넌트를 숨기려면 사용
  };

  return (
    <div className="contanier insert-lodgment">
      <form>
        <div className="box-wrap box-radius">
          <div className="box">
            <div className="box-img">
              <img src="/img/default_img.png" alt="사진 추가" />
            </div>
          </div>
          <div className="Q">
            <h3>찾으시는 호텔이 있으신가요?</h3>
            <p>기존에 있는 호텔로 등록하지 않으면 성급은 0으로 작성됩니다.</p>
            <button type="button" className="btn primary" onClick={yesHotel}>
              YES
            </button>
            <button className="btn primary" onClick={noHotel}>
              No
            </button>
            <div
              className="search-hotel"
              style={{ display: isVisible ? "block" : "none" }}
            >
              <div className="input">
                <input
                  type="text"
                  value={searchInput}
                  onChange={searchInputChange}
                />
                <p className="msg">최소 두글자 이상..</p>
              </div>
              <div className="search-item-wrap">
                <div className="search-item">
                  <div className="item-title">000호텔</div>
                  <div className="item-addr">
                    주소주소주소주소주소주소주소주소주소주소
                  </div>
                </div>
                <div className="search-item">
                  <div className="item-title">000호텔</div>
                  <div className="item-addr">
                    주소주소주소주소주소주소주소주소주소주소
                  </div>
                </div>
                <div className="search-item">
                  <div className="item-title">000호텔</div>
                  <div className="item-addr">
                    주소주소주소주소주소주소주소주소주소주소
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="box">
            <div className="input-wrap insert-lodgment-item">
              <div className="input-item">
                <div className="input-title">
                  <label htmlFor="lodgmentName">숙소명</label>
                </div>
                <div className="input">
                  <input type="text" id="lodgmentName" />
                </div>
              </div>
              <div className="input-item">
                <div className="addr-api">
                  <button type="button" className=" btn primary">
                    주소찾기
                  </button>
                </div>
              </div>
              <div className="input-item">
                <div className="input-title">
                  <label htmlFor="checkIn">체크인</label>
                </div>
                <div className="input">
                  <input type="time" />
                </div>
              </div>
              <div className="input-item">
                <div className="input-title">
                  <label htmlFor="checkOut">체크아웃</label>
                </div>
                <div className="input">
                  <input type="time" />
                </div>
              </div>
              <div className="lodgment-type">
                <div className="input-title">
                  <label htmlFor="lodgmentType">숙소 타입</label>
                </div>
                <div className="input">
                  <label>
                    <input
                      type="radio"
                      name="lodgmentType"
                      value={1}
                      checked={lodgmentType === 1}
                      onChange={lodgmentTypeChange}
                    />
                    호텔
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="lodgmentType"
                      value={2}
                      checked={lodgmentType === 2}
                      onChange={lodgmentTypeChange}
                    />
                    모텔
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="lodgmentType"
                      value={3}
                      checked={lodgmentType === 3}
                      onChange={lodgmentTypeChange}
                    />
                    펜션/풀빌라
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="lodgmentType"
                      value={4}
                      checked={lodgmentType === 4}
                      onChange={lodgmentTypeChange}
                    />
                    게스트하우스
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="lodgmentType"
                      value={5}
                      checked={lodgmentType === 5}
                      onChange={lodgmentTypeChange}
                    />
                    캠핑
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="box box-notice">
            <h5>공지사항</h5>
            <div className="toast">에디터 들어갈 자리</div>
          </div>
          <button className="btn primary">등록하기</button>
        </div>
      </form>
    </div>
  );
};

export default InsertLodgment;
