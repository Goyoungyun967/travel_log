import { Link } from "react-router-dom";
import "./member.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { FormControl, FormLabel, RadioGroup } from "@mui/material";

const Login = () => {
  return (
    <div className="main-container">
      <div className="radio-group">
        <FormControl>
          <RadioGroup row defaultValue="female" name="radio-buttons-group">
            <FormControlLabel
              value="member"
              control={<Radio />}
              label="일반회원"
            />
            <FormControlLabel
              value="seller"
              control={<Radio />}
              label="사업자"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="container">
        <h2 className="head-login">로그인</h2>
        <form className="form">
          <div className="input-group">
            <label htmlFor="id" className="id">
              아이디 :
            </label>
            <input type="id" id="id" />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="pw">
              비밀번호:
            </label>
            <input type="password" id="password" />
          </div>
          <button type="submit" className="login-btn">
            로그인
          </button>
        </form>
        <div className="link-group">
          <Link to="/searchId" className="link">
            아이디 찾기
          </Link>
          <Link to="/searchpw" className="link">
            비밀번호 찾기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
