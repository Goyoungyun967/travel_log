import "./css/insert_lodgment.css";

const InsertLodgment = () => {
  return (
    <div class="contanier">
      <form action="#">
        <div class="box-wrap box-radius">
          <div class="box">
            <a href="#" class="image">
              <img src="/img/default_img.png" alt="사진 추가" />
            </a>
          </div>
          <div class="box">
            <div class="input-wrap">
              <div class="input-item">
                <div class="input-title">
                  <label for="#">숙소명</label>
                </div>
                <div class="input">
                  <input type="text" />
                </div>
              </div>
              <div class="input-item">
                <div class="addr" style="color: red">
                  주소 API 들어가는 곳
                </div>
              </div>
              <div class="input-item">
                <div class="input-title">
                  <label for="#">체크인</label>
                </div>
                <div class="input">
                  <input type="text" />
                </div>
              </div>
              <div class="input-item">
                <div class="input-title">
                  <label for="#">체크아웃</label>
                </div>
                <div class="input">
                  <input type="text" />
                </div>
              </div>
            </div>
          </div>
          <div class="box box-notice">
            <h5>공지사항</h5>
            <div class="toast">토스트 에디터 들어갈 자리</div>
          </div>
          <button class="btn primary">수정 완료</button>
        </div>
      </form>
    </div>
  );
};

export default InsertLodgment;
