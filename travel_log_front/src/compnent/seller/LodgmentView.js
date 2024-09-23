import "./css/lodgment_view.css";
const LodgmentView = () => {
  return (
    <div className="lv-box-wrap box-radius">
      <div className="lv-item-fr-wrap">
        <div className="lv-img-wrap">
          <img src="/image/lodgment_default_img.png" alt="" width="200px" />
        </div>
        <div className="lv-item-wrap">
          <div className="item-title">
            <h1>A 호텔</h1>
          </div>
          <div className="item-star">
            <span>0</span>
            <span>성급</span>
          </div>
          <div className="item-addr">
            <p>주소주소주소주소주소주소주소주소주소주소</p>
          </div>
          <div className="chek-in">
            <span>체크인 : </span>
            <span>12:00</span>
          </div>
          <div className="chek-out">
            <span>체크아웃 : </span>
            <span>13:00</span>
          </div>
        </div>
      </div>
      <div className="item-sc-wrap">
        <div className="item-notice">
          <h4>공지사항</h4>
        </div>
        <div className="item-map">지도 들어갈 자리</div>
      </div>
    </div>
  );
};

export default LodgmentView;
