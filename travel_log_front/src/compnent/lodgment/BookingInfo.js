import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LodgmentDetailMapPayment from "./LodgmentDetailMapPayment";
import {
  Modal as MuiModal,
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  FormControl,
  FormLabel,
} from "@mui/material";
import Swal from "sweetalert2";

const BookingInfo = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const bookNo = state.bookNo;
  //const bookNo = 21;
  console.log("bookNo : " + bookNo);
  const [bookingInfo, setBookingInfo] = useState([]);
  useEffect(() => {
    axios
      .get(`${backServer}/booking/${bookNo}`)
      .then((res) => {
        console.log(res);
        setBookingInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const bookNoInfo = String(bookingInfo.bookNo).padStart(8, "0");

  const bookingCancel = () => {
    axios
      .post(`${backServer}/booking/cancel`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [openModal, setOpenModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [inputReason, setInputReason] = useState(""); // 기타 사유를 위한 상태 추가

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedReason("");
    setInputReason(""); // 모달 닫을 때 입력값 초기화
  };
  const reportReasons = [
    { id: 1, label: "개인 사정" },
    { id: 2, label: "예약 오류" },
    { id: 3, label: "단순 변심" },
    { id: 4, label: "기타" },
  ];
  return (
    <section className="section">
      <div className="booking-info-wrap">
        <div class="booking-container">
          <h2 class="booking-title">
            {bookingInfo.status === 1
              ? "예약 현황"
              : bookingInfo.status === 2
              ? "이용 완료"
              : "취소된 예약"}
          </h2>
          <div class="booking-card">
            <div class="booking-item">
              {bookingInfo.lodgmentImg && (
                <img
                  src={
                    bookingInfo.lodgmentImg
                      ? `${backServer}/seller/lodgment/${bookingInfo.lodgmentImg}`
                      : "/image/default_img.png"
                  }
                />
              )}
            </div>
            <div class="booking-item">
              <span class="booking-label">예약 번호:</span>
              <span class="booking-value" id="bookNo">
                {bookNoInfo}
              </span>
            </div>
            <div class="booking-item">
              <span class="booking-label">회원 ID:</span>
              <span class="booking-value" id="memberId">
                {bookingInfo.memberId}
              </span>
            </div>
            <div class="booking-item">
              <span class="booking-label">결제일:</span>
              <span class="booking-value" id="bookNo">
                {bookingInfo.paymentDate}
              </span>
            </div>
            <div class="booking-item">
              <span class="booking-label">결제 금액:</span>
              <span class="booking-value" id="bookNo">
                {bookingInfo.roomPrice}원
              </span>
            </div>
            <div class="booking-item">
              <span class="booking-label">체크인 날짜:</span>
              <span class="booking-value" id="startDate">
                {bookingInfo.startDate}
              </span>
            </div>
            <div class="booking-item">
              <span class="booking-label">체크아웃 날짜:</span>
              <span class="booking-value" id="endDate">
                {bookingInfo.endDate}
              </span>
            </div>
            <div class="booking-item">
              <span class="booking-label">게스트 인원:</span>
              <span class="booking-value" id="guestCount">
                {bookingInfo.guestCount}명
              </span>
            </div>
            <div class="booking-item">
              <span class="booking-label">게스트 이름:</span>
              <span class="booking-value" id="guestName">
                {bookingInfo.guestName}
              </span>
            </div>
            <div class="booking-item">
              <span class="booking-label">전화번호:</span>
              <span class="booking-value" id="guestPhone">
                {bookingInfo.guestPhone}
              </span>
            </div>
            <div class="booking-item">
              <span class="booking-label">요청사항:</span>
              <span class="booking-value" id="guestRequest">
                {bookingInfo.guestRequest
                  ? bookingInfo.guestRequest
                  : "요청사항 없음"}
              </span>
            </div>
            <div class="booking-item">
              <span class="booking-label">숙소 이름:</span>
              <span class="booking-value">{bookingInfo.lodgmentName}</span>
            </div>
            <div class="booking-item">
              <span class="booking-label">방 이름:</span>
              <span class="booking-value" id="roomName">
                {bookingInfo.roomName}
              </span>
            </div>
            <div class="booking-item">
              <div className="booking-lodgment-map-wrap">
                <div>
                  <span class="booking-label">숙소 주소:</span>
                  <span class="booking-value" id="lodgmentAddr">
                    {bookingInfo.lodgmentAddr}
                  </span>
                </div>
                <div>
                  <LodgmentDetailMapPayment
                    lodgmentName={bookingInfo.lodgmentName}
                    lodgmentAddr={bookingInfo.lodgmentAddr}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="booking-cancle">
        {bookingInfo.status === 1 && (
          <>
            <button onClick={handleOpenModal}>예약 취소</button>
            <CancleModal
              handleCloseModal={handleCloseModal}
              reportReasons={reportReasons}
              openModal={openModal}
              selectedReason={selectedReason}
              setSelectedReason={setSelectedReason}
              inputReason={inputReason}
              setInputReason={setInputReason}
              bookNo={bookNo}
              roomPrice={bookNoInfo.roomPrice}
            />
          </>
        )}
        {bookingInfo.status === 2 && bookingInfo.reviewCount === 0 && (
          <button
            onClick={() => {
              navigate(`/lodgment/reviewWrite`, {
                state: { lodgmentNo: bookingInfo.lodgmentNo, bookNo: bookNo },
              });
            }}
          >
            리뷰 작성
          </button>
        )}
      </div>
    </section>
  );
};
const CancleModal = (pros) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const {
    handleCloseModal,
    reportReasons,
    openModal,
    selectedReason,
    setSelectedReason,
    inputReason,
    setInputReason,
    bookNo,
    roomPrice,
  } = pros;
  const navigate = useNavigate();
  const handleCancelBooking = () => {
    const cancelData = {
      bookNo: bookNo,
      roomPrice: roomPrice,
      cancelReason: selectedReason,
      cancelReasonText: inputReason,
    };
    axios
      .patch(`${backServer}/booking`, cancelData)
      .then((res) => {
        console.log(res);
        // 추가 작업: 모달 닫기, 알림 표시 등
        handleCloseModal();
        if (!res.data) {
          navigate(`${backServer}/`);
        } else {
          handleCloseModal();
          Swal.fire({
            text: "서버 오류, 관리자에게 문의해주세요.",
          });
          return;
        }
      })
      .catch((err) => {
        console.error("예약 취소 실패:", err);
      });
  };

  return (
    <MuiModal open={openModal === true} onClose={handleCloseModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          예약 취소 사유
        </Typography>
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">취소 사유</FormLabel>
          <RadioGroup
            value={selectedReason}
            onChange={(e) => setSelectedReason(e.target.value)}
          >
            {reportReasons.map((reason) => (
              <FormControlLabel
                key={reason.id}
                value={reason.id}
                control={<Radio />}
                label={reason.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
        {selectedReason === "2" && (
          <input
            placeholder="기타 사유를 20자 이내로 입력하세요"
            maxLength={20} // 최대 50자로 제한
            style={{ width: "100%", marginTop: "8px" }} // 스타일 추가 (필요 시)
            onChange={(e) => setInputReason(e.target.value)} // 입력값이 변경될 때 상태 업데이트
            value={inputReason}
          />
        )}
        <Button
          variant="contained"
          sx={{ mt: 3 }}
          fullWidth
          onClick={handleCancelBooking}
        >
          예약 취소하기
        </Button>
      </Box>
    </MuiModal>
  );
};

export default BookingInfo;
