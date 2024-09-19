import { Route, Routes } from "react-router-dom";
import LodgmentList from "./LodgmentList";
import LodgmentDetail from "./LodgmentDetail";

const LodgmentMain = () => {
  return (
    <Routes>
      <Route path="lodgmentList" element={<LodgmentList />} />
      <Route path="lodgmentDetail" element={<LodgmentDetail />} />
    </Routes>
  );
};
export default LodgmentMain;
