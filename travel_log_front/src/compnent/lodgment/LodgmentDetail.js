import "./css/lodgmentDetail.css";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import LodgmentDetailMap from "./LodgmentDetailMap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import LodgmentRoomDetail from "./LodgmentRoomDetail";
const LodgmentDetail = () => {
  return (
    <section className="section lodgmentDetail">
      <div className="lodgment-detail-wrap">
        <LodgmentWrap />
      </div>
      <div className="lodgment-detail-info">
        <table>
          <tbody>
            <tr>
              <td width={"50%"}>숙박 업체 종류</td>
              <td className="member-rating" width={"50%"}>
                평점
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="lodgment-detail-name">
                업체명
              </td>
            </tr>
          </tbody>
        </table>
        <div className="lodgment-detail-map-wrap">
          <LodgmentDetailMap />
        </div>
        <div className="lodgment-loom-type-wrap">
          <LodgmentRoomDetail />
        </div>
      </div>
      <div className="user-active-wrap">
        <Tabs
          defaultActiveKey="profile"
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          <Tab eventKey="home" title="이용후기">
            Tab content for Home
          </Tab>
          <Tab eventKey="profile" title="문의하기">
            Tab content for Profile
          </Tab>
          <Tab eventKey="longer-tab" title="공지사항">
            Tab content for Loooonger Tab
          </Tab>
        </Tabs>
      </div>
    </section>
  );
};
const LodgmentWrap = () => {
  return (
    <div className="lodgment-detail-img">
      <Carousel fade>
        <Carousel.Item>
          <img src="/image/nesthotel.jpg" text="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img src="/image/nesthotel2.jpg" text="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img src="/image/nesthotel3.jpg" text="First slide" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default LodgmentDetail;
