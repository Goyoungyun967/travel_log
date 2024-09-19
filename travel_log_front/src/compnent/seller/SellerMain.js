import { Route, Routes } from "react-router-dom";
import SellerLodgmentList from "./SellerLodgmentList";
import InsertLodgment from "./InsertLodgment";
import SellerInfo from "./SellerInfo";
const SellerMain = () => {
  return (
    <Routes>
      {/* 판매자 메인 - 등록한 호텔 정보 출력 */}
      <Route path="list" element={<SellerLodgmentList />} />
      {/* 호텔 등록하기 */}
      <Route path="insertLodgment" element={<InsertLodgment />} />
      {/* 판매자 개인정보 조회 */}
      <Route path="info" element={<SellerInfo />} />
    </Routes>
  );
};

export default SellerMain;
