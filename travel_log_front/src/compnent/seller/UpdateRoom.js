import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { memberLevelState, sellerLoginNoState } from "../utils/RecoilData";
import axios from "axios";
import UqillEditor from "../utils/UqillEditor";
import Swal from "sweetalert2";

const UpdateRoom = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [loginNo, setLoginNo] = useRecoilState(sellerLoginNoState); // 판매자 번호
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState);
  const params = useParams();
  const lodgmentNo = params.lodgmentNo;
  const roomNo = params.roomNo; // 객실 번호

  // 조회해온 파일 목록을 화면에 보여주기 위한 state
  //const [fileList, setFileList] = useState([]);
  const [lodgmentList, setLodgmentList] = useState([]);
  // 객실 이름
  const [roomName, setRoomName] = useState("");
  // 상품 수
  const [roomNum, setRoomNum] = useState(0);
  // 객실 가격
  const [roomPrice, setRoomPrice] = useState(0);
  // 공지사항
  const [boardContent, setBoardContent] = useState("");
  // 첨부파일 (배열[])
  const [roomFile, setRoomFile] = useState([]);
  const [delRoomFileNo, setDelRoomFileNo] = useState([]); // 지울 파일 번호
  const [upFile, setUpFile] = useState([]); // 추가될 파일
  // 해시태그
  const [hashTag, setHashTag] = useState([]);
  // 최대인원수
  const [maxCapa, setMaxCapa] = useState(0);
  const [showImg, setShowImg] = useState([]);
  const [sellerNo, setSellerNo] = useState(0);

  // 기존 첨부파일을 삭제하면 삭제한 파일 번호를 저장할 배열
  //   const [delBoardFileNo, setDelBoardFileNo] = useState([]);

  // 객실 정보 들고 오기
  useEffect(() => {
    axios
      .get(`${backServer}/seller/roomView/${lodgmentNo}/${roomNo}`)
      .then((res) => {
        setLodgmentList(res.data);
        setRoomFile(res.data.room.fileList);
        setRoomName(res.data.room.roomName);
        setRoomNum(res.data.room.roomQua);
        setMaxCapa(res.data.room.roomMaxCapacity);
        setRoomPrice(res.data.room.roomPrice);
        setBoardContent(res.data.room.roomInfo);
        setHashTag(res.data.room.serviceTagList);
        setShowImg(res.data.room.fileList);
        setSellerNo(res.data.lodgment.sellerNo);
      })
      .catch((err) => {});
  }, []);

  const UpdateRoom = () => {
    const nameRegex = /^.{1,15}$/; // 객실 이름: 1자 이상 15자 이하로..!
    const numberRegex = /^[1-9][0-9]*$/; // 인원, 상품 수 : 1 이상의 숫자만 입력..!
    const contentRegex = /^.{1,1000}$/; // 공지사항: 1자 이상 1000자 이하..!
    // 모든 필드의 입력값 확인
    if (!nameRegex.test(roomName)) {
      Swal.fire({
        title: "객실명을 다시 입력해주세요",
        text: "1~15자 이하로 작성해주세요",
        icon: "error",
      });
      return;
    }

    if (!numberRegex.test(maxCapa)) {
      Swal.fire({
        title: "최대 인원을 다시 입력해주세요",
        icon: "error",
      });
      return;
    }

    if (!numberRegex.test(roomNum)) {
      Swal.fire({
        title: "상품 수를 다시 입력해주세요",
        icon: "error",
      });
      return;
    }

    if (!numberRegex.test(roomPrice)) {
      Swal.fire({
        title: "상품 가격을 다시 입력해주세요",
        icon: "error",
      });
      return;
    }

    if (!contentRegex.test(boardContent)) {
      Swal.fire({
        title: "공지사항을 다시 입력해주세요",
        icon: "error",
      });
      return;
    }

    const form = new FormData();
    form.append("lodgmentNo", lodgmentNo);
    form.append("roomNo", roomNo);
    form.append("roomQua", roomNum);
    form.append("roomName", roomName);
    form.append("roomPrice", roomPrice);
    form.append("roomInfo", boardContent);
    form.append("roomMaxCapacity", maxCapa);
    // 첨부파일 추가한 경우에만 추가(첨부파일은 여러개가 같은  name으로 전송)
    // 파일 추가
    upFile.forEach((file) => {
      form.append("roomFile", file); // roomFile 필드에 파일 추가
    });
    // for (let i = 0; i < roomFile.length; i++) {
    //   form.append("roomFile", upFile[i]);
    // }
    hashTag.forEach((tag) => form.append("serviceTag", tag.serviceTagNo)); // 해시태그 번호만 보내기
    for (let i = 0; i < delRoomFileNo.length; i++) {
      form.append("delRoomFileNo", delRoomFileNo[i]);
    }
    axios
      .patch(`${backServer}/seller/updateRoom`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          processData: false,
        },
      })
      .then((res) => {
        if (res.data) {
          navigate(`/seller/lodgmentView/${lodgmentNo}`);
        } else {
          Swal.fire({
            title: "에러가 발생했습니다.",
            text: "원인을 찾으세요",
            icon: "error",
          });
        }
      })
      .catch((err) => {});
  };

  return (
    <>
      {sellerNo === loginNo ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            UpdateRoom();
          }}
        >
          <div className="room_box-wrap room_box-radius">
            <div className="room_box">
              <h5>사진은 최대 5개만 등록 가능합니다.</h5>
              <div className="photo_add">
                <FileInfo
                  roomFile={roomFile}
                  setRoomFile={setRoomFile}
                  showImg={showImg}
                  setDelRoomFileNo={setDelRoomFileNo}
                  setUpFile={setUpFile}
                />
              </div>
              <div className="room_info_add">
                <div className="inroom-input-wrap">
                  <div className="input-fr-wrap">
                    <HashTap hashTag={hashTag} setHashTag={setHashTag} />
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
                            onChange={(e) =>
                              setRoomPrice(Number(e.target.value))
                            }
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
      ) : (
        "다시 로그인 해주세요"
      )}
    </>
  );
};

