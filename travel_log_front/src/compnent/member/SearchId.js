import { Title } from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const SearchId = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [member, setMember] = useState({
    memberNickname: "",
    memberEmail: "",
    memberEmailId: "",
  });

  const changeMember = (e) => {
    const name = e.target.name;
    setMember({ ...member, [name]: e.target.value });
  };

  const sendEmail = () => {
    if (member.memberEmailId !== "" && member.memberEmail !== "") {
      const memberEmail = member.memberEmailId + "@" + member.memberEmail;
      console.log(memberEmail);
      axios
        .get(`${backServer}/member/sendIdEmail/${memberEmail}`)
        .then((res) => {
          console.log(res);
          Swal.fire({
            title: "성공적으로 보냈습니다.",
            icon: "success",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <section className="searchId-wrap">
      <div className="searchId-title">
        <h4>아이디 찾기</h4>
      </div>
      <div className="searchId-zone">
        <div className="email-input">
          <label htmlFor="memberEmail" className="email-text">
            이메일 :{" "}
          </label>
          <input
            type="text"
            name="memberEmailId"
            value={member.memberEmailId}
            onChange={changeMember}
            className="email-input-item"
          ></input>
          <span className="email-mark" style={{ color: "#0056b3" }}>
            @
          </span>
          <input
            type="text"
            className="email-input-item"
            name="memberEmail"
            value={member.memberEmail}
            onChange={changeMember}
          ></input>
          <select
            name="domain"
            className="email-domain"
            onChange={(e) => {
              if (e.target.value === "self-input") {
                e.target.previousSibling.disabled = false;
                member.memberEmail = "";
                setMember({ ...member });
              } else {
                e.target.previousSibling.disabled = true;
                setMember({ ...member, memberEmail: e.target.value });
              }
            }}
          >
            <option value="naver.com">naver.com</option>
            <option value="gmail.com">gmail.com</option>
            <option value="daum.net">daum.net</option>
            <option value="yahoo.com">yahoo.com</option>
            <option value="hotmail.com">hotmail.com</option>
            <option value="self-input" selected>
              직접입력
            </option>
          </select>

          <button type="button" className="email-btn" onClick={sendEmail}>
            아이디 보내기
          </button>
        </div>
      </div>
    </section>
  );
};

export default SearchId;
