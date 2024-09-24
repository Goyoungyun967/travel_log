import { Link } from "react-router-dom";
import "./member.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { FormControl, FormLabel, RadioGroup } from "@mui/material";
import { useState } from "react";

const Login = () => {
  const [member, setMember] = useState({ memberId: "", memberPw: "" });
  const [seller, setSeller] = useState({ businessNo: "", sellerPw: "" });

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
          <form className="form">
            {type ? (
              <div className="input-group">
                <label htmlFor="memberId">아이디 :</label>
                <input
                  type="text"
                  name="memberId"
                  id="memberId"
                  value={member.memberId}
                  onChange={changeMember}
                />
                <div className="input-group">
                  <label htmlFor="memberPw">비밀번호:</label>
                  <input
                    type="password"
                    name="memberPw"
                    id="memberPw"
                    value={member.memberPw}
                    onChange={changeMember}
                  />
                </div>
              </div>
            ) : (
              <div className="input-group">
                <label htmlFor="businessNo">사업자번호 :</label>
                <input
                  type="text"
                  name="businessNo"
                  id="businessNo"
                  value={seller.businessNo}
                  onChange={changeSeller}
                />
                <div className="input-group">
                  <label htmlFor="sellerPw">사업자 비밀번호:</label>
                  <input
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
