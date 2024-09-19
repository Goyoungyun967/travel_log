import { Route, Routes } from "react-router-dom";
import SellerLodgmentList from "./SellerLodgmentList";
const SellerMain = () => {
  return (
    <Routes>
      <Route path="list" element={<SellerLodgmentList />} />
      <Route path="/insertLodgment" element={<SellerLodgmentList />} />
    </Routes>
  );
};

export default SellerMain;
