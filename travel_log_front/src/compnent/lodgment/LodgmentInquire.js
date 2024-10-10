import { useEffect, useState } from "react";
import "./css/lodgmentInquire.css";
import { useRecoilState } from "recoil";
import { loginNoState } from "../utils/RecoilData";
import Swal from "sweetalert2";
import axios from "axios";
import PageNavi from "../utils/PageNavi";

const LodgmentInquire = (pros) => {
  const lodgmentNo = pros.lodgmentNo;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  const [success, setSuccess] = useState(false);
  const [viewInquire, setViewInquire] = useState([]);
  const [loginNo] = useRecoilState(loginNoState);

  useEffect(() => {
    axios
      .get(`${backServer}/lodgment/inquireList/${lodgmentNo}/${reqPage}`)
      .then((res) => {
        console.log(res);
        setPi(res.data.pi);
        setViewInquire(res.data.list);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loginNo, reqPage, success]);

  const [openInquire, setOpenInquire] = useState(false);
  // 문의 내용
  const [inquireContent, setInquireContent] = useState("");
  //공개 여부  0:공개 1:비공개
  const [inquireStatus, setInquireStatus] = useState(0);
  const handleInquiryStatusChange = (event) => {
    setInquireStatus(event.target.value);
  };

  const handleInquierContentChange = (event) => {
    setInquireContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 여기에 제출 로직 추가 (예: API 호출)
    if (inquireContent.trim() === "") {
      Swal.fire({ text: "문의 내용을 입력해주세요." });
      return;
    }
    const form = new FormData();
    form.append("lodgmentNo", lodgmentNo);
    form.append("qnaContent", inquireContent);
    form.append("scQnaStatus", inquireStatus);
    form.append("memberNo", loginNo);

    axios
      .post(`${backServer}/lodgment/memberInquire`, form)
      .then((res) => {
        console.log(res);
        setSuccess(!success);
      })
      .catch((err) => {
        console.log(err);
      });

    Swal.fire({ text: "문의 등록 완료!" });
    setOpenInquire(false); // 전송 후 모달 닫기
    setInquireContent("");
    setInquireStatus(0);
  };

  return (
    <div className="lodgment-inquire-wrap">
      <div className="lodgment-inquire-btn-wrap">
        <button
          className="lodgment-inquire-btn"
          onClick={() => {
            if (loginNo === -1) {
              Swal.fire({ text: "로그인을 해주세요." });
              return;
            }
            setInquireContent("");
            setInquireStatus(0);
            setOpenInquire(!openInquire);
          }}
        >
          문의하기
        </button>
      </div>
      {openInquire && (
        <div className="lodgment-inquire-member-wrap">
          <form className="lodgment-user-inquiry-form" onSubmit={handleSubmit}>
            <div className="lodgment-user-inquiry-type">
              <label>
                <input
                  type="radio"
                  name="inquiryType"
                  value="0"
                  defaultChecked={true}
                  onChange={handleInquiryStatusChange}
                />
                공개글
              </label>
              <label>
                <input
                  type="radio"
                  name="inquiryType"
                  value="1"
                  onChange={handleInquiryStatusChange}
                />
                비밀글
              </label>
            </div>
            <div className="lodgment-user-input-wrap">
              <textarea
                className="lodgment-user-inquiry-input"
                maxLength="100"
                placeholder="문의 내용을 입력하세요 (100자 이내)"
                value={inquireContent}
                onChange={handleInquierContentChange}
              />
              <button
                type="submit"
                className="lodgment-user-inquiry-submit-btn"
              >
                전송
              </button>
            </div>
          </form>
        </div>
      )}
      <div>
        {viewInquire &&
          viewInquire.map((inquire, i) => {
            return (
              <div key={"inquire" + i} className="lodgment-inquire-list">
                <div className="lodgment-inquire-header">
                  <span className="lodgment-inquire-id">
                    {inquire.memberId}
                  </span>
                  <span className="lodgment-inquire-date">
                    {inquire.qnaDate}
                  </span>
                </div>
                <div className="lodgment-inquire-content">
                  <p>
                    {inquire.scQnaStatus === 1
                      ? inquire.memberNo === loginNo
                        ? inquire.qnaContent
                        : "비공개 글입니다."
                      : inquire.qnaContent}
                  </p>
                </div>
                <div>
                  {inquire.memberNo === loginNo && (
                    <span
                      className="lodgmnetInquire-del-span"
                      onClick={() => {
                        Swal.fire({
                          icon: "warning",
                          title: "삭제 확인",
                          text: "정말로 삭제하시겠습니까?",
                          showCancelButton: true,
                          confirmButtonText: "예",
                          cancelButtonText: "아니오",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            axios
                              .delete(
                                `${backServer}/lodgment/inquire/${inquire.roomQnaNo}/${loginNo}`
                              )
                              .then((res) => {
                                if (res) {
                                  setSuccess(!success);
                                  Swal.fire({
                                    icon: "success",
                                    title: "삭제 완료",
                                    text: "질문이 성공적으로 삭제되었습니다.",
                                  });
                                }
                                console.log(res);
                              })
                              .catch((err) => {
                                console.log(err);
                                Swal.fire({
                                  icon: "error",
                                  title: "삭제 실패",
                                  text: "문제가 발생했습니다. 다시 시도해주세요.",
                                });
                              });
                          }
                        });
                      }}
                    >
                      삭제하기
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        <div className="lodgment-inquier-pageNavi">
          <PageNavi reqPage={reqPage} setReqPage={setReqPage} pi={pi} />
        </div>
      </div>
    </div>
  );
};

export default LodgmentInquire;
