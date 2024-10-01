import { computeSlots } from "@mui/x-data-grid/internals";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SellerReserveList } from "./sellerUtil/RowList";

const ReserveList = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [reserveList, setReserveList] = useState([]);

  useEffect(() => {
    axios
      .post(`${backServer}/seller/reserveList/1`) // *** 일단 임시로 1 넣어서 보냄
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
