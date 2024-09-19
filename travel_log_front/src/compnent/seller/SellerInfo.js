import "./css/seller_info.css";
const SellerInfo = () => {
  return (
    <div class="contanier seller-info">
      <div class="box-wrap box-radius">
        <h3>판매자 정보</h3>
        <div class="seller-info">
          <div class="item-wrap">
            <div class="item">
              <h3>가게명</h3>
              <span>김가네</span>
            </div>
            <div class="item">
              <h3>사업자 번호</h3>
              <span>000-00-00000</span>
            </div>
            <div class="item">
              <h3>법인 등록 번호</h3>
              <span>000000-0000000</span>
            </div>
            <div class="item">
              <h3>대표번호</h3>
              <span>김씨</span>
            </div>
            <div class="item">
              <h3>은행 정보</h3>
              <div>
                <p>우리은행</p>
                <p>1002-123-123456</p>
              </div>
            </div>
          </div>
        </div>
        <button class="btn primary">정보 수정</button>
      </div>
    </div>
  );
};

export default SellerInfo;
