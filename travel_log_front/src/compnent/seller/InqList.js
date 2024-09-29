import { SellerInqList } from "./sellerUtil/RowList";
import "./css/seller_inqList.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const InqList = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [inqList, setInqList] = useState([]);
  useEffect(() => {
    const form = new FormData();
    form.append("sellerNo", 1);
    axios
      .post(`${backServer}/seller/inqList`, form)
      .then((res) => {
        console.log(res);
        setInqList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="seller-inq-box-wrap">
        <h3>문의 정보</h3>
        <div className="inq-btn-wrap">
          <Link to={`/seller/inq`} className="inq-btn">
            문의 하기
          </Link>
        </div>
        <SellerInqList inqList={inqList} />
      </div>
    </>
  );
};

export default InqList;
