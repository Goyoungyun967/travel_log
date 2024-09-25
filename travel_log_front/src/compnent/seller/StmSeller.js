import RowList from "./sellerUtil/RowList";
import "./css/seller_stm.css";
import SellerChart from "./sellerUtil/SellerChart";

const StmSeller = () => {
  return (
    <div className="stm-box-wrap">
      <h3>매출 정보</h3>
      <SellerChart />
      <RowList />
    </div>
  );
};

export default StmSeller;
