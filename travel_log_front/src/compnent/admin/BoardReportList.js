import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Modal from "react-modal";
import { SettingsInputAntennaTwoTone } from "@mui/icons-material";
import PageNavi from "../utils/PageNavi";

const BoardReportList = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [boardList, setBoardList] = useState([]);
  const [type, setType] = useState(0);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  const [reportList, setReportList] = useState([]);
  const [reportModal, setReportModal] = useState(false);
  const [state, setState] = useState(false);
  const closeModal = () => {
    setReportModal(false);
    setReportList([]);
  };
  useEffect(() => {
    if (type === 0) {
      axios
        .get(`${backServer}/admin/board/report/list/${reqPage}`)
        .then((res) => {
          setBoardList(res.data.list);
          setPi(res.data.pi);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get(`${backServer}/admin/comment/report/list/${reqPage}`)
        .then((res) => {
          setBoardList(res.data.list);
          setPi(res.data.pi);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [reqPage, type, state]);
  return (
    <>
      <div className="admin-page-title">
        <h3>게시글 신고 처리</h3>
      </div>
      <div className="admin-search-box">
        <FormControl>
          <FormLabel id="type">항목</FormLabel>
          <RadioGroup
            row
            aria-labelledby="type"
            defaultValue={0}
            name="radio-buttons-group"
            onChange={(e) => {
              setType(Number(e.target.value));
              setReqPage(1);
            }}
          >
            <FormControlLabel value={0} control={<Radio />} label="게시글" />
            <FormControlLabel value={1} control={<Radio />} label="댓글" />
          </RadioGroup>
        </FormControl>
      </div>
      <BoardList
        boardList={boardList}
        setBoardList={setBoardList}
        reportList={reportList}
        setReportList={setReportList}
        type={type}
        setReportModal={setReportModal}
      />
      <Modal
        isOpen={reportModal}
        onRequestClose={closeModal}
        contentLabel="Report Modal"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "80%", // 모달의 크기 조정
            height: "80%",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)", // 모달 외부 배경 설정
          },
        }}
      >
        <ReportList
          reportList={reportList}
          setReportList={setReportList}
          type={type}
          state={state}
          setState={setState}
        />
      </Modal>
      <PageNavi reqPage={reqPage} setReqPage={setReqPage} pi={pi} />
    </>
  );
};

const BoardList = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const boardList = props.boardList;
  const setBoardList = props.setBoardList;
  const type = props.type;
  const navigate = useNavigate();
  const reportList = props.reportList;
  const setReportList = props.setReportList;
  const setReportModal = props.setReportModal;
  return (
    <div className="report-list-wrap">
      {boardList.map((board, index) => {
        const boardNavi = () => {
          if (board.boardType === 1) {
            navigate(`/board/view/${board.boardNo}/1`);
          } else {
            navigate(`/board/AccompanyView/${board.boardNo}/1`);
          }
        };
        const getReport = () => {
          if (type === 0) {
            axios
              .get(`${backServer}/admin/board/report/${board.boardNo}`)
              .then((res) => {
                setReportList(res.data);
                setReportModal(true);
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            axios
              .get(`${backServer}/admin/comment/report/${board.commentNo}`)
              .then((res) => {
                setReportList(res.data);
                setReportModal(true);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        };
        const deleteBoard = () => {
          if (type === 0) {
            axios
              .delete(`${backServer}/board/delete/${board.boardNo}`)
              .then((res) => {
                if (res.data > 0) {
                  Swal.fire({
                    title: "게시글 삭제 완료",
                    text: "신고 게시글이 삭제 처리 되었습니다.",
                    icon: "success",
                  });
                  boardList.splice(index, 1);
                  setBoardList([...boardList]);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            axios
              .delete(`${backServer}/board/deleteComment/${board.commentNo}`)
              .then((res) => {
                if (res.data) {
                  Swal.fire({
                    title: "댓글 삭제 완료",
                    text: "신고 댓글이 삭제 처리 되었습니다.",
                    icon: "success",
                  });
                  boardList.splice(index, 1);
                  setBoardList([...boardList]);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        };
        return (
          <div
            key={`board-report-list-${index}`}
            className="report-content-wrap"
          >
            <div className="content-writer">{board.memberNickname}</div>
            <div>{type === 0 ? board.boardTitle : board.commentContent}</div>
            <div className="report-btn">
              <button onClick={boardNavi}>게시글로 이동</button>
              <button onClick={deleteBoard} style={{ backgroundColor: "#ccc" }}>
                {type === 0 ? "게시글 삭제" : "댓글 삭제"}
              </button>
              <button onClick={getReport}>신고 정보</button>
            </div>
            <div className="report-count-wrap">
              <p>
                <b>욕설</b> : {board.abuseCount}
              </p>
              <p>
                <b>불편함</b> : {board.uncomfortableCount}
              </p>
              <p>
                <b>광고</b> : {board.adCount}
              </p>
              <p>
                <b>기타</b> : {board.etcCount}
              </p>
              <p>
                <b>누적 합계</b> : {board.totalCount}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const ReportList = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const reportList = props.reportList;
  const setReportList = props.setReportList;
  const type = props.type;
  const setState = props.setState;
  const state = props.state;
  return (
    <div className="report-wrap">
      <table className="admin-list-table">
        <thead>
          <th width="15%">신고번호</th>
          <th width="40%">신고내용</th>
          <th width="15%">작성자</th>
          <th width="15%">신고타입</th>
          <th width="15%">처리</th>
        </thead>
        <tbody>
          {reportList.map((report, index) => {
            const reportType =
              type === 0 ? report.reportType : report.commentReportType;
            const deleteReport = () => {
              if (type === 0) {
                axios
                  .delete(`${backServer}/admin/board/report/${report.reportNo}`)
                  .then((res) => {
                    if (res.data > 0) {
                      Swal.fire({
                        title: "신고 삭제 완료",
                        text: "신고 삭제 처리가 완료 되었습니다.",
                        icon: "success",
                      });
                      reportList.splice(index, 1);
                      setReportList([...reportList]);
                      setState(!state);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
                axios
                  .delete(
                    `${backServer}/admin/comment/report/${report.commentReportNo}`
                  )
                  .then((res) => {
                    if (res.data > 0) {
                      Swal.fire({
                        title: "신고 삭제 완료",
                        text: "신고 삭제 처리가 완료 되었습니다.",
                        icon: "success",
                      });
                      reportList.splice(index, 1);
                      setReportList([...reportList]);
                      setState(!state);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            };
            return (
              <tr key={`board-report-${index}`}>
                {type === 0 ? (
                  <>
                    <td>{report.reportNo}</td>
                    <td>{report.reportContent}</td>
                  </>
                ) : (
                  <>
                    <td>{report.commentReportNo}</td>
                    <td>{report.commentReportContent}</td>
                  </>
                )}
                <td>{report.memberNickname}</td>
                <td>
                  {reportType === 1
                    ? "욕설"
                    : reportType === 2
                    ? "불편함"
                    : reportType === 3
                    ? "광고"
                    : "기타"}
                </td>
                <td style={{ textAlign: "center" }}>
                  <div className="report-delete-btn">
                    <button onClick={deleteReport}>신고삭제</button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default BoardReportList;
