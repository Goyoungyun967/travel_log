import { useState } from "react";

const MemberJoin = () => {
  const [member, setMember] = useState({
    memberId: "",
  });
  return (
    <div>
      <h2 className="member-join">일반회원가입</h2>
      <div className="join-content">
        <div>
          <lable htmlFor="memberId">아이디</lable>
          <input
            type="text"
            id="memberId"
            name="memberId"
            value={member.memberId}
            onChange={changeValue}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default MemberJoin;
