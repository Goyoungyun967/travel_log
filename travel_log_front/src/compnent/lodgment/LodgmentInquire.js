import { useState } from "react";

const LodgmentInquire = () => {
  const [openInquire, setOpenInquire] = useState(false);
  return (
    <div className="lodgmnet-inquire-wrap">
      <div className="lodgment-inquire-btn-wrap">
        <button className="lodgment-inquire-btn" onClick={() => {}}>
          문의하기
        </button>
      </div>
    </div>
  );
};
export default LodgmentInquire;
