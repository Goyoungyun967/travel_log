import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loginNoState } from "../utils/RecoilData";
import axios from "axios";
import Swal from "sweetalert2";

const ChangePw = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [loginNo, setLoginNo] = useRecoilState(loginNoState);
  const [member, setMember] = useState({ memberNo: loginNo, memberPw: "" });
  const [memberPwRe, setMemberPwRe] = useState("");
  const [isAuth, setIsAuth] = useState(false); //현재비밀번호 인증이 되었는지

  useEffect(() => {
    setMember((prev) => ({ ...prev, memberNo: loginNo }));
  }, [loginNo]);

  const changeMemberPw = (e) => {
    setMember({ ...member, memberPw: e.target.value });
  };

  const pwCheck = () => {
    axios
      .post(`${backServer}/member/pw`, member)
      .then((res) => {
        console.log(res);
        if (res.data === 1) {
          setIsAuth(true);
          //member state를 재사용하기위해서 비밀번호값 초기화
          setMember({ ...member, memberPw: "" });
        } else {
          Swal.fire({
            title: "비밀번호를 확인하세요 !",
            icon: "question",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changePw = () => {
    if (member.memberPw === memberPwRe) {
      axios
        .patch(`${backServer}/member/pw`, member)
        .then((res) => {
          console.log(res);
          if (res.data === 1) {
            Swal.fire({
              title: "비밀번호 수정 완료 !",
              icon: "success",
            }).then(() => {
              setIsAuth(false);
              setMember({ ...member, memberPw: "" });
              setMemberPwRe("");
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Swal.fire({
        title: "비밀번호가 일치하지 않습니다.",
        icon: "info",
      });
    }
  };
  return (
    <section className="changePw-wrap">
      <div className="changePw-title">
        <h4>비밀번호 변경하기</h4>
      </div>
      <div className="changePw-main">
        {isAuth ? (
          <>
            <label htmlFor="newPw">새 비밀번호 입력 :</label>
            <input
              type="password"
              id="newPw"
              name="newPw"
              value={member.memberPw}
              onChange={changeMemberPw}
            />
            <label htmlFor="newPwRe">새 비밀번호 확인 :</label>
            <input
              type="password"
              id="newPwRe"
              name="newPwRe"
              value={memberPwRe}
              onChange={(e) => setMemberPwRe(e.target.value)}
            />
            <button
              type="button"
              className="pw-check-btn lg"
              onClick={changePw}
            >
              변경하기
            </button>
          </>
        ) : (
          <>
            <label htmlFor="oldPw">기존 비밀번호 입력 :</label>
            <input
              type="password"
              id="oldPw"
              name="oldPw"
              value={member.memberPw}
              onChange={changeMemberPw}
            />
            <div className="button-zone">
              <button type="button" onClick={pwCheck}>
                확인
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ChangePw;
