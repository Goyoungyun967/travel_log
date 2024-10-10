import { NavLink, Route, Routes } from "react-router-dom";
import "./admin.css";
import InquiryList from "../inquiry/InquiryList";
import InquiryView from "../inquiry/InquiryView";
import AdminSellerList from "./AdminSellerList";

import SellerChart from "./SellerChart";
import MemberChart from "./MemberChart";
import AdminSellerStm from "./SellerStm";
import AdminLodgmentList from "./AdminLodgmentList";
import ReviewReportList from "./ReviewReportList";
import BoardReportList from "./BoardReportList";
import AdminMemberList from "./AdminMemberList";

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
        {/*}
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
              <NavLink to="sellerChart">판매자 매출</NavLink>
            </li>
            <li>
              <NavLink to="sellerStm">판매자 정산</NavLink>
            </li>
          </ul>
          <ul className="admin-main-menu" onClick={changeMenu}>
            <li>게시물</li>
            <span className="material-icons">expand_more</span>
          </ul>
          <ul className="admin-sub-menu">
            <li>
              <NavLink to="lodgmentList">상품 게시글 관리</NavLink>
            </li>
            <li>
              <NavLink to="reviewReportList">신고 리뷰 관리</NavLink>
            </li>
            <li>
              <NavLink to="6">신고 게시글 관리</NavLink>
            </li>
          </ul>
        </div>
        */}
        <div className="mcd-menu-wrap">
          <div class="admin-menu-container">
            <nav>
              <ul class="mcd-menu">
                <li>
                  <NavLink to="memberChart">
                    <strong>회원</strong>
                  </NavLink>
                  <ul>
                    <li>
                      <NavLink to="memberList">회원 관리</NavLink>
                    </li>
                    <li>
                      <NavLink to="memberChart">회원 이용 관리</NavLink>
                    </li>
                    <li>
                      <NavLink to="inquiryList">1대1 문의 처리</NavLink>
                    </li>
                  </ul>
                </li>
                <li>
                  <NavLink to="sellerChart">
                    <strong>판매자</strong>
                  </NavLink>
                  <ul>
                    <li>
                      <NavLink to="sellerList">판매자 관리</NavLink>
                    </li>
                    <li>
                      <NavLink to="sellerChart">판매자 매출</NavLink>
                    </li>
                    <li>
                      <NavLink to="sellerStm">판매자 정산</NavLink>
                    </li>
                  </ul>
                </li>
                <li>
                  <NavLink to="lodgmentList">
                    <strong>게시물</strong>
                  </NavLink>
                  <ul>
                    <li>
                      <NavLink to="lodgmentList">상품 게시글 관리</NavLink>
                    </li>
                    <li>
                      <NavLink to="reviewReportList">리뷰 신고 처리</NavLink>
                    </li>
                    <li>
                      <NavLink to="boardReportList">게시글 신고 처리</NavLink>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="admin-content-wrap">
          <Routes>
            <Route path="inquiryList" element={<InquiryList />} />
            <Route path="inquiryView/:inquiryNo" element={<InquiryView />} />
            <Route path="sellerList" element={<AdminSellerList />} />
            <Route path="memberChart" element={<MemberChart />} />c
            <Route path="sellerChart" element={<SellerChart />} />
            <Route path="sellerStm" element={<AdminSellerStm />} />
            <Route path="lodgmentList" element={<AdminLodgmentList />} />
            <Route path="reviewReportList" element={<ReviewReportList />} />
            <Route path="boardReportList" element={<BoardReportList />} />
            <Route path="memberList" element={<AdminMemberList />} />
          </Routes>
        </div>
      </div>
    </section>
  );
};

export default AdminMain;
