import axios from "axios";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SearchPw = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [member, setMember] = useState({ memberId: "", memberPw: "" });
  const [idExists, setIdExists] = useState(null);
  const [resetPassword, setResetPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newMemberPwRe, setNewMemberPwRe] = useState("");
  const navigate = useNavigate();

  const changeMemberPw = (e) => {
    setMember({ ...member, memberPw: e.target.value });
  };

  const changeMember = (e) => {
    const name = e.target.name;
    setMember({ ...member, [name]: e.target.value });
  };

  const checkId = () => {
    axios
      .get(`${backServer}/member/memberId/${member.memberId}/check-id`)
      .then((res) => {
        console.log(res);
        setIdExists(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ResetPassword = (e) => {
    e.preventDefault();
    updateNewPassword();
  };

  const closeModal = () => {
    setResetPassword(false); // 모달 닫기
    setNewPassword(""); // 새 비밀번호 초기화
  };

  const pwMessage = useRef(null);
  const checkPw = () => {
    pwMessage.current.classList.remove("valid");
    pwMessage.current.classList.remove("invalid");

    if (member.memberPw === newMemberPwRe) {
      pwMessage.current.classList.add("valid");
      pwMessage.current.innerText = "비밀번호가 일치합니다.";
    } else {
      pwMessage.current.classList.add("invalid");
      pwMessage.current.innerText = "비밀번호가 일치하지 않습니다.";
    }
  };

  const updateNewPassword = () => {
    if (member.memberPw === newMemberPwRe) {
      axios
        .patch(`${backServer}/member/searchPw`, member)
        .then((res) => {
          console.log(res);
          if (res.data === 1) {
            Swal.fire({
              title: "성공 !",
              icon: "success",
              text: "비밀번호 재설정 완료! ",
            });
            navigate("/login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <section className="searchPw-wrap">
      <div className="searchIPw-title">
        <h4>비밀번호 찾기</h4>
      </div>
      <div className="searchPw-input">
        <label htmlFor="memberPw" className="searchId-label">
          아이디 :
        </label>
        <input
          type="text"
          name="memberId"
          value={member.memberId}
          onChange={changeMember}
          className="id-input-searchPw"
          onBlur={checkId}
        />
      </div>
      {idExists !== null && (
        <div className="idExists-zone">
          <p>
            {idExists ? "아이디가 존재합니다." : "아이디가 존재하지 않습니다."}
          </p>
          {idExists && (
            <>
              <button
                className="rePassword-btn"
                onClick={() => setResetPassword(true)}
              >
                비밀번호 재설정
              </button>

              {resetPassword && (
                <div className="reset-password-form">
                  <form onSubmit={ResetPassword}>
                    <label htmlFor="newPassword">새 비밀번호:</label>
                    <input
                      className="newPassword-input"
                      type="password"
                      name="newPassword"
                      value={member.memberPw}
                      onChange={changeMemberPw}
                    />
                    <label htmlFor="newRePassword">새 비밀번호 확인:</label>
                    <input
                      className="newPassword-input"
                      type="password"
                      name="newRePassword"
                      value={newMemberPwRe}
                      onChange={(e) => setNewMemberPwRe(e.target.value)}
                      onBlur={checkPw}
                    />
                    <p className="pwCheck-msg" ref={pwMessage}></p>
                    <button type="submit" className="re-password-btn">
                      재설정
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="rePassword-modal-close-btn"
                    >
                      닫기
                    </button>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      )}
      <Link to="/searchId" className="think-id">
        <p>아이디가 기억안나시나요 ? click</p>
      </Link>

      {/* 어두운 배경과 입체감 있는 효과를 위한 CSS 스타일 */}
      {resetPassword && <div className="reset-pw-overlay"></div>}
    </section>
  );
};

export default SearchPw;
