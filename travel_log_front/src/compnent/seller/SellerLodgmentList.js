import { useEffect, useState } from "react";
import "./css/lodgment_list.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { sellerLoginNoState } from "../utils/RecoilData";
const SellerLodgmentList = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const lodgmentNo = params.lodgmentNo;
  const [lodgmentList, setLodgmentList] = useState([]);
  const [loginNo, setLoginNo] = useRecoilState(sellerLoginNoState);
  console.log(loginNo);
  useEffect(() => {
    axios
      .post(`${backServer}/seller/lodgmentList`, null, {
        params: { loginNo: loginNo },
      })
      .then((res) => {
        console.log("r:", res);
        setLodgmentList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loginNo]);

  // 판매자 메인
  return (
    <div className="contanier seller-lodgment-list">
      {/* {isLogin? 현재 로그인이 되어있으면 으로 처리해야함 - 일단 임시로 1로 처리*/}
      <Link to={`/seller/insertLodgment`} className="btn primary">
        등록하기
      </Link>

      <div className="item-wrap">
        {lodgmentList.map((list, index) => {
          return <ListItem key={"list-" + index} list={list} index={index} />;
        })}
      </div>
    </div>
  );
};

// 숙소 정보 뽑아오는 곳
const ListItem = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const list = props.list;
  console.log(list);
  return (
    <>
      <div
        className="item"
        onClick={() => {
          navigate(`/seller/lodgmentView/${list.lodgmentNo}`);
        }}
      >
        <div className="item-img">
          <img
            src={
              list.lodgmentImgPath
                ? `${backServer}/seller/lodgment/${list.lodgmentImgPath}`
                : "/image/lodgment_default_img.png"
            }
          />
        </div>
        <div className="item-tx">
          <p className="lodgment-addr">{list.lodgmentAddr}</p>
          <div className="lodgment-star">
            <span>{list.lodgmentStarGrade}</span>
            <span>성급</span>
          </div>
          <h3 className="lodgment-title">{list.lodgmentName}</h3>
        </div>
      </div>
    </>
  );
};

export default SellerLodgmentList;
