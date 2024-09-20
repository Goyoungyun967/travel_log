import { useEffect, useRef, useState } from "react";
import "./css/insert_lodgment.css";
import axios from "axios";
import DaumPostcode from "react-daum-postcode";

const InsertLodgment = () => {
  // back으로 보내는 이미지
  const [lodgmentImg, setLodgmentImg] = useState(null);
  // 미리보기용 이미지
  const [viewImg, setViewImg] = useState(null);
  const lodgmentImgRef = useRef(null);
  const changeLodgmentImg = (e) => {
    //요소들이 겹쳐있는 상태에서 해당 요소를 선택할 때는 currentTarget(target을사용하면 여러요소가 한번에 선택)
    const files = e.currentTarget.files; // ※배열 처럼 보이지만 배열 아님※
    if (files.length !== 0 && files[0] !== 0) {
      //썸네일 파일 객체를 글작성 시 전송하기위한 값 저장
      setLodgmentImg(files[0]);
      //화면에 썸네일 미리보기
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setViewImg(reader.result);
      };
    } else {
      // 썸네일 있던걸 없애면 null로 처리 ()
      setLodgmentImg(null);
      setViewImg(null);
    }
  };

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

  // 주소
  const [addrBool, setAddrBool] = useState(false);
  const addrOk = () => {
    setAddrBool((prev) => !prev);
  };
  const [zoneCode, setZoneCode] = useState(""); // 우편번호
  const [address, setAddress] = useState(""); // 주소
  const [deAddress, setDeAddress] = useState(""); // 상세주소
  // 우편번호랑 주소 input에 넣기
  const completeHandler = (data) => {
    const { address, zonecode } = data;
    setZoneCode(zonecode);
    setAddress(address);
  };
  const changeDeAddress = (e) => {
    setDeAddress(e.target.value);
  };
  return (
    <div className="contanier insert-lodgment">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="box-wrap box-radius">
          <div className="box">
            <div className="box-img">
              {viewImg ? (
                <img
                  src={viewImg}
                  onClick={() => {
                    lodgmentImgRef.current.click();
                  }}
                />
              ) : viewImg ? (
                // 이미지를 띄울 때 서버주소/경로/
                <img
                  src={`${backServer}/seller/lodgment/${viewImg}`}
                  onClick={() => {
                    lodgmentImgRef.current.click();
                  }}
                />
              ) : (
                <img
                  src="/image/lodgment_default_img.png"
                  onClick={() => {
                    lodgmentImgRef.current.click();
                  }}
                ></img>
              )}
            </div>
            <input
              ref={lodgmentImgRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={changeLodgmentImg}
            ></input>
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
                  <button
                    type="button"
                    className=" btn primary"
                    onClick={addrOk}
                  >
                    주소찾기
                  </button>
                  <div className="addr-block">
                    <div className="addr-search-api">
                      {addrBool ? (
                        <DaumPostcode onComplete={completeHandler} />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="addr-api-input">
                      <label htmlFor="addrCode">우편번호</label>
                      <input type="text" id="addrText" value={zoneCode} />
                      <label htmlFor="addrText">주소</label>
                      <input type="text" id="addrText" value={address} />
                      <label htmlFor="addrDeText">상세 주소</label>
                      <input
                        type="text"
                        id="addrDeText"
                        value={deAddress}
                        onChange={changeDeAddress}
                      />
                    </div>
                  </div>
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
            <div className="editor">에디터 들어갈 자리</div>
          </div>
          <button className="btn primary">등록하기</button>
        </div>
      </form>
    </div>
  );
};

export default InsertLodgment;
