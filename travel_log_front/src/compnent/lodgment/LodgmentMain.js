import { Route, Routes } from "react-router-dom";
import LodgmentList from "./LodgmentList";
import LodgmentDetail from "./LodgmentDetail";
import PaymentPage from "./PaymentPage";
import LodgmentReviewWirte from "./LodgmentReviewWrite";
import BookingInfo from "./BookingInfo";

const LodgmentMain = () => {
  return (
    <Routes>
      <Route path="lodgmentList" element={<LodgmentList />} />
      <Route
        path="lodgmentDetail/:lodgmentInfo/:startDate/:endDate/:guest"
        element={<LodgmentDetail />}
      />
      <Route path="paymentPage" element={<PaymentPage />} />
      <Route path="reviewWrite" element={<LodgmentReviewWirte />} />
      <Route path="bookingInfo" element={<BookingInfo />} />
    </Routes>
  );
};
export default LodgmentMain;
