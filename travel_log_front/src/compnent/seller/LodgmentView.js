import { useEffect, useState } from "react";
import "./css/lodgment_view.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import Swal from "sweetalert2";
import KakaoMap from "./sellerUtil/KakaoMap";

import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Comment, QnaComment } from "./sellerUtil/Comment";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { memberLevelState, sellerLoginNoState } from "../utils/RecoilData";
import { useRecoilState } from "recoil";

const LodgmentView = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [loginNo, setLoginNo] = useRecoilState(sellerLoginNoState);
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState);
  const params = useParams();
  const lodgmentNo = params.lodgmentNo;
  const [lodgmentList, setLodgmentList] = useState({}); // 숙소 정보
  console.log("lodList : -", lodgmentList);
  const [roomList, setRoomList] = useState([]); // 객실 리스트

  // 리뷰 관련
  const [reviewList, setReviewList] = useState([]); // 리뷰 리스트
  const [sellerText, setSellerText] = useState(""); // 리뷰 판매자 댓글
  // 리뷰 페이징 처리
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});

  // 문의 관련
  const [qnaList, setQnaList] = useState([]); // qna리스트
  const [sellerComment, setSellerComment] = useState([]); // 문의 판매자 답변 리스트임
  // 문의 페이징 처리
  const [reqPageQ, setReqPageQ] = useState(1);
  const [piQ, setPiQ] = useState({});

  // 필터 검색
  const [align, setAlign] = useState(1);

  console.log(reviewList);
  useEffect(() => {
    axios
      .get(
        `${backServer}/seller/lodgmentView/${lodgmentNo}/${reqPage}/${reqPageQ}/${align}`
      )
      .then((res) => {
        console.log("lodgment res", res);
        // 호텔 삭제하고 뒤로가기를 누르면 호텔 정보가 null값이 되어서 오류가 뜸
        // 호텔 정보가 null값이면 호텔 리스트로 이동하게 함
        if (res.data.lodgment !== null) {
          console.log("lod", res);
          setLodgmentList(res.data.lodgment);
          setRoomList(res.data.list);
          setReviewList(res.data.review);
          setSellerText(res.data.review.sellerComment);
          setPi(res.data.pi);
          setPiQ(res.data.piQ);
          setQnaList(res.data.qna);
          setSellerComment(res.data.qna.commentList);
        } else {
          navigate("/seller/list");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPage, sellerText, reqPageQ, align]);

  // 삭제지만.. 1(보여지는거) => 0으로 바뀌게 해야하므로 패치 사용
  const deleteLodgment = () => {
    Swal.fire({
      icon: "warning",
      title: "호텔 삭제",
      text: "삭제하시겠습니까? 입력한 객실까지 같이 삭제됩니다.",
      showCancelButton: true,
      confirmButtonText: "삭제하기",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .patch(`${backServer}/seller/delLodgment`, null, {
            params: { lodgmentNo: lodgmentNo },
          })
          .then((res) => {
            console.log(res);
            if (res.data !== 0) {
              navigate("/seller/list");
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  };

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="lv-box-wrap box-radius">
      <div className="lv-item-fr-wrap">
        <div className="lv-img-wrap">
          <img
            src={
              lodgmentList.lodgmentImgPath
                ? `${backServer}/seller/lodgment/${lodgmentList.lodgmentImgPath}`
                : "/image/lodgment_default_img.png"
            }
            style={{ width: "300px" }}
          />
        </div>
        <div className="lv-item-wrap">
          <div className="item-title">
            <h1>{lodgmentList.lodgmentName}</h1>
          </div>
          <div className="item-star">
            {lodgmentList.lodgmentStarGrade === 0 ? (
              "등록되지 않은 숙소"
            ) : (
              <>
                <span>{lodgmentList.lodgmentStarGrade}</span>
                <span>성급</span>
              </>
            )}
          </div>
          <div className="item-addr">
            <p>{lodgmentList.lodgmentAddr}</p>
          </div>
          <div className="chek-in">
            <span>체크인 : </span>
            <span>{lodgmentList.lodgmentCheckIn}</span>
          </div>
          <div className="chek-out">
            <span>체크아웃 : </span>
            <span>{lodgmentList.lodgmentCheckOut}</span>
          </div>

          <div className="sellerBtnZone">
            {lodgmentList.sellerNo === loginNo || memberLevel === 1 ? (
              <>
                <Link
                  to={`/seller/updateLodgment/${lodgmentList.lodgmentNo}`}
                  className="sellerUpdateLodgment"
                >
                  호텔 수정
                </Link>
                <button
                  type="button"
                  onClick={deleteLodgment}
                  className="sellerDelLodgment"
                >
                  호텔 삭제
                </button>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="item-sc-wrap">
        {roomList.length !== 0 ? (
          <>
            {lodgmentList.sellerNo === loginNo || memberLevel === 1 ? (
              <Link
                to={`/seller/insertRoom/${lodgmentList.lodgmentNo}`}
                className="sellerInsertRoomBtn"
              >
                객실 등록
              </Link>
            ) : (
              ""
            )}

            <div className="lrv-wrap">
              <h4>객실 정보</h4>
              <div className="room-arr">
                {roomList.map((room, i) => {
                  return <RoomItem key={"room - " + i} room={room} />;
                })}
              </div>
            </div>
          </>
        ) : (
          <div className="noRoomListAlret">
            <p>등록된 숙소가 없습니다 등록하시겠습니까?</p>
            {lodgmentList.sellerNo === loginNo || memberLevel === 1 ? (
              <Link
                to={`/seller/insertRoom/${lodgmentList.lodgmentNo}`}
                className="sellerInsertRoomBtn noRoomList"
              >
                객실 등록 하기
              </Link>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
      <div className="item-tr-wrap">
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="지도" value="1" />
              <Tab label="숙소 공지사항" value="2" />
              {lodgmentList.sellerNo === loginNo || memberLevel === 1 ? (
                <Tab label="리뷰" value="3" />
              ) : (
                ""
              )}
              {lodgmentList.sellerNo === loginNo || memberLevel === 1 ? (
                <Tab
                  label="숙소 문의"
                  value="4"
                  onClick={() => {
                    setAlign(1);
                  }}
                />
              ) : (
                ""
              )}
            </TabList>
          </Box>
          <TabPanel value="1">
            <KakaoMap lodgmentAddr={lodgmentList.lodgmentAddr} />
          </TabPanel>
          <TabPanel value="2">
            <div className="item-notice">
              <h1>공지사항</h1>
              <div
                className="ql-editor"
                dangerouslySetInnerHTML={{
                  __html: lodgmentList.lodgmentNotice,
                }}
              />
            </div>
          </TabPanel>
          {/* 리뷰 */}
          <TabPanel value="3">
            {reviewList.length !== 0 ? (
              <>
                <SelectBar align={align} setAlign={setAlign} />
                <Comment
                  reviewList={reviewList}
                  setReviewList={setReviewList}
                  sellerText={sellerText}
                  setSellerText={setSellerText}
                  reqPage={reqPage}
                  setReqPage={setReqPage}
                  pi={pi}
                />
              </>
            ) : (
              "등록된 리뷰가 없습니다"
            )}
          </TabPanel>
          {/* 문의 */}
          <TabPanel value="4">
            {qnaList.length !== 0 ? (
              <>
                <SelectQna align={align} setAlign={setAlign} />
                <QnaComment
                  qnaList={qnaList}
                  setQnaList={setQnaList}
                  sellerComment={sellerComment}
                  setSellerComment={setSellerComment}
                  reqPageQ={reqPageQ}
                  setSellerText={setSellerText}
                  setReqPageQ={setReqPageQ}
                  piQ={piQ}
                />
              </>
            ) : (
              "등록된 문의가 없습니다."
            )}
          </TabPanel>
        </TabContext>
      </div>
    </div>
  );
};

const RoomItem = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const room = props.room;
  const fileList = room.fileList[0];
  console.log("room - ", room);
  console.log(fileList);

  return (
    <div
      className="room-item"
      onClick={() => {
        navigate(`/seller/roomView/${room.lodgmentNo}/${room.roomNo}`);
      }}
    >
      <div className="room-img">
        <img
          src={
            fileList !== undefined
              ? `${backServer}/seller/room/${room.fileList[0]?.roomImg}`
              : "/image/lodgment_default_img.png"
          }
          style={{ width: "100px" }}
        />
      </div>
      <div className="room-item-info">
        <h5>{room.roomName}</h5>
        <p>최대인원 : {room.roomQua} 인</p>
        <p>가격 : {room.roomPrice} 원</p>
      </div>
    </div>
  );
};

const SelectBar = (props) => {
  const { align, setAlign } = props;
  const handleChange = (event) => {
    setAlign(event.target.value);
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <FormControl sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="demo-simple-select-autowidth-label">정렬</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={align}
          onChange={handleChange}
          autoWidth
          label="정렬"
        >
          <MenuItem value={1}>최신순</MenuItem>
          <MenuItem value={2}>오래된순</MenuItem>
          <MenuItem value={3}>별점 높은 순</MenuItem>
          <MenuItem value={4}>별점 낮은 순</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

const SelectQna = (props) => {
  const { align, setAlign } = props;
  const handleChange = (event) => {
    setAlign(event.target.value);
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <FormControl sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="demo-simple-select-autowidth-label">정렬</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={align}
          onChange={handleChange}
          autoWidth
          label="정렬"
        >
          <MenuItem value={1}>최신순</MenuItem>
          <MenuItem value={2}>오래된순</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default LodgmentView;
