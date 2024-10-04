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
import {
  loginBusinessNameState,
  loginNicknameState,
  loginNoState,
  memberLevelState,
  sellerLoginNoState,
} from "./compnent/utils/RecoilData";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminMain from "./compnent/admin/AdminMain";
import MemberMain from "./compnent/member/MemberMain";
import UpdateMember from "./compnent/member/UpdateMember";

function App() {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [loginNo, setLoginNo] = useRecoilState(loginNoState);
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState);
  const [loginNickname, setLoginNickname] = useRecoilState(loginNicknameState);

  const [sellerLoginNo, setSellerLoginNo] = useRecoilState(sellerLoginNoState);
  const [loginBusinessName, setLoginBusinessName] = useRecoilState(
    loginBusinessNameState
  );
  useEffect(() => {
    refreshLogin();
    window.setInterval(refreshLogin, 60 * 30 * 1000);
  }, []);

  useEffect(() => {
    sellerRefreshLogin();
    window.setInterval(sellerRefreshLogin, 60 * 30 * 1000);
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
          setLoginNo(-1);
          setMemberLevel(-1);
          setLoginNickname("");
          delete axios.defaults.headers.common["Authorization"];
          window.localStorage.removeItem("refreshToken");
        });
    }
  };
  const sellerRefreshLogin = () => {
    const refreshToken = window.localStorage.getItem("sellerRefreshToken");

    if (refreshToken != null) {
      axios.defaults.headers.common["Authorization"] = refreshToken;
      axios
        .post(`${backServer}/seller/refresh`)
        .then((res) => {
          console.log(res);
          setSellerLoginNo(res.data.sellerNo);
          setLoginBusinessName(res.data.businessName);
          setMemberLevel(4);
          axios.defaults.headers.common["Authorization"] = res.data.accessToken;
          window.localStorage.setItem(
            "sellerRefreshToken",
            res.data.refreshToken
          );
        })
        .catch((err) => {
          console.log(err);
          setSellerLoginNo(-1);
          setMemberLevel(-1);
          setLoginBusinessName("");
          delete axios.defaults.headers.common["Authorization"];
          window.localStorage.removeItem("sellerRefreshToken");
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
          <Route path="/login" element={<Login />} />
          <Route path="/select" element={<Select />} />
          <Route path="/select/memberJoin" element={<MemberJoin />} />
          <Route path="/select/sellerJoin" element={<SellerJoin />} />
          <Route path="/seller/*" element={<SellerMain />} />
          <Route path="/member/*" element={<MemberMain />} />
          <Route path="/inquiryWrite" element={<InquiryWrite />} />
          <Route path={"/admin/*"} element={<AdminMain />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
