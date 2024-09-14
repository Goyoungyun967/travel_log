import { Route, Routes } from "react-router-dom";
import Footer from "./compnent/common/Footer";
import Header from "./compnent/common/Header";
import Main from "./compnent/common/Main";

function App() {
  return (
    <div className="wrap">
      <Header></Header>
      <main className="content">
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
