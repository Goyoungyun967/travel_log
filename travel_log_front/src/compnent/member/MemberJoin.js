import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";

const MemberJoin = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [member, setMember] = useState({
    memberId: "",
    memberPw: "",
    memberAge: "",
    memberGender: "",
    memberPhone: "",
    memberAddr: "",
    memberEmail: "",
    memberNickname: "",
    memberEmailId: "",
    memberAddrDetail: "",
  });

  //아이디 중복체크 결과에따라서 바뀔 state
  //0 : 아직 입력하지 않은 상테,
  //1 : 정규표현식,중복체크 모두 통과한 경우
  //2 : 정규표현식을 만족하지 못한 상태
  //3 :  아이디가 중복인경우
  const [idCheck, setIdCheck] = useState(0);
  const [showPostcode, setShowPostcode] = useState(false); // 주소 검색 모달 상태
  const checkId = () => {
    //아이디 유효성 검사
    //1. 정규표현식 감사
    //2. 정규표현식 검사 성공하면,db에 중복체크
    const idReg = /^[a-zA-Z0-9]{4,8}$/;
    if (!idReg.test(member.memberId)) {
      setIdCheck(2);
    } else {
      axios
        .get(`${backServer}/member/memberId/${member.memberId}/check-id`)
        .then((res) => {
          console.log(res);
          if (res.data === 1) {
            setIdCheck(3);
          } else if (res.data === 0) {
            setIdCheck(1);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  console.log(member);
  const changeMember = (e) => {
    const name = e.target.name;
    setMember({ ...member, [name]: e.target.value });
  };
  const [memberPwRe, setMemberPwRe] = useState("");
  const changeMemberPwRe = (e) => {
    setMemberPwRe(e.target.value);
  };

  const pwMessage = useRef(null);
  const checkPw = () => {
    pwMessage.current.classList.remove("valid");
    pwMessage.current.classList.remove("invalid");
    if (member.memberPw === memberPwRe) {
      pwMessage.current.classList.add("valid");
      pwMessage.current.innerText = "비밀번호가 일치합니다 . ";
    } else {
      pwMessage.current.classList.add("invalid");
      pwMessage.current.innerText = "비밀번호가 일치하지 않습니다 .";
    }
  };

  const join = () => {
    if (idCheck === 1 && pwMessage.current.classList.contains("valid")) {
      member.memberEmail = member.memberEmailId + "@" + member.memberEmail;
      const fullAddress = member.memberAddr + " " + member.memberAddrDetail;
      member.memberAddr = fullAddress;
      axios
        .post(`${backServer}/member`, member)
        .then((res) => {
          console.log(res);
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const sendEmail = (e) => {
    member.memberEmail = member.memberEmailId + "@" + member.memberEmail;
    axios
      .get(`${backServer}/sendEmail/${member.memberEmail}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCompletePostcode = (data) => {
    // 주소 선택 후 처리
    const fullAddress = data.address;
    setMember({ ...member, memberAddr: fullAddress });
    setShowPostcode(false); // 모달 닫기
  };

  return (
    <section className="join-content">
      <div className="member-join">일반회원가입</div>
      <div className="join-wrap">
        <label htmlFor="memberId">아이디</label>
      </div>
      <p className={"id"}></p>
      <div className="input-item">
        <input
          type="text"
          name="memberId"
          id="memberId"
          value={member.memberId}
          onChange={changeMember}
          onBlur={checkId}
        ></input>
      </div>
      <p
        className={
          "idCheck-msg" +
          (idCheck === 0 ? "" : idCheck === 1 ? " valid" : " invalid")
        }
      >
        {idCheck === 0
          ? ""
          : idCheck === 1
          ? "사용가능한 아이디입니다."
          : idCheck === 2
          ? "아이디는 영어 대/소문자 숫자로 4~8글자 입니다."
          : "이미 사용중인 아이디입니다."}
      </p>
      <div className="join-wrap">
        <label htmlFor="memberPw" className="join-password">
          비밀번호
        </label>
      </div>
      <div className="input-item">
        <input
          type="password"
          name="memberPw"
          id="memberPw"
          value={member.memberPw}
          onChange={changeMember}
        ></input>
      </div>
      <div className="join-wrap">
        <label htmlFor="memberPwRe">비밀번호확인</label>
      </div>
      <div className="input-item">
        <input
          type="password"
          name="memberPwRe"
          id="memberPwRe"
          value={memberPwRe}
          onChange={changeMemberPwRe}
          onBlur={checkPw}
        ></input>
      </div>
      <p className="pwCheck-msg" ref={pwMessage}></p>
      <div className="join-wrap">
        <label htmlFor="memberNickname">닉네임</label>
      </div>
      <div className="input-item">
        <input
          type="text"
          name="memberNickname"
          id="memberNickname"
          value={member.memberNickname}
          onChange={changeMember}
        ></input>
      </div>

      <div className="join-wrap">
        <label htmlFor="memberGender">성별</label>

        <div className="gender-input-item">
          <div className="radio-group">
            <FormControl>
              <RadioGroup row defaultValue="female" name="radio-buttons-group">
                <FormControlLabel
                  value="m"
                  control={<Radio />}
                  label="남자"
                  name="memberGender"
                  onChange={changeMember}
                />
                <FormControlLabel
                  value="f"
                  control={<Radio />}
                  label="여자"
                  name="memberGender"
                  onChange={changeMember}
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
      </div>

      <div className="join-wrap">
        <label htmlFor="memberAge">나이</label>
      </div>
      <div className="input-item">
        <input
          type="text"
          name="memberAge"
          id="memberAge"
          value={member.memberAge}
          onChange={changeMember}
        ></input>
      </div>
      <div className="join-wrap">
        <label htmlFor="memberPhone">전화번호</label>
      </div>
      <div className="input-item">
        <input
          type="text"
          name="memberPhone"
          id="memberPhone"
          value={member.memberPhone}
          onChange={changeMember}
        ></input>
      </div>
      <div className="join-wrap">
        <label htmlFor="memberAddr">주소</label>
      </div>
      <div className="input-item">
        <input
          type="text"
          name="memberAddr"
          id="memberAddr"
          value={member.memberAddr}
          onChange={changeMember}
        ></input>

        <div className="Addr-zone">
          <input
            type="text"
            className="detail-Addr"
            placeholder="상세주소를 입력하세요"
            name="memberAddrDetail"
            value={member.memberAddrDetail}
            onChange={changeMember}
          ></input>
          <button
            type="button"
            className="Addr-search-btn"
            onClick={() => setShowPostcode(true)}
          >
            주소검색
          </button>
        </div>
        {showPostcode && (
          <div className="postcode-modal">
            <DaumPostcode
              onComplete={handleCompletePostcode}
              autoClose={false} // 선택 후 모달을 닫지 않도록 설정
            />
            <button
              onClick={() => setShowPostcode(false)}
              className="Addr-close-btn"
            >
              닫기
            </button>
          </div>
        )}
      </div>
      <div className="join-wrap">
        <label htmlFor="memberEmail">이메일</label>
      </div>
      <div className="email-input">
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
          인증하기
        </button>
      </div>

      <div className="send-email-zone">
        <div className="email-success">인증완료</div>
        <div className="email-time"></div>
      </div>

      <button type="button" className="join-btn" onClick={join}>
        회원가입 완료
      </button>
    </section>
  );
};

export default MemberJoin;
