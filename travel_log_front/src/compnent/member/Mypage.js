import { useState, useRef, useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isLoginState, loginNoState } from "../utils/RecoilData";
import axios from "axios";
import Swal from "sweetalert2";

const Mypage = () => {
  const navigate = useNavigate();
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [memberNo, setMemberNo] = useRecoilState(loginNoState);
  const [member, setMember] = useState({ memberImage: "" });
  const [memberImage, setMemberImage] = useState(null); // 초기 상태 설정
  const thumbnailRef = useRef(null);
  console.log(memberNo);
  const [fileImg, setFileImg] = useState();
  useEffect(() => {
    if (memberNo != -1) {
      axios
        .get(`${backServer}/member/oneMember/${memberNo}`)
        .then((res) => {
          console.log(res);
          setMember(res.data);
        })
        .catch((err) => {});
    }
  }, [memberNo]);

  const changeMember = (e) => {
    const file = e.currentTarget.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMemberImage(reader.result);
        setMember((prev) => ({ ...prev, memberImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const changeImg = () => {
    thumbnailRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const file = thumbnailRef.current.files[0]; // 여기서 file 가져옴 ?

    if (file && memberNo !== -1) {
      const form = new FormData();
      form.append("memberNo", memberNo);
      form.append("file", file); // 파일을 추가

      console.log("멤버 번호:", memberNo);
      console.log("멤버 이미지:", file);

      axios
        .post(`${backServer}/member/profile`, form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          Swal.fire({
            title: "성공 !",
            text: "프로필 사진이 업데이트 되었습니다.",
            icon: "success",
          });
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            title: "오류.",
            text: "업데이트에 실패했습니다.",
            icon: "error",
          });
        });
    } else {
      console.log("잘못된 입력입니다.");
    }
  };

  return (
    <section className="member-mypage">
      <div className="mypage-wrap">
        <div className="mypage-title">
          <h3>회원 정보</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div
            className="image-space"
            onClick={changeImg}
            style={{ cursor: "pointer" }}
          >
            {member.memberImage && memberImage === null ? (
              <img
                className="profile-size"
                src={`${backServer}/member/profile/${member.memberImage}`}
                alt="회원 이미지"
              />
            ) : memberImage !== null ? (
              <img
                className="profile-size"
                src={memberImage}
                alt="회원 이미지"
              />
            ) : (
              <span className="profile-zone">프로필 사진</span>
            )}
            <input
              ref={thumbnailRef}
              type="file"
              id="file-input"
              accept="image/*"
              style={{ display: "none" }}
              onChange={changeMember}
            />
          </div>
          <button className="profile-btn" type="submit">
            프로필사진 수정하기
          </button>
        </form>
        <div className="my-info-zone">
          <Link to="updateMember" className="update-zone">
            회원 수정/탈퇴
          </Link>
          <Link to="myboard" className="my-board-zone">
            내가 쓴 게시글
          </Link>
          <Link to="myReservation" className="my-reservation-zone">
            내 예약정보
          </Link>
          <Link to="myComment" className="my-comment-zone">
            나의 문의글
          </Link>
          <Link to="DeleteMember" className="my-delete-zone">
            로고
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Mypage;
