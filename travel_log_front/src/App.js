import { Route, Routes } from "react-router-dom";
import Footer from "./compnent/common/Footer";
import Header from "./compnent/common/Header";
import Main from "./compnent/common/Main";
import BoardMain from "./compnent/board/BoardMain";
import Faq from "./compnent/faq/Faq";
import LodgmentMain from "./compnent/lodgment/LodgmentMain";
import Login from "./compnent/member/Login";

import Select from "./compnent/member/Select";
import MemberJoin from "./compnent/member/MemberJoin";
import SellerJoin from "./compnent/member/SellerJoin";

function App() {
  return (
    <div className="wrap">
      <Header></Header>
      <main className="content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/board/*" element={<BoardMain />} />
          <Route path="/faq/*" element={<Faq />} />
          <Route path="/lodgment/*" element={<LodgmentMain />} />
          <Route path="/login" element={<Login />} />
          <Route path="/select" element={<Select />} />
          <Route path="/select/memberJoin" element={<MemberJoin />} />
          <Route path="/select/sellerJoin" element={<SellerJoin />} />
        </Routes>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
