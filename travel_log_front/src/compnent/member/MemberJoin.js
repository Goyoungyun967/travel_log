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
import Swal from "sweetalert2";
import { Timer } from "@mui/icons-material";

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
  const [timer, setTimer] = useState(300); // 5분 타이머 (300초)
  const [isTimerExpired, setIsTimerExpired] = useState(false);
  const sendRef = useRef();
  const [inputDisabled, setInputDisabled] = useState(false);
  const [verificationCode, setVerificationCode] = useState(""); // 입력한 인증 코드
  const [sentCode, setSentCode] = useState(""); // 발송된 인증 코드
  const [isVerificationCompleted, setIsVerificationCompleted] = useState(false); // 이메일 성공상태

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

  const changeMember = (e) => {
    const name = e.target.name;
    const originalValue = e.target.value; // 원래 값을 const로 저장
    let value = originalValue; // 수정할 값을 let으로 선언

    if (name === "memberPhone") {
      if (originalValue.length > 13) {
        return; // 11글자를 초과하면 함수 종료
      }
      value = value
        .replace(/[^0-9]/g, "") // 숫자만 남김
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/, "$1-$2-$3")
        .replace(/(-{1,2})$/, "");
    }
    setMember({ ...member, [name]: value });
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
    if (!isVerificationCompleted) {
      Swal.fire({
        title: "인증 실패",
        icon: "warning",
        text: "이메일 인증이 완료되어야 회원가입이 가능합니다.",
      });
      return;
    }
    if (idCheck === 1 && pwMessage.current.classList.contains("valid")) {
      member.memberEmail = member.memberEmailId + "@" + member.memberEmail;
      const fullAddress = member.memberAddr + " " + member.memberAddrDetail;
      member.memberAddr = fullAddress;
      axios
        .post(`${backServer}/member`, member)
        .then((res) => {
          console.log(res);
          navigate("/login");
          Swal.fire({
            title: "회원가입을 축하합니다 ! ",
            icon: "success",
            text: "어세오세요!",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const sendEmail = () => {
    if (member.memberEmailId !== "" && member.memberEmail !== "") {
      const memberEmail = member.memberEmailId + "@" + member.memberEmail;
      axios
        .get(`${backServer}/member/sendEmail/${memberEmail}`)
        .then((res) => {
          console.log(res);
          sendRef.current.style.display = "block";
          setSentCode(res.data); // 예시로 서버에서 받은 인증 코드 저장
          setTimer(300);
          setIsTimerExpired(false);
          setInputDisabled(false); // 여기서 이메일 입력을 활성화
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const verifyCode = () => {
    if (verificationCode === sentCode) {
      setIsTimerExpired(true);
      Swal.fire({
        title: "인증이 완료되었습니다.",
        icon: "success",
        text: "이메일 인증이 완료되었습니다.",
      });
      setInputDisabled(true); // 인증 완료 후 입력 비활성화
      setIsVerificationCompleted(true); // 인증 완료 상태로 변경
      setIsTimerExpired(true); // 타이머 만료 상태로 변경
    } else {
      Swal.fire({
        title: "인증 실패",
        icon: "error",
        text: "인증 코드가 일치하지 않습니다.",
      });
    }
  };

  const handleCompletePostcode = (data) => {
    // 주소 선택 후 처리
    const fullAddress = data.address;
    setMember({ ...member, memberAddr: fullAddress });
    setShowPostcode(false); // 모달 닫기
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerId);
          setIsTimerExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    if (timer <= 0 || isTimerExpired) {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [timer, isTimerExpired]);

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
          maxLength={13}
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
      <div className="send-email-wrap hide" ref={sendRef}>
        <div className="hidden-zone">
          <input
            type="text"
            className="send-email-input"
            ref={sendRef}
            disabled={inputDisabled}
            onChange={(e) => setVerificationCode(e.target.value)}
          ></input>
          <button className="email-success" onClick={verifyCode}>
            인증완료
          </button>
          <div className="email-time">
            {isVerificationCompleted ? (
              <p className="success-email-tag">인증이 완료되었습니다.</p>
            ) : isTimerExpired ? (
              <p>인증 시간이 만료되었습니다.</p>
            ) : (
              <p>
                남은 시간: {Math.floor(timer / 60)}:
                {String(timer % 60).padStart(2, "0")}
              </p>
            )}
          </div>
        </div>
      </div>

      <button type="button" className="join-btn" onClick={join}>
        회원가입 완료
      </button>
    </section>
  );
};

export default MemberJoin;
