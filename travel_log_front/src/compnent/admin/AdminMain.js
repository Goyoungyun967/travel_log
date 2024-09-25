import { NavLink, Route, Routes } from "react-router-dom";
import "./admin.css";
const AdminMain = () => {
    return (
        <section className="admin-section">
            <div className="admin-wrap">
                <div className="admin-page-title"><h3>관리자 페이지</h3></div>
                <div className="admin-menu-bar">
                    <ul className="admin-main-menu">
                        <li>회원 관리</li>
                        <span className="material-icons">expand_more</span>
                    </ul>
                    <ul className="admin-sub-menu" style={{display : "block"}}>
                        <li><NavLink to="#">신고 회원 관리</NavLink></li>
                        <li><NavLink to="#">회원 이용 관리</NavLink></li>
                        <li><NavLink to="#">1대1 문의 처리</NavLink></li>
                    </ul>
                    <ul className="admin-main-menu">
                        <li>게시물 관리</li>
                    </ul>
                    <ul className="admin-sub-menu" style={{display : "block"}}>
                        <li><NavLink to="#">상품 게시글 관리</NavLink></li>
                        <li><NavLink to="#">신고 리뷰 관리</NavLink></li>
                        <li><NavLink to="#">신고 게시글 관리</NavLink></li>
                    </ul>
                    <ul className="admin-main-menu">
                        <li>판매자 관리</li>
                    </ul>
                    <ul className="admin-sub-menu" style={{display : "block"}}>
                        <li><NavLink to="#">판매자 가입 승인</NavLink></li>
                        <li><NavLink to="#">판매자 매출</NavLink></li>
                        <li><NavLink to="#">판매자 정산</NavLink></li>
                    </ul>
                </div>
                <div className="admin-content-wrap">
                    <Routes>
                        <Route></Route>
                    </Routes>
                </div>
            </div>
        </section>);
}

export default AdminMain;