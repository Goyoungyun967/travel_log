import { format } from "date-fns";
import BoardMap from "./map/BoardMap";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko"; // 한국어 로케일
import { TextField } from "@mui/material";
import differenceInDays from "date-fns/differenceInDays";
import AccompanyDate from "./AccompanyDate";

const AccompanyFrm = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const loginNo = props.loginNo;
  const boardTitle = props.boardTitle;
  const setBoardTitle = props.setBoardTitle;
  const thumbnail = props.thumbnail;
  const setThumbnail = props.setThumbnail;
  const boardFile = props.boardFile;
  const setBoardFile = props.setBoardFile;

  const boardThumb = props.boardThumb;
  const setBoardThumb = props.setBoardThumb;
  const fileList = props.fileList;
  const setFileList = props.setFileList;

  const startDate = props.startDate;
  const setStartDate = props.setStartDate;
  const endDate = props.endDate;
  const setEndDate = props.setEndDate;

  const accompanyType = props.accompanyType;
  const setAccompanyType = props.setAccompanyType;

  const selectedType = props.selectedType;
  const setSelectedType = props.setSelectedType;

  //동행
  const accompanyContent = props.accompanyContent;
  const setAccompanyContent = props.setAccompanyContent;

  const accompanyArea = props.accompanyArea;
  const setAccompanyArea = props.setAccompanyArea;

  const handleTypeChange = (tagNo) => {
    setSelectedType((prev) => {
      if (prev.includes(tagNo)) {
        return prev.filter((type) => type !== tagNo);
      } else {
        return [...prev, tagNo];
      }
    });
  };

  const boardArea = props.boardArea;
  const setBoardArea = props.setBoardArea;

  const selectedArea = props.selectedArea;
  const setSelectedArea = props.setSelectedArea;

  const delBoardFileNo = props.delBoardFileNo;
  const setDelBoardFileNo = props.setDelBoardFileNo;

  const thumbnailRef = useRef(null);
  const [boardImg, setBoardImg] = useState(null);

  const handleChange = (event) => {
    setSelectedArea(event.target.value);
  };

  const changeThumbnail = (e) => {
    const files = e.currentTarget.files;
    if (files.length !== 0) {
      setThumbnail(files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setBoardImg(reader.result);
      };
    } else {
      setThumbnail(null);
      setBoardImg(null);
    }
  };

  const [showBoardFile, setShowBoardFile] = useState([]);

  const addBoardFile = (e) => {
    const files = e.currentTarget.files;
    const fileArr = [];
    const filenameArr = [];
    for (let i = 0; i < files.length; i++) {
      fileArr.push(files[i]);
      filenameArr.push(files[i].name);
    }
    setBoardFile([...boardFile, ...fileArr]);
    setShowBoardFile([...showBoardFile, ...filenameArr]);
  };

  const [clickCount, setClickCount] = useState(0); // 클릭 횟수 관리
  const [selectedDates, setSelectedDates] = useState({
    start: null,
    end: null,
  }); // 날짜 상태 관리
  const setDaysDifference = props.setDaysDifference;
  const daysDifference = props.daysDifference;
  const handleDateChange = (newValue) => {
    if (clickCount === 0) {
      setSelectedDates({ ...selectedDates, start: newValue });
      setStartDate(newValue);
    } else if (clickCount === 1) {
      setSelectedDates({ ...selectedDates, end: newValue });
      setEndDate(newValue);

      // 날짜 차이를 계산하여 저장
      const diff = differenceInDays(newValue, selectedDates.start);
      setDaysDifference(diff);
    }
    setClickCount((prevCount) => (prevCount + 1) % 2); // 두 번 클릭 후 다시 초기화
  };
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
                    />
                  )}
                  <input
                    ref={thumbnailRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={changeThumbnail}
                  />
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
                          setFileList(newFileList);
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
                <div className="accompany-date-title">여행 날짜</div>
              </th>
              <td>
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={ko}>
                  <DatePicker
                    label={clickCount === 0 ? "시작일자" : "종료일자"}
                    value={
                      clickCount === 0 ? selectedDates.start : selectedDates.end
                    }
                    onChange={handleDateChange}
                    inputFormat="yyyy년 MM월 dd일"
                    renderInput={(params) => <TextField {...params} />}
                    disableTextInput // 사용자 입력을 비활성화
                    minDate={new Date()}
                  />
                </LocalizationProvider>
                <p>
                  {selectedDates.start &&
                    `시작 날짜: ${format(selectedDates.start, "yyyy-MM-dd")}`}
                </p>
                <p>
                  {selectedDates.end &&
                    `종료 날짜: ${format(selectedDates.end, "yyyy-MM-dd")}`}
                </p>
                <p>{daysDifference > 0 && `여행 기간: ${daysDifference}일`}</p>
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
                <div className="accompany-map">동행 지도</div>
              </th>
              <td>
                <div className="accmpany-address"></div>
                <BoardMap
                  setAccompanyArea={setAccompanyArea}
                  accompanyArea={accompanyArea}
                />
              </td>
            </tr>
            <tr>
              <th>
                <div className="accompany--date-content-title">동행 일정</div>
              </th>
              <td>
                <AccompanyDate
                  accompanyContent={accompanyContent}
                  setAccompanyContent={setAccompanyContent}
                  daysDifference={daysDifference}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccompanyFrm;
