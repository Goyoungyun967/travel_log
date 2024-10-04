import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loginNoState } from "../utils/RecoilData";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, Route, Routes } from "react-router-dom";
import ChangePw from "./ChangePw";

const UpdateMember = () => {
  const [member, setMember] = useState({});
  const [memberNo] = useRecoilState(loginNoState); // 로그인한 사용자의 memberNo를 가져옵니다.

  const backServer = process.env.REACT_APP_BACK_SERVER;

  // 컴포넌트가 마운트될 때 회원 정보를 가져옵니다.
  useEffect(() => {
    axios
      .get(`${backServer}/member/oneMember/${memberNo}`)
      .then((res) => {
        console.log(res);
        setMember(res.data); // 가져온 데이터를 상태에 저장합니다.
      })
      .catch((err) => {
        console.log(err);
      });
  }, [memberNo]);

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
        .replace(/^(\d{3})(\d{0,4})(\d{0,4})$/, "$1-$2-$3") // 형식에 맞춰 하이픈 추가
        .replace(/(-{1,2})$/, ""); // 마지막에 있는 하이픈 제거
    }

    setMember({ ...member, [name]: value });
  };

  const updateMember = () => {
    axios
      .patch(`${backServer}/member`, member)
      .then((res) => {
        console.log(res);
        if (res.data === 1) {
          Swal.fire({
            title: "정보 수정 완료",
            icon: "success",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="update-wrap">
      <div>
        <h4 className="update-title">회원 정보 수정</h4>
      </div>
      <div className="info-nickname">
        {member.memberId + "님 안녕하세요?" || "닉네임이 없습니다."}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateMember();
        }}
      >
        <div className="info-update">
          <label htmlFor="memberNickname">닉네임 : </label>
          <input
            type="text"
            name="memberNickname"
            id="memberNickname"
            value={member.memberNickname || ""}
            onChange={changeMember}
          />
        </div>
        <div className="info-update">
          <label htmlFor="memberPhone">전화번호 : </label>
          <input
            type="text"
            name="memberPhone"
            id="memberPhone"
            value={member.memberPhone || ""}
            onChange={changeMember}
          />
          <button type="submit" className="update-button">
            수정하기
          </button>
        </div>
      </form>

      <Link to="/member/mypage/updateMember/changePw" className="changePw-zone">
        비밀번호 수정 하실래요 ?
      </Link>
    </div>
  );
};

export default UpdateMember;
