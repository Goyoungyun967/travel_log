import { Route, Routes } from "react-router-dom";
import LodgmentList from "./LodgmentList";
import LodgmentDetail from "./LodgmentDetail";
import PaymentPage from "./PaymentPage";
import { CheckoutPage } from "./lodgmentUtil/Checkout.jsx";

const LodgmentMain = () => {
  return (
    <Routes>
      <Route path="lodgmentList" element={<LodgmentList />} />
      <Route
        path="lodgmentDetail/:lodgmentInfo/:startDate/:endDate/:guest"
        element={<LodgmentDetail />}
      />
      <Route path="paymentPage" element={<PaymentPage />} />
      <Route path="tossPayCheckout" element={<CheckoutPage />} />
    </Routes>
  );
};
export default LodgmentMain;
