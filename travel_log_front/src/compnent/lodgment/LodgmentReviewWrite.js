import ReactQuill from "react-quill";
import "./css/lodgmentReviewWirte.css";
import { useState } from "react";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { useLocation } from "react-router-dom";
import { loginNoState } from "../utils/RecoilData";
import { useRecoilState } from "recoil";
import axios from "axios";

const LodgmentReviewWirte = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const { state } = useLocation();
  const [loginNo] = useRecoilState(loginNoState);
  const lodgmentNo = state?.lodgmentNo;
  //console.log(lodgmentNo);
  const [value, setValue] = useState(0);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, false] }],
      ["bold", "underline", "italic", "strike"], // 글꼴 서식
      [{ list: "ordered" }, { list: "bullet" }], // 리스트
      [{ indent: "-1" }, { indent: "+1" }], // 들여쓰기
      [{ align: [] }], // 정렬
      ["clean"], // 서식 지우기
    ],
  };
  //리뷰사진 미리 보기
  const [showReviewImg, setShowReviewImg] = useState([]);
  //리뷰 보내기 저장
  const [reviewImg, setReviewImg] = useState([]);
  const [reviewContent, setReviewContent] = useState("");
  //사진 등록시 작동할 함수
  function addBoardFile(e) {
    const files = e.currentTarget.files;
    console.log(files);

    if (files.length > 5) {
      Swal.fire({
        text: "이미지는 5개까지 등록 가능합니다.",
      });
      setReviewImg([]);
      setShowReviewImg([]);
      return;
    } else {
      const fileReaders = [];
      for (let i = 0; files.length > i; i++) {
        setReviewImg(files[i]);
        console.log(reviewImg);
        const reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onloadend = () => {
          fileReaders.push(reader.result); // 읽은 결과를 배열에 추가
          if (fileReaders.length === files.length) {
            setShowReviewImg(fileReaders); // 모든 파일이 읽힌 후 상태를 업데이트
          }
          console.log("showReviewImg" + showReviewImg);
        };
        setReviewImg();
      }
    }
  }
  const changeContent = (contnet) => {
    setReviewContent(contnet);
  };
  console.log("내용" + reviewContent);

  //사진 없으면 글많있는 페이지로~
  function insertReview() {
    if (reviewContent === "" && value === 0) {
      Swal.fire({
        text: "리뷰와 별점을 입력해주세요.",
      });
      return;
    }
    const form = new FormData();
    form.append("rating", value);
    form.append("reviewContent", reviewContent);
    form.append("loginNo", loginNo);
    form.append("lodgmentNo", lodgmentNo);
    for (let i = 0; i < reviewImg.length; i++) {
      form.append("img", reviewImg[i]);
    }
    axios
      .post(`${backServer}/lodgment/review`, form, {
        headers: {
          ContentType: "multipart/form-data",
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

  return (
    <div className="lodgment-review-write-rwap">
      <div className="lodgment-revie-imgbox-wrap">
        {showReviewImg.length === 0
          ? ""
          : showReviewImg.map((img, i) => (
              <div key={`showImgContainer${i}`}>
                <img src={img} alt={`Image ${i}`} />
              </div>
            ))}
      </div>
      <div className="lodgment-review-img-wrap">
        <label className="img-insert-div">
          이미지 업로드
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            multiple
            onChange={addBoardFile}
          />
        </label>
      </div>
      <div className="lodgment-review-list-wrap">
        <ReactQuill
          style={{
            width: "90%",
            height: "400px",
          }}
          modules={modules}
          onChange={changeContent}
        />
      </div>
      {/* 버튼을 ReactQuill 외부로 이동 */}
      <div className="review-star-box">
        <Box sx={{ "& > legend": { mt: 2 } }}>
          <Rating
            name="simple-controlled"
            size="large"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </Box>
      </div>
      <div className="lodgment-review-btn-wrap">
        <button className="lodgment-review-write-btn" onClick={insertReview}>
          리뷰작성
        </button>
      </div>
    </div>
  );
};

export default LodgmentReviewWirte;
