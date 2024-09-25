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
import { useRecoilState } from "recoil";
import { loginNoState, memberLevelState } from "./compnent/utils/RecoilData";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [loginNo, setLoginNo] = useRecoilState(loginNoState);
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState);
  const [loginNickname, setLoginNickname] = useState("");
  useEffect(() => {
    refreshLogin();
    window.setInterval(refreshLogin, 60 * 30 * 1000);
  }, []);
  const refreshLogin = () => {
    const refreshToken = window.localStorage.getItem("refreshToken");
    if (refreshToken != null) {
      axios.defaults.headers.common["Authorization"] = refreshToken;
      axios
        .post(`${backServer}/member/refresh`)
        .then((res) => {
          console.log(res);
          setLoginNo(res.data.memberNo);
          setMemberLevel(res.data.memberLevel);
          setLoginNickname(res.data.memberNickname);
          axios.defaults.headers.common["Authorization"] = res.data.accessToken;
          window.localStorage.setItem("refreshToken", res.data.refreshToken);
        })
        .catch((err) => {
          console.log(err);
          setLoginNo("");
          setMemberLevel("");
          delete axios.defaults.headers.common["Authorization"];
          window.localStorage.removeItem("refreshToken");
        });
    }
  };
  return (
    <div className="wrap">
      <Header loginNickname={loginNickname} />
      <main className="content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/board/*" element={<BoardMain />} />
          <Route path="/faq/*" element={<FaqMain />} />
          <Route path="/lodgment/*" element={<LodgmentMain />} />
          <Route
            path="/login"
            element={<Login setLoginNickname={setLoginNickname} />}
          />
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
