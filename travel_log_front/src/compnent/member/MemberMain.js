import { useState, useRef } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoginState, loginNoState } from "../utils/RecoilData";

import axios from "axios";

const MemberMain = () => {
  const navigate = useNavigate();
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [memberNo, setMemberNo] = useRecoilState(loginNoState);
  const [member, setMember] = useState({ memberImage: "" });
  //back으로 보낼 이미지
  const [memberImage, setMemberImage] = useState();

  const thumbnailRef = useRef(null);

  const changeMember = (e) => {
    const file = e.currentTarget.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMemberImage(reader.result);
        setMember((prev) => ({ ...prev, memberImage: reader.result }));
      };
      reader.readAsDataURL(file);
      const form = new FormData();
      form.append("memberNo", memberNo);
      form.append("memberImage", memberImage);
      console.log("멤버넘버 : ", memberNo);
      console.log("멤버이미지:", memberImage);

      axios
        .post(`${backServer}/member/profile`, form, {
          headers: {
            contentType: "multipart/form-data",
            processData: false,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // 이미지 클릭 시 파일 입력 클릭
  const changeImg = () => {
    thumbnailRef.current.click();
  };

  return (
    <section className="member-mypage">
      <div className="mypage-wrap">
        <div className="mypage-title">
          <h3>회원 정보</h3>
        </div>

        <div
          className="image-space"
          onClick={changeImg} // 이미지 클릭 시 changeImg 호출
          style={{ cursor: "pointer" }}
        >
          {member.memberImage ? (
            <img
              className="profile-size"
              src={member.memberImage}
              alt="회원 이미지"
            />
          ) : (
            <span className="profile-zone">프로필 사진</span>
          )}
        </div>
        <input
          ref={thumbnailRef}
          type="file"
          id="file-input"
          accept="image/*"
          style={{ display: "none" }}
          onChange={changeMember}
        />

        <div className="my-info-zone">
          <div className="update-zone">정보 수정</div>
          <div className="my-board-zone">내가 쓴 게시글</div>
          <div className="my-reservation-zone">내 예약정보</div>
          <div className="my-comment-zone">내가 쓴 댓글</div>
          <div className="my-account-zone">총 결재액</div>
        </div>
      </div>
      <Routes></Routes>
    </section>
  );
};

export default MemberMain;
