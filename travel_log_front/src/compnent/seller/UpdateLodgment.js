import { useEffect, useRef, useState } from "react";
import "./css/insert_lodgment.css";
import axios from "axios";
import DaumPostcode from "react-daum-postcode";
import UqillEditor from "../utils/UqillEditor";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { useRecoilState } from "recoil";
import { sellerLoginNoState } from "../utils/RecoilData";

const UpdateLodgment = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const params = useParams();
  const lodgmentNo = params.lodgmentNo;
  const [lodgmentList, setLodgmentList] = useState({}); // 숙소 정보
  console.log("숙소", lodgmentList);

  //호텔 명
  const [hotelName, setHotelName] = useState("");
  console.log(hotelName);
  // 호텔 타입 저장
  const [lodgmentType, setLodgmentType] = useState(1); //---------
  console.log(lodgmentType);
  // 호텔 번호 저장
  //   const [inLodgmentNo, setInLodgmentNo] = useState(0); //---------
  // 호텔 주소
  const [address, setAddress] = useState(""); // 주소
  console.log("wnth-", address);
  // 호텔 성급 저장
  const [lodgmentStar, setLodgmentStar] = useState(0); //---------
  console.log(lodgmentStar);
  // back으로 보내는 이미지
  const [lodgmentImg, setLodgmentImg] = useState(null);
  console.log(lodgmentImg);
  // 호텔 check-in / check-out
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  console.log(checkIn);
  console.log(checkOut);
  // 공지사항
  const [boardContent, setBoardContent] = useState("");
  console.log(boardContent);
  // 미리보기용 이미지
  const [viewImg, setViewImg] = useState(null);
  const [upImg, setUpImg] = useState(null);

  //   console.log("미리보기 이미지", viewImg);
  const lodgmentImgRef = useRef(null);

  // 선택된 호텔 타입의 value 값을 저장
  const lodgmentTypeChange = (e) => {
    setLodgmentType(Number(e.target.value));
  };

  useEffect(() => {
    axios
      .get(`${backServer}/seller/lodgmentView/${lodgmentNo}`)
      .then((res) => {
        console.log("lodgment res", res);
        // 호텔 삭제하고 뒤로가기를 누르면 호텔 정보가 null값이 되어서 오류가 뜸
        // 호텔 정보가 null값이면 호텔 리스트로 이동하게 함
        if (res.data.lodgment !== null) {
          console.log("lod", res);
          setLodgmentList(res.data);
          setHotelName(res.data.lodgmentName); // 숙소 이름
          setLodgmentType(res.data.lodgmentTypeNo); // 숙소 타입
          setAddress(res.data.lodgmentAddr);
          setLodgmentStar(res.data.lodgmentStarGrade); // 성급
          setCheckIn(res.data.lodgmentCheckIn); // 체크인
          setCheckOut(res.data.lodgmentCheckOut); // 체크아웃
          setUpImg(res.data.lodgmentImgPath); // 미리보기 이미지
          setBoardContent(res.data.lodgmentNotice); // 공지사항
        } else {
          navigate("/seller/list");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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

  return (
    <div className="contanier insert-lodgment">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (
            hotelName !== "" &&
            checkIn !== null &&
            checkOut !== null &&
            address !== ""
          ) {
            const form = new FormData();
            form.append("lodgmentName", hotelName);
            form.append("lodgmentAddr", address);
            form.append("lodgmentTypeNo", lodgmentType);
            form.append("lodgmentNo", lodgmentNo);
            form.append("lodgmentStarGrade", lodgmentStar);
            form.append("lodgmentCheckIn", checkIn);
            form.append("lodgmentCheckOut", checkOut);
            form.append("lodgmentNotice", boardContent);

            if (lodgmentImg !== null) {
              // 썸네일 있을 수도 있고 없을 수도 있음 => 첨부된 경우에만 추가
              form.append("lodgmentImg", lodgmentImg);
            }

            axios
              .patch(`${backServer}/seller/updateLodgment`, form, {
                headers: {
                  contentType: "multipart/form-data",
                  processData: false,
                },
              })
              .then((res) => {
                console.log(res);
                if (res.data) {
                  navigate(`/seller/list`);
                  console.log(form);
                } else {
                  Swal.fire({
                    title: "에러가 발생했습니다.",
                    text: "원인을 찾으세요",
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
              {viewImg ? ( // 미리보기용 이미지
                <img
                  src={viewImg}
                  onClick={() => {
                    lodgmentImgRef.current.click();
                  }}
                />
              ) : upImg ? ( // 조회해온 이미지
                <img
                  src={`${backServer}/seller/lodgment/${upImg}`}
                  onClick={() => {
                    lodgmentImgRef.current.click();
                  }}
                />
              ) : (
                <img
                  src="/image/default_img.png"
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
                          <ModalAddr setAddress={setAddress} />
                        </div>
                      </div>
                      <input
                        type="text"
                        id="addrText"
                        value={address}
                        readOnly
                        onChange={(e) => setAddress(e.target.value)}
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
                    value={checkIn}
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
                    value={checkOut}
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

// 모달로 띄울 주소 검색 api
const ModalAddr = (props) => {
  const setAddress = props.setAddress;
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

export default UpdateLodgment;
