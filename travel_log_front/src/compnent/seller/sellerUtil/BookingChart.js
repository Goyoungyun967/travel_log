import { useEffect, useState } from "react";
import axios from "axios";

const BookingChart = (props) => {
  const loginNo = props.sellerLoginNo;
  const [bookingChart, setBookingChart] = useState({});

  const backServer = process.env.REACT_APP_BACK_SERVER;
  useEffect(() => {
    if (loginNo !== -1) {
      axios
        .get(`${backServer}/seller/bookingInfo/${loginNo}`)
        .then((res) => {
          setBookingChart(res.data);
        })
        .catch((err) => {});
    }
  }, [loginNo]);

  return (
    <>
      <div></div>
    </>
  );
};

export default BookingChart;
