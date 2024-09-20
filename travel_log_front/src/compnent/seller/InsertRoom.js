import { useEffect, useState } from "react";
import "./css/insert_room.css";
import axios from "axios";
import UqillEditor from "../utils/UqillEditor";
const InsertRoom = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  // 호텔 정보를 위한 state
  const [lodgmentList, setLodgmentList] = useState({});

  // 공지사항
  const [boardContent, setBoardContent] = useState(
    "<h2>객실 공지사항</h2><p><br></p><p><br></p><h2>객실 정보</h2><p><br></p><p><br></p><h2>조식 정보</h2><h5><br></h5>"
  );
  // 상품 수
  const [roomNum, setRoomNum] = useState(0);
  // 객실 가격
  const [roomPrice, setRoomPrice] = useState(0);

  useEffect(() => {
    axios
      .get(`${backServer}/seller/lodgmentInfo/808`) // *** 임시로 숙소 번호 1로 넣어둠
      .then((res) => {
        console.log(res);
        setLodgmentList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(lodgmentList);
  return (
    <>
      <div className="contanier">
        <form>
          <div className="room_box-wrap room_box-radius">
            <div className="room_box">
              <div className="hotel_info">
                <div className="image">
                  <img
                    src={
                      lodgmentList.lodgmentImgPath
                        ? `${backServer}/seller/lodgment/${lodgmentList.lodgmentImgPath}`
                        : "/image/lodgment_default_img.png"
                    }
                  />
                </div>
                <div className="lod_title">
                  <h2>{lodgmentList.lodgmentName}</h2>
                  <br />
                  <h3>{lodgmentList.lodgmentAddr}</h3>
                  <h4>{lodgmentList.lodgmentStarGrade} 성급</h4>
                </div>
              </div>
            </div>
            <div className="room_box">
              <h5>사진은 최대 5개만 등록 가능합니다.</h5>
              <div className="photo_add">
                <div className="photo">
                  <FileInfo />
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
                      <input
                        type="number"
                        min={0}
                        max={1000}
                        value={roomNum === 0 ? "" : roomNum}
                        onChange={(e) => setRoomNum(Number(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="input-item">
                    <div className="input-title">
                      <label htmlFor="#">상품 가격</label>
                    </div>
                    <div className="input room_price">
                      <input
                        type="number"
                        min={0}
                        max={10000000000}
                        value={roomPrice === 0 ? "" : roomPrice}
                        onChange={(e) => setRoomPrice(Number(e.target.value))}
                      />
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
                    <h3>공지사항</h3>
                    <div className="editor">
                      <UqillEditor
                        boardContent={boardContent}
                        setBoardContent={setBoardContent}
                      />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn primary">
                  등록 완료
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

const FileInfo = (props) => {
  return <input type="file" multiple />;
};

export default InsertRoom;
