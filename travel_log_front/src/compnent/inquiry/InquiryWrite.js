import { useEffect, useState } from "react";
import UqillEditor from "../utils/UqillEditor";
import "./inquiry.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  isLoginState,
  loginNoState,
  memberLevelState,
  sellerLoginNoState,
} from "../utils/RecoilData";
import axios from "axios";

const InquiryWrite = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [inquiryTitle, setinquiryTitle] = useState("");
  const [inquiryContent, setInquiryContent] = useState("");
  const navigate = useNavigate();
  const [inquiryFile, setInquiryFile] = useState([]);
  const [showInquiryFile, setShowInquiryFile] = useState([]);
  const isLogin = useRecoilValue(isLoginState);
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState);
  const [loginNo, setLoginNo] = useRecoilState(loginNoState);
  const [sellerLoginNo, setSellerLoginNo] = useRecoilState(sellerLoginNoState);
  useEffect(() => {
    const refreshToken = window.localStorage.getItem("refreshToken");
    const sellerRefreshToken =
      window.localStorage.getItem("sellerRefreshToken");
    if (!refreshToken && !sellerRefreshToken) {
      Swal.fire({
        title: "로그인 필요",
        text: "로그인 후 이용 가능합니다.",
        icon: "info",
      }).then(() => {
        navigate("/login");
      });
    } else if (refreshToken && memberLevel === 1) {
      navigate("/admin/inquiryList");
    }
  }, []);
  const addInquiryFile = (e) => {
    const files = e.target.files;
    const fileArr = new Array();
    const filenameArr = new Array();
    for (let i = 0; i < files.length; i++) {
      fileArr.push(files[i]);
      filenameArr.push(files[i].name);
    }
    setInquiryFile([...inquiryFile, ...fileArr]);
    setShowInquiryFile([...showInquiryFile, ...filenameArr]);
  };
  const writeInquiry = () => {
    if (inquiryTitle !== "" && inquiryContent !== "") {
      const form = new FormData();
      if (memberLevel === 2) {
        form.append("memberNo", loginNo);
      } else if (memberLevel === 4) {
        form.append("sellerNo", sellerLoginNo);
      }
      form.append("inquiryTitle", inquiryTitle);
      form.append("inquiryContent", inquiryContent);
      for (let i = 0; i < inquiryFile.length; i++) {
        form.append("upfile", inquiryFile[i]);
      }
      axios
        .post(`${backServer}/inquiry`, form, {
          headers: {
            contentType: "multipart/form-data",
            processData: false,
          },
        })
        .then((res) => {
          if (res.data) {
            Swal.fire({
              title: "문의 작성 완료",
              text: "처리가 완료되면 마이페이지에서 확인해주세요.",
              icon: "success",
            }).then(() => {
              navigate("/");
            });
          } else {
            Swal.fire({
              title: "문의 작성 실패",
              text: "잠시 후 다시 시도해주세요.",
              icon: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Swal.fire({
        title: "문의 작성 실패",
        text: "제목과 내용을 입력해주세요",
        icon: "info",
      });
    }
  };
  return isLogin && memberLevel !== 1 ? (
    <div className="inquiry-write-wrap">
      <div className="inquiry-page-title">
        <h3>1:1문의</h3>
      </div>
      <table>
        <tbody>
          <tr>
            <th style={{ width: "30%" }}>
              <label htmlFor="inquiryTitle">제목</label>
            </th>
            <td>
              <input
                type="text"
                id="inquiryTitle"
                value={inquiryTitle}
                onChange={(e) => {
                  setinquiryTitle(e.target.value);
                }}
              ></input>
            </td>
          </tr>
          <tr>
            <th>파일첨부</th>
            <td>
              <label className="inquiry-file" htmlFor="inquiry-file">
                파일선택
              </label>
              <input
                type="file"
                id="inquiry-file"
                style={{ display: "none" }}
                onChange={addInquiryFile}
                multiple
              ></input>
            </td>
          </tr>
          <tr>
            <th>첨부파일 목록</th>
            <td>
              {showInquiryFile.map((file, index) => {
                const deleteFile = () => {
                  showInquiryFile.splice(index, 1);
                  inquiryFile.splice(index, 1);
                  setShowInquiryFile([...showInquiryFile]);
                  setInquiryFile([...inquiryFile]);
                };
                return (
                  <div
                    key={`inquiry-input-file-${index}`}
                    className="inquiry-file-wrap"
                  >
                    <span className="">{file}</span>
                    <span
                      className="material-icons deleteInquiryFile"
                      onClick={deleteFile}
                    >
                      delete
                    </span>
                  </div>
                );
              })}
            </td>
          </tr>
          <tr>
            <td colSpan={2} className="inquiry-input-content">
              <UqillEditor
                boardContent={inquiryContent}
                setBoardContent={setInquiryContent}
                width={"100%"}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <div className="inquiry-btn-wrap">
                <button className="inquiry-write-btn" onClick={writeInquiry}>
                  문의하기
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ) : (
    ""
  );
};

export default InquiryWrite;
