const PayMentUserInfo = (props) => {
  const valueChange = props.valueChange;

  return (
    <ul>
      <li className="text-paymentName-info">
        <span>대표 투수객 정보 입력</span>
      </li>
      <li>
        <label htmlFor="paymentName">이름</label>
      </li>
      <li>
        <input
          type="text"
          className="payment-input"
          id="paymentName"
          name="guestName"
          onChange={valueChange}
          placeholder="투수객 이름을 입력해주세요."
        />
      </li>
      <li>
        <label htmlFor="paymentPhone">전화번호</label>
      </li>
      <li>
        <input
          type="text"
          className="payment-input"
          id="paymentPhone"
          name="guestPhone"
          onChange={valueChange}
          placeholder="투수객 번호 입력해주세요."
          maxLength={13}
        />
      </li>
      <li>
        <label>요청사항</label>
      </li>
      <li>
        <textarea
          className="payment-textarea"
          name="guestRequest"
          onChange={valueChange}
          maxLength={100}
          placeholder="요청사항이 있으면 입력해주세요."
        />
      </li>
    </ul>
  );
};
export default PayMentUserInfo;
