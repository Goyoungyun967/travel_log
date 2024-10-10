import { useEffect, useState } from "react";
import axios from "axios";

const BookingChart = (props) => {
  const loginNo = props.sellerLoginNo;
  console.log("loginNoBooking", loginNo);
  const [bookingChart, setBookingChart] = useState({});
  console.log("bc", bookingChart);

  const backServer = process.env.REACT_APP_BACK_SERVER;
  useEffect(() => {
    if (loginNo !== -1) {
      axios
        .get(`${backServer}/seller/bookingInfo/${loginNo}`)
        .then((res) => {
          console.log("bookRes - ", res);
          setBookingChart(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loginNo]);

  return (
    <>
      <div></div>
    </>
  );
};

export default BookingChart;
