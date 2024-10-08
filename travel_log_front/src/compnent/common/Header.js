import { Link } from "react-router-dom";
import "./header_footer.css";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  isLoginState,
  loginBusinessNameState,
  loginNicknameState,
  loginNoState,
  memberLevelState,
  sellerLoginNoState,
} from "../utils/RecoilData";
import { useEffect } from "react";

const Header = (props) => {
  const [loginBusinessName, setLoginBusinessName] = useRecoilState(
    loginBusinessNameState
  );
  const [loginNickname, setLoginNickname] = useRecoilState(loginNicknameState);

  const [loginNo, setLoginNo] = useRecoilState(loginNoState);
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState);
  const [sellerNo, setSellerNo] = useRecoilState(sellerLoginNoState);
  const isLogin = useRecoilValue(isLoginState);

  const logout = () => {
    setLoginNo(-1);
    setMemberLevel(-1);
    setSellerNo(-1);
    setLoginBusinessName("");
    setLoginNickname("");
    delete axios.defaults.headers.common["Authorization"];
    window.localStorage.removeItem("refreshToken");
    window.localStorage.removeItem("sellerRefreshToken");
  };
  return (
    <header className="header">
      <div>
        <div className="logo">
          <Link to="/">Travel Log</Link>
        </div>
        {memberLevel === 4 ? (
          <nav className="nav">
            <ul>
              <li>
                <Link to="/seller/list">숙소 리스트</Link>
              </li>
              <li>
                <Link to="/seller/stm">매출 정보</Link>
              </li>
              <li>
                <Link to="/seller/bookList">예약 조회</Link>
              </li>
              <li>
                <Link to="/seller/inqList">판매자 1대1 문의</Link>
              </li>
            </ul>
          </nav>
        ) : (
          <nav className="nav">
            <ul>
              <li>
                <Link to="#">지역</Link>
                <ul className="sub-menu">
                  <li>
                    <Link to="#">서울</Link>
                  </li>
                  <li>
                    <Link to="#">인천</Link>
                  </li>
                  <li>
                    <Link to="#">경기</Link>
                  </li>
                  <li>
                    <Link to="#">부산</Link>
                  </li>
                  <li>
                    <Link to="#">대전</Link>
                  </li>
                  <li>
                    <Link to="#">대구</Link>
                  </li>
                  <li>
                    <Link to="#">울산</Link>
                  </li>
                  <li>
                    <Link to="#">세종</Link>
                  </li>
                  <li>
                    <Link to="#">광주</Link>
                  </li>
                  <li>
                    <Link to="#">강원</Link>
                  </li>
                  <li>
                    <Link to="#">충북</Link>
                  </li>
                  <li>
                    <Link to="#">충남</Link>
                  </li>
                  <li>
                    <Link to="#">경북</Link>
                  </li>
                  <li>
                    <Link to="#">경남</Link>
                  </li>
                  <li>
                    <Link to="#">전남</Link>
                  </li>
                  <li>
                    <Link to="#">제주</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/lodgment/lodgmentList">상품</Link>
              </li>
              <li>
                <Link to="/board/list">커뮤니티</Link>
              </li>
              <li>
                <Link to="#">고객센터</Link>
                <ul className="sub-menu">
                  <li>
                    <Link to="/faq/faqList/L1/0">자주묻는질문</Link>
                  </li>
                  <li>
                    <Link to="/inquiryWrite">1:1문의</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        )}
        <ul className="user-menu">
          {isLogin ? (
            <>
              <li>
                <Link
                  to={
                    memberLevel === 1
                      ? "/admin"
                      : memberLevel === 4
                      ? "/seller/list"
                      : "/member/mypage"
                  }
                >
                  {memberLevel === 4 ? loginBusinessName : loginNickname}
                </Link>
              </li>
              <li>
                <Link to="/#" onClick={logout}>
                  로그아웃
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">로그인</Link>
              </li>
              <li>
                <Link to="/select">회원가입</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
