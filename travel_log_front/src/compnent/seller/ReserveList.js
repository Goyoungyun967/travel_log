import { computeSlots } from "@mui/x-data-grid/internals";
import axios from "axios";
import "./css/reserve.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SellerReserveList } from "./sellerUtil/RowList";
import { useRecoilState } from "recoil";
import { sellerLoginNoState } from "../utils/RecoilData";
import BookingChart from "./sellerUtil/BookingChart";

const ReserveList = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [reserveList, setReserveList] = useState([]);
  const [loginNo, setLoginNo] = useRecoilState(sellerLoginNoState); // 리코일에서 판매자 번호 줍줍
  useEffect(() => {
    axios
      .post(`${backServer}/seller/reserveList`, null, {
        params: { loginNo: loginNo },
      })
      .then((res) => {
        setReserveList(res.data);
      })
      .catch((err) => {});
  }, [loginNo]);
  return (
    <>
      <div className="seller-reserve-box-wrap">
        {reserveList.length !== 0 ? (
          <>
            <h3>예약 조회</h3>
            <SellerReserveList list={reserveList} />
          </>
        ) : (
          <>
            <p className="no-reserve">조회된 예약내역이 없습니다.</p>
          </>
        )}
      </div>
    </>
  );
};
export default ReserveList;
