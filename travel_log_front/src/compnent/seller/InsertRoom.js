import { useEffect, useState } from "react";
import "./css/insert_room.css";
import axios from "axios";
import UqillEditor from "../utils/UqillEditor";
const InsertRoom = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  // 호텔 정보를 위한 state
  const [lodgmentList, setLodgmentList] = useState({});
  // 상품 수
  const [roomNum, setRoomNum] = useState(0);
  // 객실 가격
  const [roomPrice, setRoomPrice] = useState(0);
  // 공지사항
  const [boardContent, setBoardContent] = useState(
    "<h2>객실 공지사항</h2><p><br></p><p><br></p><h2>객실 정보</h2><p><br></p><p><br></p><h2>조식 정보</h2><h5><br></h5>"
  );
  // 첨부파일 (배열[])
  const [roomFile, setRoomFile] = useState([]);

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
                <FileInfo roomFile={roomFile} setRoomFile={setRoomFile} />
              </div>
              <div className="room_info_add">
                <div className="inroom-input-wrap">
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
  // 보낼 첨부파일
  const roomFile = props.roomFile;
  const setRoomFile = props.setRoomFile;
  // 미리보기용 첨부 파일 (파일 전송 x)
  const [showRoomFile, setShowRoomFile] = useState([]);
  console.log("파일 - ", showRoomFile);
  const addRoomFile = (e) => {
    const files = e.currentTarget.files;
    const fileArr = new Array();
    const imgPrvArr = new Array();

    if (roomFile.length + files.length > 5) {
      alert("파일은 최대 5개까지 첨부할 수 있습니다.");
      return;
    }

    for (let i = 0; i < files.length; i++) {
      fileArr.push(files[i]);
      if (files[i].type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          imgPrvArr.push(reader.result);
          setShowRoomFile((prev) => [...prev, { preview: reader.result }]);
        };
        reader.readAsDataURL(files[i]);
      } else {
        setRoomFile((prev) => [...prev]);
      }
    }
    setRoomFile((prev) => [...prev, ...fileArr]);
    // setRoomFile([...roomFile, ...fileArr]); // File중첩시키기
    // setShowRoomFile([...showRoomFile, ...fileArr]); // Filename중첩시키기
  };
  return (
    <div className="photo">
      <label htmlFor="roomFile" className="addBtn">
        파일첨부
      </label>
      <div className="p_arr">
        <input
          type="file"
          id="roomFile"
          style={{ display: "none" }}
          onChange={addRoomFile}
          multiple
        />
        {showRoomFile.map((file, i) => {
          return (
            <>
              {file.preview ? (
                <img src={file.preview} width="100px" className="photoArr" />
              ) : (
                ""
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default InsertRoom;
