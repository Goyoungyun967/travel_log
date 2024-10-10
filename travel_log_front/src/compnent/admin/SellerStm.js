import {
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Checkbox,
} from "@mui/material";
import PageNavi from "../utils/PageNavi";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AdminSellerStm = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [stmList, setStmList] = useState(null);
  const [pi, setPi] = useState(null);
  const [type, setType] = useState(0);
  const [reqPage, setReqPage] = useState(1);
  const [state, setState] = useState(true);
  const [stmNumList, setStmNumList] = useState([]);
  useEffect(() => {
    axios
      .get(`${backServer}/admin/seller/stmList/${reqPage}/${type}`)
      .then((res) => {
        setStmList(res.data.list);
        setPi(res.data.pi);
        setStmNumList([]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPage, type, state]);
  const updateStmState = () => {
    axios
      .patch(`${backServer}/admin/seller/stm`, stmNumList)
      .then((res) => {
        if (res.data) {
          setState(!state);
          Swal.fire({
            title: "정산 처리 완료",
            text: "정산 처리가 완료 되었습니다.",
            icon: "success",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return stmList ? (
    <>
      <div className="admin-search-box">
        <FormControl>
          <FormLabel id="type">정산처리여부</FormLabel>
          <RadioGroup
            row
            aria-labelledby="type"
            defaultValue={0}
            name="radio-buttons-group"
            onChange={(e) => {
              setType(e.target.value);
              setReqPage(1);
            }}
          >
            <FormControlLabel value={0} control={<Radio />} label="미처리" />
            <FormControlLabel value={1} control={<Radio />} label="정산완료" />
          </RadioGroup>
        </FormControl>
      </div>
      <table className="admin-list-table">
        <thead>
          <tr>
            <th width={"20%"} className="seller-check">
              {Number(type) === 0 ? (
                <Checkbox
                  onChange={(e) => {
                    if (e.target.checked) {
                      const newStmNumList = new Array();
                      stmList.forEach((stm) => {
                        newStmNumList.push(stm.stmNum);
                      });
                      setStmNumList(newStmNumList);
                    } else {
                      setStmNumList([]);
                    }
                  }}
                />
              ) : (
                ""
              )}
              정산번호
            </th>
            <th width={"25%"}>사업자명</th>
            <th width={"20%"}>정산금액</th>
            <th width={"20%"}>정산일</th>
            <th width={"15%"}>처리상태</th>
          </tr>
        </thead>
        <tbody>
          {stmList.map((stm, index) => {
            const changeStmNumList = (e) => {
              if (e.target.checked) {
                stmNumList.push(stm.stmNum);
                setStmNumList([...stmNumList]);
              } else {
                const newStmNumList = stmNumList.filter((stmNum) => {
                  return stmNum !== stm.stmNum;
                });
                setStmNumList(newStmNumList);
              }
            };
            return (
              <tr key={`stm-list-${index}`}>
                <td className="seller-check">
                  {Number(type) === 0 ? (
                    <Checkbox
                      onChange={changeStmNumList}
                      checked={stmNumList.includes(stm.stmNum)}
                    />
                  ) : (
                    ""
                  )}
                  {stm.stmNum}
                </td>
                <td>{stm.businessName}</td>
                <td>{stm.stmPrice + "원"}</td>
                <td>{stm.stmDate}</td>
                <td>{stm.stmState === 0 ? "정산대기" : "정산완료"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {Number(type) === 0 ? (
        <button className="admin-seller-btn" onClick={updateStmState}>
          정산하기
        </button>
      ) : (
        ""
      )}
      <div className="admin-page-navi">
        <PageNavi reqPage={reqPage} setReqPage={setReqPage} pi={pi} />
      </div>
    </>
  ) : (
    ""
  );
};
export default AdminSellerStm;
