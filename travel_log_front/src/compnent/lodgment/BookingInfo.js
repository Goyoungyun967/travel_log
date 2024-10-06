import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const BookingInfo = () => {
  const { state } = useLocation();
  const backServer = process.env.REACT_APP_BACK_SERVER;
  //const bookNo = state.bookNo;
  const bookNo = 21;
  console.log("bookNo : " + bookNo);
  useEffect(() => {
    axios
      .get(`${backServer}/booking/${bookNo}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <>{bookNo}</>;
};
export default BookingInfo;
