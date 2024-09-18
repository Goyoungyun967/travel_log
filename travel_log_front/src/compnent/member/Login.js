import "./member.css";

const Login = () => {
  return (
    <div className="container">
      <h2>로그인</h2>
      <form className="form">
        <div className="input-group">
          <label htmlFor="email">아이디 :</label>
          <input type="email" id="email" />
        </div>
        <div className="input-group">
          <label htmlFor="password">비밀번호:</label>
          <input type="password" id="password" />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Login;
