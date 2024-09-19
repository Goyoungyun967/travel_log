import { Link } from "react-router-dom";

const Select = () => {
  return (
    <div className="select">
      <Link to="memberJoin" className="general-member">
        일반회원
      </Link>
      <Link to="sellerJoin" className="seller-member">
        판매자 회원
      </Link>
    </div>
  );
};

export default Select;
