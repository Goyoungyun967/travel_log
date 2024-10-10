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

/* ---------- seller ---------- */
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

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
        {memberLevel === 4 ? ( // 판매자 zone
          <Navbar collapseOnSelect expand="lg">
            <Container>
              <Navbar.Brand href="/" className="me-5 fw-bold text-primary fs-3">
                Travel-Log
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mx-auto">
                  {" "}
                  {/* 가운데 정렬을 위한 클래스 */}
                  <Nav.Link href="/" className="me-5 seller-custom-nav-link">
                    숙소
                  </Nav.Link>
                  <Nav.Link
                    href="/seller/stm"
                    className="me-5 seller-custom-nav-link"
                  >
                    매출
                  </Nav.Link>
                  <Nav.Link
                    href="/seller/bookList"
                    className="me-5 seller-custom-nav-link"
                  >
                    예약조회
                  </Nav.Link>
                  <Nav.Link
                    href="/seller/inqList"
                    className="me-5 seller-custom-nav-link"
                  >
                    고객센터
                  </Nav.Link>
                </Nav>
                <Nav>
                  {" "}
                  {/* 로그인/회원가입 부분 */}
                  {isLogin ? (
                    <>
                      <Nav.Link
                        href={
                          memberLevel === 1
                            ? "/admin"
                            : memberLevel === 4
                            ? "/seller/sellerInfo"
                            : "/member/mypage"
                        }
                        className="me-3 fw-bold"
                      >
                        {memberLevel === 4 ? loginBusinessName : loginNickname}
                      </Nav.Link>
                      <Nav.Link
                        href="/#"
                        onClick={logout}
                        className="text-danger fw-bold"
                      >
                        로그아웃
                      </Nav.Link>
                    </>
                  ) : (
                    <>
                      <Nav.Link href="/login" className="me-3">
                        로그인
                      </Nav.Link>
                      <Nav.Link href="/select">회원가입</Nav.Link>
                    </>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        ) : (
          // <Menubar />
          <>
            <Navbar collapseOnSelect expand="lg">
              <Container>
                <Navbar.Brand
                  href="/"
                  className="me-5 fw-bold text-primary fs-3"
                >
                  Travel-Log
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="mx-auto">
                    {" "}
                    {/* 가운데 정렬을 위한 클래스 */}
                    <Nav.Link
                      href="/lodgment/lodgmentList"
                      className="me-5 seller-custom-nav-link"
                    >
                      국내 숙소
                    </Nav.Link>
                    <Nav.Link
                      href="/board/list"
                      className="me-5 seller-custom-nav-link"
                    >
                      커뮤니티
                    </Nav.Link>
                    <NavDropdown title="고객센터" id="collapsible-nav-dropdown">
                      <NavDropdown.Item href="/faq/faqList/L1/0">
                        자주 묻는 질문
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/inquiryWrite">
                        1:1 문의
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                  <Nav>
                    {" "}
                    {/* 로그인/회원가입 부분 */}
                    {isLogin ? (
                      <>
                        <Nav.Link
                          href={
                            memberLevel === 1
                              ? "/admin"
                              : memberLevel === 4
                              ? "/seller/sellerInfo"
                              : "/member/mypage"
                          }
                          className="me-3 fw-bold"
                        >
                          {memberLevel === 4
                            ? loginBusinessName
                            : loginNickname}
                        </Nav.Link>
                        <Nav.Link
                          href="/#"
                          onClick={logout}
                          className="text-danger fw-bold"
                        >
                          로그아웃
                        </Nav.Link>
                      </>
                    ) : (
                      <>
                        <Nav.Link href="/login" className="me-3">
                          로그인
                        </Nav.Link>
                        <Nav.Link href="/select">회원가입</Nav.Link>
                      </>
                    )}
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
