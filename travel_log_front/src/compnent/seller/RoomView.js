import { useEffect, useState } from "react";
import "./css/room_view.css";
import axios from "axios";

const RoomView = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [roomList, setRoomList] = useState([]);
  useEffect(() => {
    axios
      .get(`${backServer}/seller/roomView/1`) // *** 임시로 판매자 번호 1로 넣어둠
      .then((res) => {
        console.log(res);
        setRoomList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div class="seller-room-wrap">
        <h3>객실 정보</h3>
        <div class="hotel-info">
          <div class="image">
            <img src="/image/lodgment_default_img.png" />
          </div>
          <div class="room-item-wrap">
            <div class="room-item">
              <h5>숙소명</h5>
              <span>부산 호텔</span>
            </div>
            <div class="room-item">
              <h5>객실명</h5>
              <span>스탠다드</span>
            </div>
            <div class="room-item">
              <h5>1박 가격</h5>
              <span>1,000,000</span>
            </div>
            <div class="room-item">
              <h5>수량</h5>
              <span>3</span>
            </div>
            <div class="room-item">
              <h5>객실 최대 인원</h5>
              <span>3</span>
            </div>
            <div class="room-item">
              <h5>체크인 ~ 체크아웃</h5>
              <span>15:00 ~ 12:00</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// 해시태그
const HashTap = (props) => {
  const setHashTag = props.setHashTag;
  const inputCheckboxChange = (e) => {
    const value = Number(e.target.value);
    setHashTag((prevTags) =>
      e.target.checked
        ? [...prevTags, value]
        : prevTags.filter((tag) => tag !== value)
    );
  };
  return (
    <div className="hash-tag">
      <h3>#해시태그</h3>
      <div className="tag">
        <label className="checkbox-label">
          <input type="checkbox" value={1} onChange={inputCheckboxChange} />
          <span className="custom-checkbox">사우나</span>
        </label>
        <label className="checkbox-label">
          <input type="checkbox" value={2} onChange={inputCheckboxChange} />
          <span className="custom-checkbox">수영장</span>
        </label>
        <label className="checkbox-label">
          <input type="checkbox" value={3} onChange={inputCheckboxChange} />
          <span className="custom-checkbox">레스토랑</span>
        </label>
        <label className="checkbox-label">
          <input type="checkbox" value={4} onChange={inputCheckboxChange} />
          <span className="custom-checkbox">객실스파</span>
        </label>
        <label className="checkbox-label">
          <input type="checkbox" value={5} onChange={inputCheckboxChange} />
          <span className="custom-checkbox">애견동반</span>
        </label>
        <label className="checkbox-label">
          <input type="checkbox" value={6} onChange={inputCheckboxChange} />
          <span className="custom-checkbox">욕실용품</span>
        </label>
        <label className="checkbox-label">
          <input type="checkbox" value={7} onChange={inputCheckboxChange} />
          <span className="custom-checkbox">탈수기</span>
        </label>
        <label className="checkbox-label">
          <input type="checkbox" value={8} onChange={inputCheckboxChange} />
          <span className="custom-checkbox">건조기</span>
        </label>
        <label className="checkbox-label">
          <input type="checkbox" value={9} onChange={inputCheckboxChange} />
          <span className="custom-checkbox">매점</span>
        </label>
        <label className="checkbox-label">
          <input type="checkbox" value={10} onChange={inputCheckboxChange} />
          <span className="custom-checkbox">주차장</span>
        </label>
        <label className="checkbox-label">
          <input type="checkbox" value={11} onChange={inputCheckboxChange} />
          <span className="custom-checkbox">와이파이</span>
        </label>
        <label className="checkbox-label">
          <input type="checkbox" value={12} onChange={inputCheckboxChange} />
          <span className="custom-checkbox">TV</span>
        </label>
      </div>
    </div>
  );
};

export default RoomView;
