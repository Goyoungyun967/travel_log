const PayMentUserInfo = () => {
  return (
    <ul>
      <li className="text-paymentName-info">
        <span>대표 투수객 정보 입력</span>
      </li>
      <li>
        <label htmlFor="paymentName">이름</label>
      </li>
      <li>
        <input type="text" className="payment-input" id="paymentName" />
      </li>
      <li>
        <label htmlFor="paymentPhone">전화번호</label>
      </li>
      <li>
        <input type="text" className="payment-input" id="paymentPhone" />
      </li>
      <li>
        <label htmlFor="paymentEmail">이메일</label>
      </li>
      <li>
        <input
          type="text"
          className="payment-input"
          id="paymentEmail"
          readOnly
        />
      </li>
      <li>
        <label>요청사항</label>
      </li>
      <li>
        <textarea className="payment-textarea" maxLength={100} />
      </li>
    </ul>
  );
};
export default PayMentUserInfo;
