import { Route, Routes } from "react-router-dom";
import SellerLodgmentList from "./SellerLodgmentList";

// 판매자 관련 메인
const SellerMain = () => {
  return (
    <Routes>
      {/* BoardList : 게시글 목록 */}
      <Route path="sellerLodgmentList" element={<SellerLodgmentList />} />
    </Routes>
  );
};

export default SellerMain;
