import RowList from "./sellerUtil/RowList";
import "./css/seller_stm.css";
import SellerChart from "./sellerUtil/SellerChart";
import { useEffect, useState } from "react";
import axios from "axios";

const StmSeller = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [stmInfo, setStmInfo] = useState([]);
  useEffect(() => {
    axios
      .post(`${backServer}/seller/stm/1`) // *** 리코일 만들어지면 post로 판매자 번호 보내기 (개인정보라서 post로 조회)
      .then((res) => {
        console.log(res);
        setStmInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="stm-box-wrap">
      <h3>매출 정보</h3>
      <SellerChart stmInfo={stmInfo} />
      <RowList stmInfo={stmInfo} />
    </div>
  );
};

export default StmSeller;
