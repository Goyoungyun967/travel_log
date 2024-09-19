import { Route, Routes } from "react-router-dom";
import BoardList from "./BoardList";
import AccompanyWrite from "./AccompanyWrite";

const BoardMain = () => {
  return (
    <Routes>
      <Route path="/list" element={<BoardList />}></Route>
      <Route path="/accompanyWrite" element={<AccompanyWrite />} />
    </Routes>
  );
};
export default BoardMain;
