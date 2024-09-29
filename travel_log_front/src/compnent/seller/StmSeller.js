import { RowList } from "./sellerUtil/RowList";
import "./css/seller_stm.css";
import SellerChart from "./sellerUtil/SellerChart";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchDate from "./sellerUtil/SearchDate";
import "./css/component_css.css";

const StmSeller = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [stmInfo, setStmInfo] = useState([]);
  console.log("stmInfo - ", stmInfo);

  const [startDate, setStartDate] = useState(); // 날짜 선택해서 search할 때, 찾기 시작할 날
  const [endDate, setEndDate] = useState(new Date()); // 날짜 선택해서 search할 때, 마지막 날
  const [search, setSearch] = useState(false);
  console.log("search 0 - ", search);

  useEffect(() => {
    const form = new FormData();
    form.append("sellerNo", 1);
    console.log(startDate);
    axios
      .post(`${backServer}/seller/stm`, form) // *** 리코일 만들어지면 post로 판매자 번호 보내기 (개인정보라서 post로 조회)
      .then((res) => {
        console.log("r", res);
        setStmInfo(res.data);

        // 날짜 배열 만들기
        const dateArray = res.data.map((item) => item.stmDate);
        // 가장 작은 날짜 찾기
        if (dateArray.length > 0) {
          const minDate = dateArray.reduce(
            (min, date) => (new Date(date) < new Date(min) ? date : min),
            dateArray[0]
          );
          setStartDate(minDate);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSearch(false); // API 호출 후 search를 false로 설정
      });
  }, []);

  const searchDate = () => {
    // 조회해온 날짜는 String이므로 날짜로 바꾸어야함
    const validStartDate =
      startDate instanceof Date ? startDate : new Date(startDate);
    const validEndDate = endDate instanceof Date ? endDate : new Date(endDate);
    const sDate = formatDate(validStartDate);
    const eDate = formatDate(validEndDate);

    // 값 묶어서 보내기
    const form = new FormData();
    form.append("sellerNo", 1); // *** 리코일 만들어지면 post로 판매자 번호 보내기 (개인정보라서 post로 조회)
    form.append("startDate", sDate);
    form.append("endDate", eDate);

    //
    axios
      .post(`${backServer}/seller/searchDate`, form)
      .then((res) => {
        console.log(res);
        setStmInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="stm-box-wrap">
      <h3>매출 정보</h3>
      <SellerChart stmInfo={stmInfo} />
      <div className="search-date">
        <SearchDate
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          setSearch={setSearch}
        />
        <button
          className="search-btn"
          type="button"
          onClick={() => {
            searchDate();
          }}
        >
          찾기
        </button>
      </div>
      <RowList stmInfo={stmInfo} />
    </div>
  );
};

// 날짜 다듬기
const formatDate = (date) => {
  const year = String(date.getFullYear()).slice(2); // 4자리 연도에서 마지막 2자리 추출
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
  const day = String(date.getDate()).padStart(2, "0"); // 날짜

  return `${year}/${month}/${day}`;
};

export default StmSeller;
