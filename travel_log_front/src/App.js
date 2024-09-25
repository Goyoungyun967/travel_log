import { Route, Routes } from "react-router-dom";
import Footer from "./compnent/common/Footer";
import Header from "./compnent/common/Header";
import Main from "./compnent/common/Main";
import BoardMain from "./compnent/board/BoardMain";
import FaqMain from "./compnent/faq/FaqMain";
import LodgmentMain from "./compnent/lodgment/LodgmentMain";
import Login from "./compnent/member/Login";

import Select from "./compnent/member/Select";
import MemberJoin from "./compnent/member/MemberJoin";
import SellerJoin from "./compnent/member/SellerJoin";
import SellerMain from "./compnent/seller/SellerMain";
import InquiryWrite from "./compnent/inquiry/InquiryWrite";


function App() {
  return (
    <div className="wrap">
      <Header />
      <main className="content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/board/*" element={<BoardMain />} />
          <Route path="/faq/*" element={<FaqMain />} />
          <Route path="/lodgment/*" element={<LodgmentMain />} />
          <Route path="/login" element={<Login />} />
          <Route path="/select" element={<Select />} />
          <Route path="/select/memberJoin" element={<MemberJoin />} />
          <Route path="/select/sellerJoin" element={<SellerJoin />} />
          <Route path="/seller/*" element={<SellerMain />} />
          <Route path="/inquiryWrite" element={<InquiryWrite/>}/>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
