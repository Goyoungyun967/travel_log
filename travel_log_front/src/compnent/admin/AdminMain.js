import { NavLink, Route, Routes } from "react-router-dom";
import "./admin.css";
import InquiryList from "../inquiry/InquiryList";
import InquiryView from "../inquiry/InquiryView";
import AdminSellerList from "./AdminSellerList";
import MemberChart from "./MemberChart";

const AdminMain = () => {
  const changeMenu = (e) => {
    e.currentTarget.nextSibling.classList.toggle("active");
    if (e.currentTarget.lastChild.innerText === "expand_more") {
      e.currentTarget.lastChild.innerText = "expand_less";
    } else {
      e.currentTarget.lastChild.innerText = "expand_more";
    }
  };
  return (
    <section className="admin-section">
      <div className="admin-wrap">
        <div className="admin-page-title">
          <h3>관리자 페이지</h3>
        </div>
        <div className="admin-menu-bar">
          <ul className="admin-main-menu" onClick={changeMenu}>
            <li>회원</li>
            <span className="material-icons">expand_more</span>
          </ul>
          <ul className="admin-sub-menu">
            <li>
              <NavLink to="1">회원 관리</NavLink>
            </li>
            <li>
              <NavLink to="memberChart">회원 이용 관리</NavLink>
            </li>
            <li>
              <NavLink to="inquiryList">1대1 문의 처리</NavLink>
            </li>
          </ul>
          <ul className="admin-main-menu" onClick={changeMenu}>
            <li>판매자</li>
            <span className="material-icons">expand_more</span>
          </ul>
          <ul className="admin-sub-menu">
            <li>
              <NavLink to="sellerList">판매자 관리</NavLink>
            </li>
            <li>
              <NavLink to="7">판매자 매출</NavLink>
            </li>
            <li>
              <NavLink to="8">판매자 정산</NavLink>
            </li>
          </ul>
          <ul className="admin-main-menu" onClick={changeMenu}>
            <li>게시물</li>
            <span className="material-icons">expand_more</span>
          </ul>
          <ul className="admin-sub-menu">
            <li>
              <NavLink to="3">상품 게시글 관리</NavLink>
            </li>
            <li>
              <NavLink to="4">신고 리뷰 관리</NavLink>
            </li>
            <li>
              <NavLink to="5">신고 게시글 관리</NavLink>
            </li>
          </ul>
        </div>
        <div className="admin-content-wrap">
          <Routes>
            <Route path="inquiryList" element={<InquiryList />} />
            <Route path="inquiryView/:inquiryNo" element={<InquiryView />} />
            <Route path="sellerList" element={<AdminSellerList />} />
            <Route path="memberChart" element={<MemberChart />} />
          </Routes>
        </div>
      </div>
    </section>
  );
};

export default AdminMain;
