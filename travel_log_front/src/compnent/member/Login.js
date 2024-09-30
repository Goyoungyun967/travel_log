import { Link, useNavigate } from "react-router-dom";
import "./member.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { FormControl, FormLabel, RadioGroup } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useRecoilState } from "recoil";
import {
  loginNoState,
  memberLevelState,
  sellerLoginNoState,
} from "../utils/RecoilData";

const Login = (props) => {
  const setLoginNickname = props.setLoginNickname;
  const [loginNo, setLoginNo] = useRecoilState(loginNoState);
  const [sellerLoginNo, setSellerLoginNo] = useRecoilState(sellerLoginNoState);
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState);
  const [member, setMember] = useState({ memberId: "", memberPw: "" });
  const [seller, setSeller] = useState({ businessNo: "", sellerPw: "" });
  const navigate = useNavigate();
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const changeMember = (e) => {
    const name = e.target.name;
    setMember({ ...member, [name]: e.target.value });
  };

  const changeSeller = (e) => {
    const name = e.target.name;
    setSeller({ ...seller, [name]: e.target.value });
  };
  const [type, setType] = useState(true);
  const changeType = (e) => {
    setType(!type);
  };
  //seller 로그인
  const sellerLogin = () => {
    if (seller.businessNo == "" || seller.sellerPw === "") {
      Swal.fire({
        text: "아이디 또는 비밀번호를 입력하세요",
        icon: "info",
      });
      return;
    }
    console.log(seller.businessNo);
    console.log(seller.sellerPw);
    axios
      .post(`${backServer}/seller/login`, seller)
      .then((res) => {
        console.log(res);
        setSellerLoginNo(res.data.sellerNo);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          text: "아이디 또는 비밀번호 확인해주세요22222",
          icon: "warning",
        });
      });
  };

  const login = () => {
    if (member.memberId === "" || member.memberPw === "") {
      Swal.fire({
        text: "아이디 또는 비밀번호를 입력하세요",
        icon: "info",
      });
      return;
    }
    axios
      .post(`${backServer}/member/login`, member)
      .then((res) => {
        console.log(res);
        setLoginNo(res.data.memberNo);
        setMemberLevel(res.data.memberLevel);
        setLoginNickname(res.data.memberNickname);
        //로그인 이후 axios 요청 시 발급받은 토큰값을 자동으로 axios에 추가하는 설정
        axios.defaults.headers.common["Authorization"] = res.data.accessToken;
        //로그인 상태를 지속적으로 유지시키기위해 발급받은 refreshToken을 브라우저에 저장
        window.localStorage.setItem("refreshToken", res.data.refreshToken);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          text: "아이디 또는 비밀번호 확인해주세요",
          icon: "warning",
        });
      });
  };
  return (
    <div>
      <div className="radio-group">
        <FormControl>
          <RadioGroup row defaultValue="female" name="radio-buttons-group">
            <FormControlLabel
              value={1}
              control={<Radio />}
              label="일반회원"
              onChange={changeType}
              checked={type}
            />
            <FormControlLabel
              value={2}
              control={<Radio />}
              label="사업자"
              onChange={changeType}
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="login-container">
        <div className="login-wrap">
          <h2 className="head-login">로그인</h2>
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              if (type) {
                login(); // 일반회원 로그인
              } else {
                sellerLogin(); // 사업자 로그인
              }
            }}
          >
            {type ? (
              <div className="login-input-group">
                <label htmlFor="memberId" className="id-zone">
                  아이디 :
                </label>
                <input
                  className="login-zone"
                  type="text"
                  name="memberId"
                  id="memberId"
                  value={member.memberId}
                  onChange={changeMember}
                />
                <div className="login-input-group">
                  <label htmlFor="memberPw">비밀번호:</label>
                  <input
                    className="login-zone"
                    type="password"
                    name="memberPw"
                    id="memberPw"
                    value={member.memberPw}
                    onChange={changeMember}
                  />
                </div>
              </div>
            ) : (
              <div className="login-input-group">
                <label htmlFor="businessNo" className="business-zone">
                  사업자번호 :
                </label>
                <input
                  className="login-zone"
                  type="text"
                  name="businessNo"
                  id="businessNo"
                  value={seller.businessNo}
                  onChange={changeSeller}
                />
                <div className="login-input-group">
                  <label htmlFor="sellerPw">사업자 비밀번호:</label>
                  <input
                    className="login-zone"
                    type="password"
                    name="sellerPw"
                    id="sellerPw"
                    value={seller.sellerPw}
                    onChange={changeSeller}
                  />
                </div>
              </div>
            )}

            <button type="submit" className="login-btn">
              로그인
            </button>
          </form>
          <div className="link-group">
            <Link to="/searchId" className="link-btn">
              아이디 찾기
            </Link>
            <Link to="/searchpw" className="link-btn">
              비밀번호 찾기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
