import { useEffect, useState } from "react";
import "./css/insert_room.css";
import axios from "axios";
const InsertRoom = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [lodgmentList, setLodgmentList] = useState([]);
  useEffect(() => {
    axios
      .get(`${backServer}/seller/list/1`) // *** 임시로 판매자 번호 1로 넣어둠
      .then((res) => {
        console.log(res);
        setLodgmentList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="contanier">
        <form>
          <div className="room_box-wrap room_box-radius">
            <div className="room_box">
              <div className="hotel_info">
                <div className="image">
                  <img src="/img/hotel.jpg" alt="호텔 이미지" />
                </div>
                <div className="lod_title">
                  <h2>00 호텔</h2>
                  <br />
                  <h3>대구광역시 성심시 튀소구 1004-1004</h3>
                  <h4>연락처 : 010-0000-0000</h4>
                </div>
              </div>
            </div>
            <div className="room_box">
              <h5>사진은 최대 5개만 등록 가능합니다.</h5>
              <div className="photo_add">
                <div className="photo">
                  <input type="file" />
                </div>
                <img src="/img/hotel.jpg" alt="" width="100px" />
                <img src="/img/hotel.jpg" alt="" width="100px" />
                <img src="/img/hotel.jpg" alt="" width="100px" />
                <img src="/img/hotel.jpg" alt="" width="100px" />
                <img src="/img/hotel.jpg" alt="" width="100px" />
              </div>
              <div className="room_info_add">
                <div className="input-wrap">
                  <div className="input-item">
                    <div className="input-title">
                      <label htmlFor="#">상품수</label>
                    </div>
                    <div className="input">
                      <input type="text" />
                    </div>
                  </div>
                  <div className="input-item">
                    <div className="input-title">
                      <label htmlFor="#">상품 가격</label>
                    </div>
                    <div className="input">
                      <input type="text" />
                    </div>
                  </div>
                  <div className="hash-tag">
                    <h3>#해시태그</h3>
                    <div className="tag">
                      <input type="button" value="사우나" />
                      <input type="button" value="수영장" />
                      <input type="button" value="레스토랑" />
                      <input type="button" value="객실스파" />
                      <input type="button" value="애견동반" />
                      <input type="button" value="욕실용품" />
                      <input type="button" value="탈수기" />
                      <input type="button" value="건조기" />
                      <input type="button" value="매점" />
                      <input type="button" value="주차장" />
                      <input type="button" value="와이파이" />
                      <input type="button" value="TV" />
                    </div>
                  </div>
                  <div className="box box-notice">
                    <h5>공지사항</h5>
                    <div className="toast">토스트 에디터 들어갈 자리</div>
                  </div>
                </div>
                <button type="submit" className="btn primary">
                  수정 완료
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default InsertRoom;
