import { Link } from "react-router-dom";
import "./header_footer.css";
const Header = () => {
  return (
    <header className="header">
      <div>
        <div className="logo">
          <Link to="/">Travel Log</Link>
        </div>
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
              <Link to="#">상품</Link>
            </li>
            <li>
              <Link to="/board">커뮤니티</Link>
            </li>
            <li>
              <Link to="#">고객센터</Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/faq">자주묻는질문</Link>
                </li>
                <li>
                  <Link to="#">1:1문의</Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>

        <ul className="user-menu">
          <li>
            <Link to="#">로그인</Link>
          </li>
          <li>
            <Link to="#">회원가입</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
