import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <h3>Travel Log</h3>
        <p>이메일 : Travel_log@gmail.com</p>
        <p>대표 전화 : 010-0000-0000</p>
        <p>주소 : 서울 영등포구 선유동2로 57 이레빌딩</p>
        <ul>
          <li>
            <Link to="#">개인정보</Link>
          </li>
          <li>
            <Link to="#">이용약관</Link>
          </li>
          <li>
            <Link to="#">인재채용</Link>
          </li>
          <li>
            <Link to="#">제휴제안</Link>
          </li>
          <li>
            <Link to="#">청소년보호정책</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
