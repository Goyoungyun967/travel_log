import { Route, Routes } from "react-router-dom";
import LodgmentList from "./LodgmentList";
import LodgmentDetail from "./LodgmentDetail";
import PaymentPage from "./PaymentPage";
import LodgmentReviewWirte from "./LodgmentReviewWrite";

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
    </Routes>
  );
};
export default LodgmentMain;
