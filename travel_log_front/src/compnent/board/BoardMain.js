import { Route, Routes } from "react-router-dom";
import BoardList from "./BoardList";

const BoardMain = () => {
  return (
    <Routes>
      <Route path="/list" element={<BoardList />}></Route>
    </Routes>
  );
};
export default BoardMain;