const FileInfo = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const roomFile = props.roomFile || [];
  const setRoomFile = props.setRoomFile;
  const setDelRoomFileNo = props.setDelRoomFileNo;
  const setUpFile = props.setUpFile;

  // showRoomFile 상태를 초기화
  const [showRoomFile, setShowRoomFile] = useState([]);

  // roomFile이 변경될 때마다 showRoomFile을 업데이트
  useEffect(() => {
    setShowRoomFile(
      roomFile.map((file) => ({
        preview: `${backServer}/seller/room/${file.roomImg}`,
        name: file.roomImg,
      }))
    );
  }, [roomFile]);

  // 파일 추가
  const addRoomFile = (e) => {
    const files = Array.from(e.currentTarget.files);
    const newFiles = [...roomFile];

    if (newFiles.length + files.length > 5) {
      alert("파일은 최대 5개까지 첨부할 수 있습니다.");
      return;
    }

    // 새 파일 목록을 먼저 처리한 후, 미리보기 배열 업데이트
    const newShowFiles = [...showRoomFile];

    files.forEach((file) => {
      const isDuplicate = newFiles.some(
        (existingFile) => existingFile.roomImg === file.name
      );

      if (!isDuplicate) {
        newFiles.push({ roomImg: file.name });
        setUpFile((prev) => [...prev, file]); // upFile에 파일 추가

        const reader = new FileReader();
        reader.onload = () => {
          newShowFiles.push({ preview: reader.result, name: file.name });
          // 상태 업데이트는 최종적으로 한 번만 호출
          setShowRoomFile(newShowFiles);
        };
        reader.readAsDataURL(file);
      } else {
        alert(`파일 "${file.name}"이(가) 이미 추가되어 있습니다.`);
      }
    });

    setRoomFile(newFiles); // roomFile 상태 업데이트
  };

  // 파일 삭제
  const removeRoomFile = (index) => {
    const updatedRoomFiles = roomFile.filter((_, i) => i !== index);
    setRoomFile(updatedRoomFiles);

    // showRoomFile 상태도 업데이트
    const updatedShowFiles = showRoomFile.filter((_, i) => i !== index);
    setShowRoomFile(updatedShowFiles);

    // 삭제된 파일 번호를 delRoomFileNo에 추가
    const removedFileNo = roomFile[index].roomFileNo; // 삭제할 파일 번호 가져오기
    setDelRoomFileNo((prev) => [...prev, removedFileNo]); // 삭제된 파일 번호 추가

    // upFile에서 삭제된 파일도 제거
    const removedFileName = roomFile[index].roomImg; // 삭제할 파일 이름 가져오기
    setUpFile((prev) => prev.filter((file) => file.name !== removedFileName));
  };

  return (
    <div className="photo">
      <label htmlFor="upFile" className="addBtn">
        파일첨부
      </label>
      <div className="p_arr">
        <input
          type="file"
          id="upFile"
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
  const hashTag = props.hashTag || []; // hashTag가 undefined일 경우 빈 배열로 초기화
  const setHashTag = props.setHashTag;

  // 서비스 태그
  const serviceTagList = [
    { serviceTagNo: 1, serviceTagType: "사우나" },
    { serviceTagNo: 2, serviceTagType: "수영장" },
    { serviceTagNo: 3, serviceTagType: "레스토랑" },
    { serviceTagNo: 4, serviceTagType: "객실스파" },
    { serviceTagNo: 5, serviceTagType: "애견동반" },
    { serviceTagNo: 6, serviceTagType: "욕실용품" },
    { serviceTagNo: 7, serviceTagType: "탈수기" },
    { serviceTagNo: 8, serviceTagType: "건조기" },
    { serviceTagNo: 9, serviceTagType: "매점" },
    { serviceTagNo: 10, serviceTagType: "주차장" },
    { serviceTagNo: 11, serviceTagType: "와이파이" },
    { serviceTagNo: 12, serviceTagType: "TV" },
  ];

  const inputCheckboxChange = (e) => {
    const value = Number(e.target.value);
    setHashTag((prevTags) =>
      e.target.checked
        ? [...prevTags, { serviceTagNo: value }]
        : prevTags.filter((tag) => tag.serviceTagNo !== value)
    );
  };

  return (
    <div className="hash-tag">
      <h3>#해시태그</h3>
      <div className="tag">
        {serviceTagList.map((tag) => (
          <label className="checkbox-label" key={tag.serviceTagNo}>
            <input
              type="checkbox"
              value={tag.serviceTagNo}
              name={tag.serviceTagType} // serviceTagType을 name으로 사용
              onChange={inputCheckboxChange}
              checked={hashTag.some((h) => h.serviceTagNo === tag.serviceTagNo)} // hashTag에 있는지 확인 후 체크
            />
            <span className="custom-checkbox">{tag.serviceTagType}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default UpdateRoom;
