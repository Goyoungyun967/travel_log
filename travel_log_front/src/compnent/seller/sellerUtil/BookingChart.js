import { useEffect } from "react";
import { sellerLoginNoState } from "../../utils/RecoilData";
import { useRecoilState } from "recoil";

const BookingChart = () => {
  const [loginNo, setLoginNo] = useRecoilState(sellerLoginNoState);
  useEffect(() => {}, [loginNo]);
  return (
    <>
      <div></div>
    </>
  );
};

export default BookingChart;
