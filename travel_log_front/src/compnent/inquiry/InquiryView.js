import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UqillEditor from "../utils/UqillEditor";
import Swal from "sweetalert2";

const InquiryView = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const inquiryNo = useParams().inquiryNo;
  const [inquiry, setInquiry] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${backServer}/inquiry/${inquiryNo}`)
      .then((res) => {
        if (res.data) {
          setInquiry(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [inquiryReplyContent, setInquiryReplyContent] = useState("");
  const fileDown = (file) => {
    axios
      .get(`${backServer}/inquiry/file/${file.filepath}`, {
        responseType: "blob",
      })
      .then((res) => {
        const blob = new Blob([res.data]);
        const fileObjectUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = fileObjectUrl;
        link.style.display = "none";
        link.download = file.filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(fileObjectUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const writeInquiryReply = () => {
    axios
      .post(`${backServer}/inquiry/inquiryReply`, {
        inquiryNo: inquiry.inquiryNo,
        inquiryReplyContent,
      })
      .then((res) => {
        if (res.data > 0) {
          Swal.fire({
            title: "문의 답변 완료",
            text: "답변이 완료 되었습니다.",
            icon: "success",
          }).then(() => {
            navigate(`/admin/inquiryView/${inquiry.inquiryNo}`);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return inquiry ? (
    <div className="inquiry-view-wrap">
      <table>
        <tbody>
          <tr>
            <th style={{ width: "20%" }}>제목</th>
            <td>{inquiry.inquiryTitle}</td>
          </tr>
          <tr>
            <th>작성자</th>
            <td>
              {inquiry.memberId ? inquiry.memberId : inquiry.representativeName}
            </td>
          </tr>
          <tr>
            <th>작성일</th>
            <td>{inquiry.regDate}</td>
          </tr>
          <tr>
            <th>첨부파일 목록</th>
            <td>
              {inquiry.inquiryFileList.map((file, index) => {
                return (
                  <div
                    key={`inquiry-file-${index}`}
                    className="inquiry-file-wrap"
                  >
                    <span>{file.filename}</span>
                    <span
                      className="material-icons"
                      onClick={() => {
                        fileDown(file);
                      }}
                    >
                      download
                    </span>
                  </div>
                );
              })}
            </td>
          </tr>
          <tr>
            <td
              colSpan={2}
              className="inquiry-content"
              dangerouslySetInnerHTML={{
                __html: inquiry.inquiryContent,
              }}
            ></td>
          </tr>
        </tbody>
      </table>
      <div className="inquiry-reply-wrap">
        <span className="material-icons">
          subdirectory_arrow_right<span>문의 답변</span>
        </span>
        <div
          className="inquiry-reply-content"
          style={inquiry.inquiryReply ? { border: "1px solid #ccc" } : {}}
        >
          {inquiry.inquiryReply ? (
            <>
              <p>답변 작성일 : {inquiry.inquiryReply.regDate}</p>
              <p
                dangerouslySetInnerHTML={{
                  __html: inquiry.inquiryReply.inquiryReplyContent,
                }}
              ></p>
            </>
          ) : (
            <UqillEditor
              boardContent={inquiryReplyContent}
              setBoardContent={setInquiryReplyContent}
              width={"100%"}
            />
          )}
          {inquiry.inquiryReply ? (
            ""
          ) : (
            <button onClick={writeInquiryReply}>답변하기</button>
          )}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default InquiryView;
