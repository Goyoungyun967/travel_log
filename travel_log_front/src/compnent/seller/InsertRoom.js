import { useEffect, useState } from "react";
import "./css/insert_room.css";
import axios from "axios";
import UqillEditor from "../utils/UqillEditor";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const InsertRoom = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const params = useParams();
  const lodgmentNo = params.lodgmentNo;
  // 호텔 정보를 위한 state
  const [lodgmentList, setLodgmentList] = useState({});
  // 객실 이름
  const [roomName, setRoomName] = useState("");
  console.log("roomName-", roomName);
  // 상품 수
  const [roomNum, setRoomNum] = useState(0);
  console.log("roomNum-", roomNum);
  // 객실 가격
  const [roomPrice, setRoomPrice] = useState(0);
  console.log("roomPrice-", roomPrice);
  // 공지사항
  const [boardContent, setBoardContent] = useState(
    "<h2>객실 공지사항</h2><p><br></p><p><br></p><h2>객실 정보</h2><p><br></p><p><br></p><h2>조식 정보</h2><h5><br></h5>"
  );
  console.log("boardContent-", boardContent);
  // 첨부파일 (배열[])
  const [roomFile, setRoomFile] = useState([]);
  console.log("roomFile-", roomFile);
  // 해시태그
  const [hashTag, setHashTag] = useState([]);
  console.log("hashTag-", hashTag);
  // 최대인원수
  const [maxCapa, setMaxCapa] = useState(0);
  console.log("maxPaca-", maxCapa);

  console.log(
    "숙소 번호 - ",
    lodgmentNo,
    "상품 이름 - ",
    roomName,
    "상품 수 - ",
    roomNum,
    "객실 가격 - ",
    roomPrice,
    "해시태그 - ",
    hashTag,
    "최대인원 수 - ",
    maxCapa
  );

  useEffect(() => {
    axios
      .get(`${backServer}/seller/lodgmentInfo/${lodgmentNo}`)
      .then((res) => {
        console.log(res);
        setLodgmentList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(lodgmentList);

  // 보내기
  const writeRoom = () => {
    const backServer = process.env.REACT_APP_BACK_SERVER;
    // 모든 필드의 입력값 확인
    if (!roomName) {
      alert("숙소명을 입력해 주세요.");
      return;
    }
    if (!maxCapa) {
      alert("최대 인원을 입력해 주세요.");
      return;
    }
    if (!roomNum) {
      alert("상품 수 를 입력해 주세요.");
      return;
    }
    if (!roomPrice) {
      alert("상품 가격을 입력해 주세요.");
      return;
    }
    if (!boardContent) {
      alert("내용을 입력해 주세요.");
      return;
    }
    if (boardContent.length > 1000) {
      alert("내용은 1000자 이내로 입력해 주세요.");
      return;
    }

    if (
      roomName !== "" &&
      roomNum !== 0 &&
      roomPrice !== 0 &&
      boardContent !== "" &&
      maxCapa !== 0
    ) {
      const form = new FormData();
      form.append("lodgmentNo", lodgmentNo);
      form.append("roomQua", roomNum);
      form.append("roomName", roomName);
      form.append("roomPrice", roomPrice);
      form.append("roomInfo", boardContent);
      form.append("roomMaxCapacity", maxCapa);
      // 첨부파일 추가한 경우에만 추가(첨부파일은 여러개가 같은  name으로 전송)
      for (let i = 0; i < roomFile.length; i++) {
        form.append("roomFile", roomFile[i]);
      }
      for (let i = 0; i < hashTag.length; i++) {
        form.append("serviceTag", hashTag[i]);
      }
      axios
        .post(`${backServer}/seller/insertRoom`, form, {
          headers: {
            contentType: "multipart/form-data",
            processData: false,
          },
        })
        .then((res) => {
          console.log("res-", res);
          if (res.data) {
            navigate(`/seller/lodgmentView/${lodgmentNo}`);
            console.log(form);
          } else {
            Swal.fire({
              title: "에러가 발생했습니다.",
              text: "원인을 찾으세요",
              icon: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          writeRoom();
        }}
      >
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
                <p>{lodgmentList.lodgmentAddr}</p>
                <span>{lodgmentList.lodgmentStarGrade} 성급</span>
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
                <div className="input-fr-wrap">
                  <HashTap setHashTag={setHashTag} />
                  <div className="input-sc-wrap">
                    <div className="input-item">
                      <div className="input-title">
                        <label htmlFor="roomName">객실 이름</label>
                      </div>
                      <div className="input room_name">
                        <input
                          type="text"
                          id="roomName"
                          value={roomName}
                          // 여기서 숫자 검사
                          onChange={(e) => setRoomName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="input-item">
                      <div className="input-title">
                        <label htmlFor="maxCapacity">최대인원수</label>
                      </div>
                      <div className="input">
                        <input
                          type="number"
                          id="maxCapacity"
                          min={0}
                          max={100}
                          value={maxCapa === 0 ? "" : maxCapa}
                          onChange={(e) => setMaxCapa(Number(e.target.value))}
                        />
                      </div>
                    </div>
                    <div className="input-item">
                      <div className="input-title">
                        <label htmlFor="roomNum">상품수</label>
                      </div>
                      <div className="input">
                        <input
                          type="number"
                          id="roomNum"
                          min={0}
                          max={1000}
                          value={roomNum === 0 ? "" : roomNum}
                          onChange={(e) => setRoomNum(Number(e.target.value))}
                        />
                      </div>
                    </div>
                    <div className="input-item">
                      <div className="input-title">
                        <label htmlFor="roomPrice">상품 가격</label>
                      </div>
                      <div className="input room_price">
                        <input
                          type="number"
                          id="roomPrice"
                          min={0}
                          max={10000000000}
                          value={roomPrice === 0 ? "" : roomPrice}
                          onChange={(e) => setRoomPrice(Number(e.target.value))}
                        />
                      </div>
                    </div>
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
    </>
  );
};

// 첨부파일
const FileInfo = (props) => {
  // 보낼 첨부파일
  const roomFile = props.roomFile;
  const setRoomFile = props.setRoomFile;
  // 미리보기용 첨부 파일 (파일 전송 x)
  const [showRoomFile, setShowRoomFile] = useState([]);
  console.log("파일 - ", showRoomFile);

  // 파일 add
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
          setShowRoomFile((prev) => [...prev, { preview: reader.result }]); // 미리보기용
        };
        reader.readAsDataURL(files[i]);
      } else {
        setRoomFile((prev) => [...prev]);
      }
    }
    setRoomFile((prev) => [...prev, ...fileArr]);
  };

  // 파일 삭제
  const removeRoomFile = (index) => {
    setRoomFile((prev) => prev.filter((_, i) => i !== index));
    setShowRoomFile((prev) => prev.filter((_, i) => i !== index));
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
        {showRoomFile.map((file, i) => (
          <div className="photoArr" key={i}>
            <img src={file.preview} width="150px" alt="preview" />
            <span
              className="delete-icon"
              onClick={() => removeRoomFile(i)}
              role="button"
              aria-label="Remove"
            >
              ✖️
            </span>
          </div>
        ))}
      </div>
    </div>
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

export default InsertRoom;
