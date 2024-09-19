import "./css/insert_lodgment.css";

const InsertLodgment = () => {
  return (
    <div className="contanier">
      <form>
        <div className="box-wrap box-radius">
          <div className="box">
            <img src="/img/default_img.png" alt="사진 추가" />
          </div>
          <div className="box">
            <div className="input-wrap">
              <div className="input-item">
                <div className="input-title">
                  <label htmlFor="lodgmentName">숙소명</label>
                </div>
                <div className="input">
                  <input type="text" id="lodgmentName" />
                </div>
              </div>
              <div className="input-item">
                <div className="addr">주소 API 들어가는 곳</div>
              </div>
              <div className="input-item">
                <div className="input-title">
                  <label htmlFor="checkIn">체크인</label>
                </div>
                <div className="input">
                  <input type="text" id="checkIn" />
                </div>
              </div>
              <div className="input-item">
                <div className="input-title">
                  <label htmlFor="checkOut">체크아웃</label>
                </div>
                <div className="input">
                  <input type="text" id="checkOut" />
                </div>
              </div>
            </div>
          </div>
          <div className="box box-notice">
            <h5>공지사항</h5>
            <div className="toast">토스트 에디터 들어갈 자리</div>
          </div>
          <button className="btn primary">수정 완료</button>
        </div>
      </form>
    </div>
  );
};

export default InsertLodgment;
