import { useEffect, useRef, useState } from "react";
import "./css/insert_lodgment.css";
import axios from "axios";
import DaumPostcode from "react-daum-postcode";
import UqillEditor from "../utils/UqillEditor";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { useRecoilState } from "recoil";
import { sellerLoginNoState } from "../utils/RecoilData";

const InsertLodgment = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();

  // 기존 호텔에서 검색하면 사용자가 다른 건 건들지 못하게 readOnly로 바꾸어야함
  const [isReadOnly, setIsReadOnly] = useState(false); // 추가된 상태

  const [hotelInof, sethotelInfo] = useState({});
  console.log(hotelInof);
  const [boardContent, setBoardContent] = useState(
    "<h5><strong>숙소 정보</strong></h5><p><br></p><p><br></p><p><br></p><p><br></p><h5><strong>주차장 정보</strong></h5>"
  );
  //호텔 명
  const [hotelName, setHotelName] = useState("");
  // 호텔 타입 저장
  const [lodgmentType, setLodgmentType] = useState(1); //---------
  // 호텔 번호 저장
  const [lodgmentNo, setLodgmentNo] = useState(0); //---------
  // 호텔 주소
  const [address, setAddress] = useState(""); // 보내는 주소
  const [inputAddr, setInputAddr] = useState(""); // input에 들어갈 주소 (보내지는 않음)
  // 호텔 성급 저장
  const [lodgmentStar, setLodgmentStar] = useState(0); //---------
  // back으로 보내는 이미지
  const [lodgmentImg, setLodgmentImg] = useState(null);
  // 호텔 check-in / check-out
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

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

  // 선택된 호텔 타입의 value 값을 저장
  const lodgmentTypeChange = (e) => {
    setLodgmentType(Number(e.target.value));
  };

  // 기존 호텔 검색
  const [hotelList, setHotelList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const searchInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  const search = () => {
    axios
      .get(`${backServer}/seller/xlsxLodgment/${searchInput}`)
      .then((res) => {
        setHotelList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 주소
  // const [addrBool, setAddrBool] = useState(false);
  // const addrOk = () => {
  //   setAddrBool((prev) => !prev);
  // };

  // 우편번호랑 주소 input에 넣기

  // 리코일 사용해서 줍줍
  const [loginNo, setLoginNo] = useRecoilState(sellerLoginNoState);
  // 보내줄 data
  const hotelData = {
    hotelName,
    lodgmentType,
    lodgmentNo,
    lodgmentStar,
    lodgmentImg,
    checkIn,
    checkOut,
    boardContent,
  };
  console.log("보내는 주소", address);
  console.log("보여지는 주소", inputAddr);

  return (
    <div className="contanier insert-lodgment">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const nameRegex = /^.{1,30}$/; // 호텔 이름 1글자 이상 30자까지만
          const contentRegex = /^.{1,1000}$/; // 공지사항 1글자 이상 1000글자까지만

          // 각각의 조건을 개별적으로 확인
          if (!nameRegex.test(hotelName)) {
            Swal.fire({
              title: "숙소 이름을 다시 적어주세요",
              text: "1글자 이상 30글자 이하",
              icon: "error",
            });
          } else if (checkIn === null) {
            Swal.fire({
              title: "체크인 날짜를 선택해주세요.",
              icon: "error",
            });
          } else if (checkOut === null) {
            Swal.fire({
              title: "체크아웃 날짜를 선택해주세요.",
              icon: "error",
            });
          } else if (address === "") {
            Swal.fire({
              title: "주소를 다시 입력해주세요",
              icon: "error",
            });
          } else if (!contentRegex.test(boardContent)) {
            Swal.fire({
              title: "공지사항을 다시 입력해주세요",
              text: "1글자 이상 1000글자 이하",
              icon: "error",
            });
          } else {
            // 모든 조건을 만족하면 폼 제출 처리
            const form = new FormData();
            form.append("lodgmentName", hotelName);
            form.append("lodgmentAddr", address);
            form.append("lodgmentTypeNo", lodgmentType);
            form.append("lodgmentNo", lodgmentNo);
            form.append("lodgmentStarGrade", lodgmentStar);
            form.append("lodgmentCheckIn", checkIn);
            form.append("lodgmentCheckOut", checkOut);
            form.append("lodgmentNotice", boardContent);
            form.append("sellerNo", loginNo);

            if (lodgmentImg !== null) {
              form.append("lodgmentImg", lodgmentImg); // 첨부된 경우에만 추가
            }

            axios
              .post(`${backServer}/seller`, form, {
                headers: {
                  contentType: "multipart/form-data",
                  processData: false,
                },
              })
              .then((res) => {
                console.log(res);
                if (res.data) {
                  Swal.fire({
                    title: "등록 완료",
                    text: "1~10일 정도 소요됩니다.",
                    icon: "success",
                  });
                  navigate(`/seller/list`);
                  console.log(form);
                } else {
                  Swal.fire({
                    title: "문제가 발생했습니다.",
                    text: "다시 시도해주십시오",
                    icon: "error",
                  });
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
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
                  src="/image/add_image.png"
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
                <button type="button" onClick={search}>
                  <div className="material-icons">search</div>
                </button>
              </div>
              <div className="search-item-wrap">
                {hotelList.map((hotel, i) => {
                  return (
                    <SearchHotelList
                      key={"hotel-" + i}
                      setHotelName={setHotelName} // 전달
                      setAddress={setAddress}
                      setLodgmentType={setLodgmentType}
                      sethotelInfo={sethotelInfo}
                      setLodgmentNo={setLodgmentNo}
                      setLodgmentStar={setLodgmentStar}
                      setIsReadOnly={setIsReadOnly}
                      hotel={hotel}
                    />
                  );
                })}
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
                  <input
                    type="text"
                    id="lodgmentName"
                    value={hotelName}
                    onChange={(e) => setHotelName(e.target.value)}
                    disabled={isReadOnly}
                  />
                </div>
              </div>
              <div className="input-item">
                <div className="addr-api">
                  <div className="addr-block">
                    <div className="addr-api-input">
                      <div className="addr-flex-wrap">
                        <label htmlFor="addrText">주소</label>
                        <div className="addr-search-api">
                          {!isReadOnly ? (
                            <ModalAddr
                              setAddress={setAddress}
                              setInputAddr={setInputAddr}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <input
                        type="text"
                        id="addrText"
                        value={inputAddr}
                        readOnly
                        onChange={(e) => {
                          setInputAddr(e.target.value);
                        }}
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
                  <input
                    type="time"
                    id="checkIn"
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>
              </div>
              <div className="input-item">
                <div className="input-title">
                  <label htmlFor="checkOut">체크아웃</label>
                </div>
                <div className="input">
                  <input
                    type="time"
                    id="checkOut"
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
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
                      disabled={isReadOnly}
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
                      disabled={isReadOnly}
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
                      disabled={isReadOnly}
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
                      disabled={isReadOnly}
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
                      disabled={isReadOnly}
                    />
                    캠핑
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="box box-notice">
            <h3>공지사항</h3>
            <div className="editor">
              <UqillEditor
                boardContent={boardContent}
                setBoardContent={setBoardContent}
              />
            </div>
          </div>
          <button type="submit" className="insertLodgmentBtn btn primary">
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
};

// 기존 호텔
const SearchHotelList = (props) => {
  const hotel = props.hotel;
  const sethotelInof = props.sethotelInfo;
  const setHotelName = props.setHotelName;
  const setLodgmentStar = props.setLodgmentStar;
  const setLodgmentType = props.setLodgmentType;
  const setLodgmentNo = props.setLodgmentNo;
  const setAddress = props.setAddress;
  const setIsReadOnly = props.setIsReadOnly;
  const inputHotelInfo = () => {
    sethotelInof(hotel);
    setAddress(hotel.xlodgmentAddr);
    setHotelName(hotel.xlodgmentName);
    setLodgmentNo(hotel.xlodgmentNo);
    setLodgmentStar(hotel.xlodgmentStarGrade);
    setLodgmentType(1);
    setIsReadOnly(true); // 기존호텔에서 검색한건 readOnly로 바꾸어줌
  };
  return (
    <div className="search-item" onClick={inputHotelInfo}>
      <div className="item-title">{hotel.xlodgmentName}</div>
      <div className="item-addr">{hotel.xlodgmentAddr}</div>
    </div>
  );
};

// 모달로 띄울 주소 검색 api
const ModalAddr = (props) => {
  const { setAddress, setInputAddr } = props;
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const completeHandler = (data) => {
    setInputAddr(data.address);
    setAddress(data.address);
  };

  return (
    <div className="sellerAddrSearchBtn">
      <Button onClick={handleOpen} variant="contained" size="small">
        주소 검색
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <DaumPostcode onComplete={completeHandler} autoClose={false} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default InsertLodgment;
