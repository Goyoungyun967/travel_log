const PayMentUserInfo = (props) => {
  const guest = props.guest;
  const setGuest = props.setGuest;
  const changeInfo = (e) => {
    const name = e.target.name;
    setGuest({ ...guest, [name]: e.target.value });
  };
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
          name="gusetName"
          onChange={changeInfo}
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
          onChange={changeInfo}
        />
      </li>
      <li>
        <label>요청사항</label>
      </li>
      <li>
        <textarea
          className="payment-textarea"
          name="guestReq"
          onChange={changeInfo}
          maxLength={100}
        />
      </li>
    </ul>
  );
};
export default PayMentUserInfo;
