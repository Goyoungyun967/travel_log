import { useState } from "react";

const MemberJoin = () => {
  const [member, setMember] = useState({
    memberId: "",
    memberPw: "",
    memberAge: "",
    memberGender: "",
    memberPhone: "",
    memberAddr: "",
    memberEmail: "",
    memberNickname: "",
  });

  console.log(member);
  const changeMember = (e) => {
    const name = e.target.name;
    setMember({ ...member, [name]: e.target.value });
  };
  const [memberPwRe, setMemberPwRe] = useState("");
  const changeMemberPwRe = (e) => {
    setMemberPwRe(e.target.value);
  };
  return (
    <section className="join-content">
      <div className="member-join">일반회원가입</div>
      <div className="join-wrap">
        <label htmlFor="memberId">아이디</label>
      </div>
      <div className="input-item">
        <input
          type="text"
          name="memberId"
          id="memberId"
          value={member.memberId}
          onChange={changeMember}
        ></input>
      </div>
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
        <label htmlFor="memberPwRe" className="join-password">
          비밀번호확인
        </label>
      </div>
      <div className="input-item">
        <input
          type="password"
          name="memberPwRe"
          id="memberPwRe"
          value={memberPwRe}
          onChange={changeMemberPwRe}
        ></input>
      </div>
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
      </div>
      <div className="input-item">
        <label className="gender-label">
          <input
            type="radio"
            name="memberGender"
            id="male"
            value={"m"}
            onChange={changeMember}
            className="gender-input"
          />
          남자
        </label>

        <label className="gender-label">
          <input
            type="radio"
            name="memberGender"
            id="female"
            value={"f"}
            onChange={changeMember}
            className="gender-input"
          />
          여자
        </label>
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
      </div>
      <div className="join-wrap">
        <label htmlFor="memberEmail">이메일</label>
      </div>
      <div className="input-item">
        <input
          type="text"
          name="memberEmail"
          id="memberEmail"
          value={member.memberEmail}
          onChange={changeMember}
        ></input>
      </div>
      <button type="button" className="join-btn">
        회원가입 완료
      </button>
    </section>
  );
};

export default MemberJoin;
