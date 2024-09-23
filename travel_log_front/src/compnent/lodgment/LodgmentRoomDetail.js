const LodgmentRoomDetail = () => {
  return (
    <div className="lodgment-loom-type">
      <div>
        <table className="lodgment-loom-table">
          <tbody>
            <tr>
              <td width={"40%"}>
                <div className="lodgment-loom-type-img">
                  <img src="/image/nesthotel.jpg" text="임시사진" />
                </div>
              </td>
              <td width={"60%"}>
                <table>
                  <tbody>
                    <tr>방이름</tr>
                    <tr>체크아웃</tr>
                    <tr>기준 : 명</tr>
                    <tr>00월 00일 00월 00일</tr>
                    <tr>가격 : 0000원</tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LodgmentRoomDetail;
