import BoardDate from "./BoardDate";
import BoardMap from "./map/BoardMap";
import { useRef, useState } from "react";

const AccompanyFrm = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const loginNo = props.loginNo;
  const boardTitle = props.boardTitle;
  const setBoardTitle = props.setBoardTitle;
  const thumbnail = props.thumbnail;
  const setThumbnail = props.setThumbnail;
  const boardFile = props.boardFile;
  const setBoardFile = props.setBoardFile;
  //수정인 경우에 추가로 전송되는 데이터
  const boardThumb = props.boardThumb;
  const setBoardThumb = props.setBoardThumb;
  const fileList = props.fileList;
  const setFileList = props.setFileList;
  //날짜

  const setEndDate = props.setEndDate;
  const setStartDate = props.setStartDate;
  //날짜 변환
  const startDate = new Date(props.startDate); // props로부터 startDate 받기
  const endDate = new Date(startDate); // endDate를 startDate로 초기화

  // endDate를 1일로 설정
  endDate.setDate(startDate.getDate() + 1); // 1일 추가

  // 날짜를 YYYY-MM-DD 형식으로 변환
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  console.log("Start Date:", formattedStartDate);
  console.log("End Date:", formattedEndDate);

  //타입
  const accompanyType = props.accompanyType;
  const setAccompanyType = props.setAccompanyType;

  const selectedType = props.selectedType;
  const setSelectedType = props.setSelectedType;
  const handleTypeChange = (tagNo) => {
    setSelectedType((prev) => {
      if (prev.includes(tagNo)) {
        return prev.filter((type) => type !== tagNo);
      } else {
        return [...prev, tagNo];
      }
    });
  };

  //지역
  const boardArea = props.boardArea;
  const setBoardArea = props.setBoardArea;
  //지역 셀렛
  const selectedArea = props.selectedArea;
  const setSelectedArea = props.setSelectedArea;

  const delBoardFileNo = props.delBoardFileNo;
  const setDelBoardFileNo = props.setDelBoardFileNo;

  const thumbnailRef = useRef(null);
  //썸네일 미리보기용 state(데이터 전송을 안할꺼임)
  const [boardImg, setBoardImg] = useState(null);
  //썸네일 이미지 첨부파일이 변경되면 동작할 함수
  //지역 선택

  const handleChange = (event) => {
    setSelectedArea(event.target.value);
    console.log(selectedArea);
  };
  //-------------------------------------------
  const changeThumbnail = (e) => {
    //요소들이 겹쳐있는 상태에서 해당 요소를 선택할때는 currentTarget(target을 사용하면 여러요소가 한번에 작용)

    const files = e.currentTarget.files;

    if (files.length !== 0 && files[0] !== 0) {
      //썸네일 파일 객체를 글작성 시 전송하기 위해 값 저장
      setThumbnail(files[0]);
      //화면에 썸네일 미리보기
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setBoardImg(reader.result);
        console.log();
      };
    } else {
      setThumbnail(null);
      setBoardImg(null);
    }
  };
  //첨부 파일 추가
  //첨부파일 화면에 띄 울 State
  const [showBoardFile, setShowBoardFile] = useState([]);
  //첨부파일 추가시 동작할 함수
  const addBoardFile = (e) => {
    const files = e.currentTarget.files;
    const fileArr = new Array(); //글작성 시 전송할 파일 배열
    const filenameArr = new Array(); // 화면에 노출시킬 파일 이름 배열
    //배열 아님
    for (let i = 0; i < files.length; i++) {
      fileArr.push(files[i]);
      filenameArr.push(files[i].name);
    }
    setBoardFile([...boardFile, ...fileArr]);
    setShowBoardFile([...showBoardFile, ...filenameArr]);
  };
  console.log(boardThumb);
  console.log(boardFile);
  console.log(showBoardFile);
  return (
    <div>
      <div className="board-info-wrap">
        <table className="board-tbl">
          <tbody>
            <tr>
              <th style={{ width: "20%" }}>
                <label htmlFor="boardTitle">제목</label>
              </th>
              <td>
                <div className="board-input-item">
                  <input
                    type="text"
                    id="boardTitle"
                    name="boardTitle"
                    value={boardTitle}
                    onChange={setBoardTitle}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="boardTitle">Thumbnail</label>
              </th>
              <td>
                <div className="board-thumb-wrap">
                  {boardImg ? (
                    <img
                      src={boardImg}
                      onClick={() => {
                        thumbnailRef.current.click();
                      }}
                    />
                  ) : boardThumb ? (
                    <img
                      src={`${backServer}/board/thumb/${boardThumb}`}
                      onClick={() => {
                        thumbnailRef.current.click();
                      }}
                    />
                  ) : (
                    <img
                      src="/image/board_default_img.png"
                      onClick={() => {
                        thumbnailRef.current.click();
                      }}
                    ></img>
                  )}
                  <input
                    ref={thumbnailRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={changeThumbnail}
                  ></input>
                </div>
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="area-select">지역 선택</label>
              </th>
              <td>
                <select
                  id="area-select"
                  value={selectedArea}
                  onChange={handleChange}
                >
                  <option value="">-- 선택하세요 --</option>
                  {boardArea.map((area, index) => (
                    <option key={index} value={area.title}>
                      {area.title}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="boardFile">첨부파일</label>
              </th>
              <td className="left">
                <label htmlFor="boardFile" className="btn-primary sm">
                  파일 첨부
                </label>
                <input
                  type="file"
                  id="boardFile"
                  style={{ display: "none" }}
                  onChange={addBoardFile}
                  multiple
                />
              </td>
            </tr>
            <tr>
              <th>첨부파일 목록</th>
              <td>
                <div className="board-file-wrap">
                  {fileList
                    ? fileList.map((boardFile, i) => {
                        const deleteFile = () => {
                          const newFileList = fileList.filter((item) => {
                            return item !== boardFile;
                          });
                          setFileList(newFileList); //화면에 반영
                          //컨트롤러로 전송하기 위해 배열 추가
                          setDelBoardFileNo([
                            ...delBoardFileNo,
                            boardFile.boardFileNo,
                          ]);
                        };
                        return (
                          <p key={"oldFile-" + i}>
                            <span className="filename">
                              {boardFile.filename}
                            </span>
                            <span
                              className="material-icons del-file-icon"
                              onClick={deleteFile}
                            >
                              delete
                            </span>
                          </p>
                        );
                      })
                    : ""}
                  {showBoardFile.map((filename, i) => {
                    const deleteFile = () => {
                      boardFile.splice(i, 1);
                      setBoardFile([...boardFile]);
                      showBoardFile.splice(i, 1);
                      setShowBoardFile([...showBoardFile]);
                    };
                    return (
                      <p key={"newFile-" + i}>
                        <span className="filename">{filename}</span>
                        <span
                          className="material-icons del-file-icon"
                          onClick={deleteFile}
                        >
                          delete
                        </span>
                      </p>
                    );
                  })}
                </div>
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="accompanyType">동행유형</label>
              </th>
              <td>
                <div className="accompany-type-checkboxes">
                  {accompanyType.map((type) => (
                    <div key={type.accompany_tag_no}>
                      <input
                        type="checkbox"
                        id={`type-${type.accompany_tag_no}`}
                        checked={selectedType.includes(type.accompany_tag_no)}
                        onChange={() => handleTypeChange(type.accompany_tag_no)}
                      />
                      <label htmlFor={`type-${type.accompany_tag_no}`}>
                        {type.accompany_type} ({type.accompany_tag_no})
                      </label>
                    </div>
                  ))}
                </div>
              </td>
            </tr>
            <tr>
              <th>
                <div className="accompany-date-title">여행 날짜</div>
              </th>
              <td>
                <BoardDate
                  startDate={startDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                  setStartDate={setStartDate}
                />
              </td>
            </tr>
            <tr>
              <th>
                <div className="accompany-map">동행 지도</div>
              </th>
              <td>
                <BoardMap />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AccompanyFrm;
