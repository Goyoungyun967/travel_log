import { Route, Routes } from "react-router-dom";
import UpdateMember from "./UpdateMember";
import Mypage from "./Mypage";
import Myboard from "./Myboard";
import MyReservation from "./MyReservation";
import MyComment from "./MyComment";
import ChangePw from "./ChangePw";
import DeleteMember from "./deleteMember";
import InquiryView from "../inquiry/InquiryView";

const MemberMain = () => {
  return (
    <Routes>
      <Route path="mypage" element={<Mypage />} />
      <Route path="mypage/updateMember" element={<UpdateMember />} />
      <Route path="mypage/myboard" element={<Myboard />} />
      <Route path="mypage/DeleteMember" element={<DeleteMember />} />
      <Route path="mypage/myReservation" element={<MyReservation />} />
      <Route path="mypage/myComment" element={<MyComment />} />
      <Route path="mypage/updateMember/changePw" element={<ChangePw />} />
      <Route
        path="inquiryView/:inquiryNo"
        element={
          <div
            style={{
              width: "800px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <InquiryView />
          </div>
        }
      />
    </Routes>
  );
};

export default MemberMain;
