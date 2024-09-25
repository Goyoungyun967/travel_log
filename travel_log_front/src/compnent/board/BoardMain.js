import { Route, Routes } from "react-router-dom";
import BoardList from "./BoardList";
import AccompanyWrite from "./AccompanyWrite";
import BoardWrite from "./BoardWrite";
import BoardView from "./BoardView";

const BoardMain = () => {
  return (
    <Routes>
      <Route path="/list" element={<BoardList />}></Route>
      <Route path="accompanyWrite" element={<AccompanyWrite />} />
      <Route path="boardWrite" element={<BoardWrite />} />
      <Route path="view/:boardNo/:timeString" element={<BoardView />} />
    </Routes>
  );
};
export default BoardMain;
