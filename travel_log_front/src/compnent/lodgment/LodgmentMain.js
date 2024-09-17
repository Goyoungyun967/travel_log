import { Route, Routes } from "react-router-dom";
import LodgmentList from "./LodgmentList";

const LodgmentMain= () =>{
return(
    <Routes>
        <Route path="lodgmentList" element={<LodgmentList />}/>
    </Routes>
)
}
export default LodgmentMain;