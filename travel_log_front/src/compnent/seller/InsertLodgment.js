import { useEffect, useRef, useState } from "react";
import "./css/insert_lodgment.css";
import DaumPostcode from "react-daum-postcode";

const InsertLodgment = () => {
  // YES 나 NO를 누르면 search-hotel이 보이거나 안보이게 하기
  const [isVisible, setIsVisible] = useState(false);
  const yesHotel = () => {
    setIsVisible(true);
  };
  const noHotel = () => {
    setIsVisible(false);
  };
  const addrApi = () => {
    // setIsPostcodeVisible(true);
  };
  const addrComplete = (data) => {
    console.log(data); // 선택한 주소 데이터를 처리
    // setIsPostcodeVisible(false); // 주소 선택 후 컴포넌트를 숨기려면 사용
  };
  const search = () => {};
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
                <input type="text" />
                <button onClick={search}>
                  <div className="material-icons">search</div>
                </button>
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
            <div className="input-wrap">
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
                  <DaumPostcode />
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
