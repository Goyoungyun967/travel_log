import { Route, Routes } from "react-router-dom";
import LodgmentList from "./LodgmentList";
import LodgmentDetail from "./LodgmentDetail";
import PaymentPage from "./PaymentPage";

const LodgmentMain = () => {
  return (
    <Routes>
      <Route path="lodgmentList" element={<LodgmentList />} />
      <Route
        path="lodgmentDetail/:lodgmentInfo/:startDate/:endDate/:guest"
        element={<LodgmentDetail />}
      />
      <Route path="paymentPage" element={<PaymentPage />} />
    </Routes>
  );
};
export default LodgmentMain;
