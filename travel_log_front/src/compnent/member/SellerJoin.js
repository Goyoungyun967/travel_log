import axios from "axios";
import { useState } from "react";

const SellerJoin = () => {
  const [seller, setSeller] = useState({
    businessNo: "",
    representativeName: "",
    sellerPhone: "",
    bankName: "",
    acountName: "",
    accountNumber: "",
    sellerPw: "",
    businessName: "",
  });
  const [sellerPwRe, setSellerPwRe] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const validateBusinessNo = (businessNo) => {
    if (businessNo.length < 10) {
      setIsValid(false);
      return;
    }
    setLoading(true);
    setError("");

    const API_URL = "http://api.odcloud.kr/api/nts-businessman/v1/validate";
    const SERVICE_KEY = process.env.REACT_APP_SERVICE_KEY;

    const requestBody = {
      b_no: businessNo,
    };

    axios
      .post(`${API_URL}?serviceKey=${SERVICE_KEY}&returnType=JSON`, requestBody)
      .then((response) => {
        console.log("전송할 데이터:", requestBody); // 요청 데이터 로그
        console.log("API 응답:", response.data); // API 응답을 로그로 출력
        if (
          response.data &&
          response.data.result &&
          response.data.result.length > 0
        ) {
          setIsValid(true); // 유효한 사업자 번호
        } else {
          setError("유효하지 않은 사업자 번호입니다.");
          setIsValid(false);
        }
      })
      .catch((error) => {
        console.error("API 호출 오류:", error);
        setError("서버 오류가 발생했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  console.log(seller);
  const changeSeller = (e) => {
    const name = e.target.name;
    setSeller({ ...seller, [name]: e.target.value });

    if (name === "businessNo") {
      validateBusinessNo(e.target.value); // 사업자 번호 입력 시 검증
    }
  };
  const changeSellerPwRe = (e) => {
    setSellerPwRe(e.target.value);
  };

  return (
    <section className="join-content">
      <div className="seller-join">판매자회원가입</div>
      <div className="join-wrap">
        <label htmlFor="businessNo">사업자번호</label>
      </div>
      <div className="input-item">
        <input
          type="text"
          name="businessNo"
          id="businessNo"
          value={seller.businessNo}
          onChange={changeSeller}
        ></input>
      </div>
      {loading && <div className="check-wait">검증 중...</div>}
      {isValid && (
        <div className="yes-seller-check">유효한 사업자 번호입니다.</div>
      )}
      {!isValid && !loading && seller.businessNo && (
        <div className="no-seller-check">유효하지 않은 사업자 번호입니다.</div>
      )}
      <div className="join-wrap">
        <label htmlFor="sellerPw">비밀번호</label>
      </div>
      <div className="input-item">
        <input
          type="password"
          name="sellerPw"
          id="sellerPw"
          value={seller.sellerPw}
          onChange={changeSeller}
        ></input>
      </div>
      <div className="join-wrap">
        <label htmlFor="sellerPwRe">비밀번호 확인</label>
      </div>
      <div className="input-item">
        <input
          type="password"
          name="sellerPwRe"
          id="sellerPwRe"
          value={sellerPwRe}
          onChange={changeSellerPwRe}
        ></input>
      </div>
      <div className="join-wrap">
        <label htmlFor="representativeName">대표자명</label>
      </div>
      <div className="input-item">
        <input
          type="text"
          name="representativeName"
          id="representativeName"
          value={seller.representativeName}
          onChange={changeSeller}
        ></input>
      </div>
      <div className="join-wrap">
        <label htmlFor=" sellerPhone">전화번호</label>
      </div>
      <div className="input-item">
        <input
          className="seller-phone-zone"
          type="text"
          name="sellerPhone"
          id="sellerPhone"
          value={seller.sellerPhone}
          onChange={changeSeller}
        ></input>
      </div>
      <div className="bank-system">
        <div className="seller-input-group">
          <div className="join-wrap">
            <label htmlFor="bankName">은행명:</label>
          </div>
          <div className="input-item">
            <input
              className="bank-zone"
              type="text"
              name="bankName"
              id="bankName"
              value={seller.bankName}
              onChange={changeSeller}
            />
          </div>
        </div>

        <div className="seller-input-group">
          <div className="join-wrap">
            <label htmlFor="accountNumber" className="account-num">
              계좌번호:
            </label>
          </div>
          <div className="input-item">
            <input
              className="account-zone"
              type="text"
              name="accountNumber"
              id="accountNumber"
              value={seller.accountNumber}
              onChange={changeSeller}
            />
          </div>
        </div>
      </div>
      <div className="join-wrap">
        <label htmlFor="businessName">사업자명</label>
      </div>
      <div className="input-item">
        <input
          type="text"
          name="businessName"
          id="businessName"
          value={seller.businessName}
          onChange={changeSeller}
        ></input>
      </div>
      <button type="button" className="join-btn">
        회원가입 완료
      </button>
    </section>
  );
};

export default SellerJoin;
