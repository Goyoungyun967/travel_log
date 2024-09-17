import { Route, Routes } from "react-router-dom";
import Footer from "./compnent/common/Footer";
import Header from "./compnent/common/Header";
import Main from "./compnent/common/Main";
import BoardMain from "./compnent/board/BoardMain";
import Faq from './compnent/faq/Faq';
import LodgmentMain from "./compnent/lodgment/LodgmentMain";


function App() {
  return (
    <div className="wrap">
      <Header></Header>
      <main className="content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/board/*" element={<BoardMain />} />
          <Route path="/faq/*" element={<Faq/>}/>
          <Route path="/lodgment/*" element={<LodgmentMain/>} />
        </Routes>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
