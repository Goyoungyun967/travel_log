import ReactQuill from "react-quill";
import "./css/lodgmentReviewWirte.css";
import { useState } from "react";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { useLocation, useNavigate } from "react-router-dom";
import { loginNoState } from "../utils/RecoilData";
import { useRecoilState } from "recoil";
import axios from "axios";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

const LodgmentReviewWirte = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loginNo] = useRecoilState(loginNoState);
  const lodgmentNo = state?.lodgmentNo;
  const [value, setValue] = useState(0);
  const bookNo = state.bookNo;
  console.log(bookNo);
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
  console.log(reviewImg);
  const [reviewContent, setReviewContent] = useState("");
  //사진 등록시 작동할 함수
  function addBoardFile(e) {
    const files = e.currentTarget.files;
    console.log(files);

    const totalFiles = reviewImg.length + files.length;
    //이미지는 5개까지 저장 가능
    if (totalFiles > 5) {
      Swal.fire({
        text: "이미지는 5개까지 등록 가능합니다.",
      });
      setReviewImg([]);
      setShowReviewImg([]);
      return;
    } else {
      //임시 이미지 url 담을 배열
      const fileReaders = [];
      const updateImg = [];
      //올린 사진만큼 배열만큼 저장
      for (let i = 0; files.length > i; i++) {
        //서버에 보낼 데이터 저장
        updateImg.push(files[i]);

        //임시 이미지url 생성
        const reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onloadend = () => {
          fileReaders.push(reader.result); // 읽은 결과를 배열에 추가
          if (fileReaders.length === files.length) {
            setShowReviewImg((prevShowImg) => [...prevShowImg, ...fileReaders]);
            setReviewImg((prevReviewImg) => [...prevReviewImg, ...updateImg]);
          }
          //console.log("showReviewImg" + showReviewImg);
        };
      }
    }
  }

  //에디터 내용 저장
  const changeContent = (contnet) => {
    setReviewContent(contnet);
  };
  //console.log("내용" + reviewContent);

  //사진 없으면 글만 있는 리뷰도 가능
  function insertReview() {
    if (reviewContent === "" || value === 0) {
      Swal.fire({
        text: "리뷰와 별점을 입력해주세요.",
      });
      return;
    }

    const form = new FormData();
    form.append("rating", value);
    form.append("reviewContent", reviewContent);
    form.append("memberNo", loginNo);
    form.append("lodgmentNo", lodgmentNo);
    form.append("bookNo", bookNo);
    for (let i = 0; i < reviewImg.length; i++) {
      form.append("reviewImg", reviewImg[i]);
    }
    axios
      .post(`${backServer}/lodgment/review`, form, {
        headers: {
          contentType: "multipart/form-data",
          proccesData: false,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data) {
          Swal.fire({
            text: "리뷰 등록이 완료되었습니다.",
            icon: "success", // 성공 아이콘 추가
          }).then(() => {
            navigate(`/`); // 성공 후 홈으로 네비게이션
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          text: "서버 오류.",
          icon: "error", // 오류 아이콘 추가
        }).then(() => {
          navigate(`/`); // 오류 후 홈으로 네비게이션
        });
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
                <div
                  onClick={() => {
                    setShowReviewImg((prevShowImg) =>
                      prevShowImg.filter((_, index) => index !== i)
                    );
                    setReviewImg((prevReviewImg) =>
                      prevReviewImg.filter((_, index) => index !== i)
                    );
                  }}
                >
                  <DeleteForeverOutlinedIcon />
                </div>
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
