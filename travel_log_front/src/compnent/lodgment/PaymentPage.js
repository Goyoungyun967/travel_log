import "./css/paymentPage.css";
import LodgmentDetailMapPayment from "./LodgmentDetailMapPayment";

import LodgmentLoomDetail from "./LodgmentLoomDetail";
import PayMentUserInfo from "./PaymentUserInfo";

const PaymentPage = () => {
  return (
    <section className="section">
      <div className="lodgment-payment-info-wrap">
        <div className="lodgment-payment-img">
          <img src="/image/nesthotel.jpg" text="임시사진" />
        </div>
        <div className="lodgment-payment-detail-wrap">
          <table className="lodgment-payment-detail">
            <tbody>
              <tr style={{ height: "50px" }}>
                <td width={"100%"}>업체명</td>
              </tr>
              <tr style={{ height: "50px" }}>
                <td>00월 00일 00월 00일</td>
              </tr>
              <tr>
                <td>
                  <LodgmentDetailMapPayment />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="lodgment-payment-info">
        <LodgmentLoomDetail />
      </div>
      <div className="payment-user-info-wrap">
        <PayMentUserInfo />
      </div>
      <div>약관동의 결제하기</div>
    </section>
  );
};
export default PaymentPage;
