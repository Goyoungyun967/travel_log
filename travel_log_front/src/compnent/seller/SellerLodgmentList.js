import { useEffect, useState } from "react";
import "./css/lodgment_list.css";
import axios from "axios";
import { Link } from "react-router-dom";
const SellerLodgmentList = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [lodgmentList, setLodgmentList] = useState([]);
  useEffect(() => {
    axios
      .get(`${backServer}/seller/list/1`) // *** 임시로 판매자 번호 1로 넣어둠
      .then((res) => {
        console.log(res);
        setLodgmentList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // 판매자 메인
  return (
    <div className="contanier">
      {/* {isLogin? 현재 로그인이 되어있으면 으로 처리해야함 */}
      <Link to={`${backServer}/seller/insertLodgment`} className="btn primary">
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
  const list = props.list;
  console.log(list);
  return (
    <div className="item">
      <div className="item-img">
        <img src="/img/hotel.jpg" width="250px" />
      </div>
      <div className="item-tx">
        <h5>{list.lodgmentAddr}</h5>
        <span>{list.lodgmentStarGrade}</span>
        <h3>{list.lodgmentName}</h3>
        <button className="btn primary">호텔 수정</button>
      </div>
    </div>
  );
};

export default SellerLodgmentList;
