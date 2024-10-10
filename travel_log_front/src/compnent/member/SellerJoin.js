import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SellerJoin = () => {
  const [seller, setSeller] = useState({
    businessNo: "",
    representativeName: "",
    sellerPhone: "",
    bankName: "",
    accountNumber: "",
    sellerPw: "",
    businessName: "",
  });

  const [idCheck, setIdCheck] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();

  const checkId = () => {
    const idReg = /^\d{10}$/;
    if (!idReg.test(seller.businessNo)) {
      setIdCheck(2);
    } else {
      axios
        .get(`${backServer}/seller/businessNo/${seller.businessNo}/check-id`)
        .then((res) => {
          if (res.data === 1) {
            setIdCheck(3);
          } else if (res.data === 0) {
            setIdCheck(1);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const validateBusinessNo = (businessNo) => {
    if (businessNo.length !== 10 || !/^\d{10}$/.test(businessNo)) {
      setIsValid(false);
      Swal.fire({
        title: "유효성 검사 실패",
        icon: "error",
        text: "사업자 번호는 10자리 숫자여야 합니다.",
      });
      return;
    }

    setLoading(true);
    const API_URL = `http://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=8N2YyKDuZXRkluMR8DCqPsnD92Xvt%2Bs8FFMCyyrdD3KL8KpspdZWZwYrd5WEYve%2BCmnsYmDmYWn8QNT0LH%2FjTQ%3D%3D`;
    const requestBody = { b_no: [businessNo] };

    axios
      .post(API_URL, requestBody)
      .then((res) => {
        if (res.data.data[0].b_stt_cd !== "") {
          setIsValid(true);
          Swal.fire({
            title: "일치합니다",
            icon: "success",
            text: "국세청에 등록된 사업자번호랑 일치합니다.",
          });
        } else {
          setIsValid(false);
          Swal.fire({
            title: "불일치합니다",
            icon: "warning",
            text: "국세청에 등록되어있는 사업자번호가 아닙니다.",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setError("서버 오류가 발생했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const changeSeller = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === "businessNo") {
      value = value.replace(/-/g, "");
    }

    if (name === "accountNumber") {
      value = value.replace(/-/g, "");
    }

    if (name === "sellerPhone") {
      if (value.replace(/[^0-9]/g, "").length > 13) {
        return; // 11글자를 초과하면 함수 종료
      }
      value = value
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/, "$1-$2-$3")
        .replace(/(-{1,2})$/, "");
    }

    setSeller({ ...seller, [name]: value });
  };

  const [sellerPwRe, setSellerPwRe] = useState("");
  const changeSellerPwRe = (e) => {
    setSellerPwRe(e.target.value);
  };

  const pwMessage = useRef(null);
  const checkPw = () => {
    pwMessage.current.classList.remove("valid");
    pwMessage.current.classList.remove("invalid");
    if (seller.sellerPw === sellerPwRe) {
      pwMessage.current.classList.add("valid");
      pwMessage.current.innerText = "비밀번호가 일치합니다.";
    } else {
      pwMessage.current.classList.add("invalid");
      pwMessage.current.innerText = "비밀번호가 일치하지 않습니다.";
    }
  };
  const sellerJoin = () => {
    if (!isValid) {
      Swal.fire({
        title: "인증 실패",
        icon: "warning",
        text: "사업자 번호가 인증되야합니다.",
      });
      return;
    }
    if (idCheck === 1 && pwMessage.current.classList.contains("valid")) {
      axios
        .post(`${backServer}/seller/sellerJoin`, seller)
        .then((res) => {
          console.log(res);
          navigate("/login");

          Swal.fire({
            title: " 가입 대기 ",
            icon: "warning",
            text: "검토 후 가입승인 하겠습니다 !",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <section className="join-content">
      <div className="seller-join">판매자회원가입</div>
      <div className="join-wrap">
        <label htmlFor="businessNo">사업자번호</label>
      </div>
      <div className="input-item">
        <div className="seller-input-group">
          <input
            className="business-input"
            type="text"
            name="businessNo"
            id="businessNo"
            value={seller.businessNo}
            onChange={changeSeller}
            disabled={isValid}
            onBlur={checkId}
          />
          <button
            type="button"
            className="buiness-check-btn"
            onClick={() => {
              if (!isValid) {
                validateBusinessNo(seller.businessNo);
              }
            }}
          >
            인증하기
          </button>
        </div>
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
        />
      </div>
      <div className="join-wrap">
        <label htmlFor="sellerPwRe" className="password-confirm">
          비밀번호 확인
        </label>
      </div>
      <div className="input-item ">
        <input
          type="password"
          name="sellerPwRe"
          id="sellerPwRe"
          value={sellerPwRe}
          onChange={changeSellerPwRe}
          onBlur={checkPw}
        />
      </div>
      <p className="pwCheck-msg" ref={pwMessage}></p>

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
        />
      </div>

      <div className="join-wrap">
        <label htmlFor="sellerPhone" className="phone-name">
          전화번호
        </label>
      </div>
      <div className="input-item">
        <input
          maxLength={13}
          className="seller-phone-zone"
          type="text"
          name="sellerPhone"
          id="sellerPhone"
          value={seller.sellerPhone}
          onChange={changeSeller}
        />
      </div>

      <div className="bank-system">
        <div className="seller-input-group">
          <div className="join-wrap">
            <label htmlFor="bankName" className="label-bank">
              은행명:
            </label>
            <select
              className="bank-zone select-bank"
              name="bankName"
              id="bankName"
              value={seller.bankName}
              onChange={changeSeller}
            >
              <option value="">은행을 선택하세요</option>
              <option value="신한은행">신한은행</option>
              <option value="국민은행">국민은행</option>
              <option value="우리은행">우리은행</option>
              <option value="농협은행">농협은행</option>
              <option value="하나은행">하나은행</option>
              <option value="기업은행">기업은행</option>
              <option value="KB국민은행">KB국민은행</option>
              <option value="카카오뱅크">카카오뱅크</option>
            </select>
          </div>
        </div>

        <div className="seller-input-group" style={{ marginTop: "10px" }}>
          <div className="join-wrap">
            <label htmlFor="accountNumber" className="account-num">
              계좌번호:
            </label>
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
        />
      </div>

      <button type="button" className="join-btn" onClick={sellerJoin}>
        회원가입 완료
      </button>
    </section>
  );
};

export default SellerJoin;
