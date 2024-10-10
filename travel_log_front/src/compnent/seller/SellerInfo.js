import { useEffect, useState } from "react";
import "./css/seller_info.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { sellerLoginNoState } from "../utils/RecoilData";
const SellerInfo = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [loginNo, setLoginNo] = useRecoilState(sellerLoginNoState);
  const [sellerInfo, setSellerInfo] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${backServer}/seller/sellerInfo`)
      .then((res) => {
        setSellerInfo(res.data);
      })
      .catch((err) => {});
  }, [loginNo]);

  return (
    <div class="contanier seller-info">
      {sellerInfo !== null ? (
        <div class="box-wrap box-radius">
          <h3>판매자 정보</h3>
          <div class="seller-info">
            <div class="item-wrap">
              <div class="item">
                <h3>사업자명</h3>
                <span>{sellerInfo.businessName}</span>
              </div>
              <div class="item">
                <h3>사업자 번호</h3>
                <span>{sellerInfo.businessNo}</span>
              </div>
              <div class="item">
                <h3>전화 번호</h3>
                <span>{sellerInfo.sellerPhone}</span>
              </div>
              <div class="item">
                <h3>대표자</h3>
                <span>{sellerInfo.representativeName}</span>
              </div>
              <div class="item">
                <h3>은행 정보</h3>
                <div>
                  <p>{sellerInfo.bankName}</p>
                  <p>{sellerInfo.accountNumber}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
// 날짜 다듬기
const formatDate = (date) => {
  const year = String(date.getFullYear()).slice(2); // 4자리 연도에서 마지막 2자리 추출
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
  const day = String(date.getDate()).padStart(2, "0"); // 날짜

  return `${year}/${month}/${day}`;
};

export default SellerInfo;
