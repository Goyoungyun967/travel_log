import { useState } from "react";

const SellerJoin = () => {
  const [seller, setSeller] = useState({
    businessNo: "",
    representativeName: "",
    sellerPhone: "",
    bankName: "",
    acountName: "",
    sellerPw: "",
    businessName: "",
  });

  console.log(seller);
  const changeSeller = (e) => {
    const name = e.target.name;
    setSeller({ ...seller, [name]: e.target.value });
  };
  const [sellerPwRe, setSellerPwRe] = useState("");
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
          type="text"
          name="sellerPhone"
          id="sellerPhone"
          value={seller.sellerPhone}
          onChange={changeSeller}
        ></input>
      </div>
      <div className="join-wrap">
        <label htmlFor="bankName">은행명 : </label>
      </div>
      <div className="input-item">
        <input
          type="text"
          name="bankName"
          id="bankName"
          value={seller.bankName}
          onChange={changeSeller}
        ></input>
      </div>
      <div className="join-wrap">
        <label htmlFor="accountNumber">계좌번호 </label>
      </div>
      <div className="input-item">
        <input
          type="text"
          name="accountNumber"
          id="accountNumber"
          value={seller.accountNumber}
          onChange={changeSeller}
        ></input>
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
