import { SellerInqList } from "./sellerUtil/RowList";
import "./css/seller_inqList.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { sellerLoginNoState } from "../utils/RecoilData";

const InqList = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [inqList, setInqList] = useState([]);
  const [loginNo, setLoginNo] = useRecoilState(sellerLoginNoState);
  useEffect(() => {
    axios
      .post(`${backServer}/seller/inqList`, null, {
        params: { loginNo: loginNo },
      })
      .then((res) => {
        setInqList(res.data);
      })
      .catch((err) => {});
  }, [loginNo]);
  return (
    <>
      <div className="seller-inq-box-wrap">
        {inqList.length !== 0 ? (
          <>
            <h3>내가 쓴 문의 조회</h3>
            <div className="inq-btn-wrap">
              <Link to={`/inquiryWrite`} className="inqBtnInsert">
                문의 하기
              </Link>
            </div>
            <SellerInqList inqList={inqList} />
          </>
        ) : (
          <>
            <div>
              <p>등록된 문의가 없습니다. 등록하시겠습니까?</p>
              <Link to={`/inquiryWrite`} className="no-inq-list">
                문의 하기
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default InqList;
