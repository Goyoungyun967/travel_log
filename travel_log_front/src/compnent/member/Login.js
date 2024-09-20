import { Link } from "react-router-dom";
import "./member.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { FormControl, FormLabel, RadioGroup } from "@mui/material";
import { useState } from "react";

const Login = () => {
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
                <input type="text" name="memberId" />
              </div>
            ) : (
              <div className="input-group">
                <label htmlFor="businessNo">사업자번호 :</label>
                <input type="text" name="businessNo" />
              </div>
            )}

            <div className="input-group">
              <label htmlFor="memberPw">비밀번호:</label>
              <input type="password" className="memberPw" id="memberPw" />
            </div>
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
