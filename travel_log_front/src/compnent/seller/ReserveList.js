import { computeSlots } from "@mui/x-data-grid/internals";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SellerReserveList } from "./sellerUtil/RowList";
import { useRecoilState } from "recoil";
import { sellerLoginNoState } from "../utils/RecoilData";

const ReserveList = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [reserveList, setReserveList] = useState([]);
  const [loginNo, setLoginNo] = useRecoilState(sellerLoginNoState); // 리코일에서 판매자 번호 줍줍
  useEffect(() => {
    axios
      .get(`${backServer}/seller/reserveList`)
      .then((res) => {
        console.log(res);
        setReserveList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="seller-reserve-box-wrap">
        <h3>예약 조회</h3>
        <SellerReserveList list={reserveList} />
      </div>
    </>
  );
};
export default ReserveList;
