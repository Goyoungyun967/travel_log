import { Route, Routes } from "react-router-dom";
import BoardList from "./BoardList";
import AccompanyWrite from "./AccompanyWrite";
import BoardWrite from "./BoardWrite";
import BoardView from "./BoardView";
import BoardUpdate from "./BoardUpdate";
import AccompanyList from "./AccompanyList";
import AccompanyView from "./AccompanyView";
import AccompanyUpdate from "./AccompanyUpdate";

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
      <Route path="accompanyList" element={<AccompanyList />} />
      <Route
        path="accompanyView/:boardNo/:timeString"
        element={<AccompanyView />}
      />
      <Route path="AccompanyUpdate/:boardNo" element={<AccompanyUpdate />} />
    </Routes>
  );
};
export default BoardMain;
