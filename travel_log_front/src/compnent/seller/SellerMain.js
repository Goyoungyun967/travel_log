import { Route, Routes } from "react-router-dom";
import SellerLodgmentList from "./SellerLodgmentList";
import InsertLodgment from "./InsertLodgment";
const SellerMain = () => {
  return (
    <Routes>
      <Route path="list" element={<SellerLodgmentList />} />
      <Route path="insertLodgment" element={<InsertLodgment />} />
    </Routes>
  );
};

export default SellerMain;
