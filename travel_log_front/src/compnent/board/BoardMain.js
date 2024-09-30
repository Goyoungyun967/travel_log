import { Route, Routes } from "react-router-dom";
import BoardList from "./BoardList";
import AccompanyWrite from "./AccompanyWrite";
import BoardWrite from "./BoardWrite";
import BoardView from "./BoardView";
import BoardUpdate from "./BoardUpdate";

const BoardMain = () => {
  return (
    <Routes>
      <Route path="/list" element={<BoardList />}></Route>
      <Route path="accompanyWrite" element={<AccompanyWrite />} />
      <Route path="boardWrite" element={<BoardWrite />} />
      <Route
        path="view/:boardNo/:timeString/:isLike/:likeCount"
        element={<BoardView />}
      />
      <Route path="update/:boardNo" element={<BoardUpdate />} />
    </Routes>
  );
};
export default BoardMain;
