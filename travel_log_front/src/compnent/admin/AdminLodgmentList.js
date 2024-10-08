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
import { useNavigate } from "react-router-dom";

const AdminLodgmentList = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [lodgmentList, setLodgmentList] = useState(null);
  const [pi, setPi] = useState(null);
  const [lodgmentDelete, setLodgmentDelete] = useState(0);
  const [reqPage, setReqPage] = useState(1);
  const navigate = useNavigate();
  const [state, setState] = useState(true);
  const [lodgmentNoList, setLodgmentNoList] = useState([]);
  useEffect(() => {
    axios
      .get(`${backServer}/admin/lodgment/list/${reqPage}/${lodgmentDelete}`)
      .then((res) => {
        console.log(res.data);
        setLodgmentList(res.data.list);
        setPi(res.data.pi);
        setLodgmentNoList([]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPage, lodgmentDelete, state]);
  const updateLodmentDelete = () => {
    axios
      .patch(`${backServer}/admin/lodgment`, lodgmentNoList)
      .then((res) => {
        if (res.data) {
          setState(!state);
          Swal.fire({
            title: "상품 등록 처리 완료",
            text: "상품 등록 처리가 완료 되었습니다.",
            icon: "success",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return lodgmentList ? (
    <>
      <div className="admin-search-box">
        <FormControl>
          <FormLabel id="lodgmentDelete">등록여부</FormLabel>
          <RadioGroup
            row
            aria-labelledby="lodgmentDelete"
            defaultValue={0}
            name="radio-buttons-group"
            onChange={(e) => {
              setLodgmentDelete(e.target.value);
              setReqPage(1);
            }}
          >
            <FormControlLabel value={0} control={<Radio />} label="등록대기" />
            <FormControlLabel value={1} control={<Radio />} label="등록완료" />
          </RadioGroup>
        </FormControl>
      </div>
      <table className="admin-list-table">
        <thead>
          <tr>
            <th width={"20%"} className="seller-check">
              {Number(lodgmentDelete) === 0 ? (
                <Checkbox
                  onChange={(e) => {
                    if (e.target.checked) {
                      const newLodgmentNoList = new Array();
                      lodgmentList.forEach((lodgment) => {
                        newLodgmentNoList.push(lodgment.lodgmentNo);
                      });
                      setLodgmentNoList(newLodgmentNoList);
                    } else {
                      setLodgmentNoList([]);
                    }
                  }}
                />
              ) : (
                ""
              )}
              상품번호
            </th>
            <th width={"30%"}>숙소명</th>
            <th width={"15%"}>숙소종류</th>
            <th width={"20%"}>사업자명</th>
            <th width={"15%"}>등록상태</th>
          </tr>
        </thead>
        <tbody>
          {lodgmentList.map((lodgment, index) => {
            const changeLodgmentNoList = (e) => {
              if (e.target.checked) {
                lodgmentNoList.push(lodgment.lodgmentNo);
                setLodgmentNoList([...lodgmentNoList]);
              } else {
                const newLodgmentNoList = lodgmentNoList.filter(
                  (lodgmentNo) => {
                    return lodgmentNo != lodgment.lodgmentNo;
                  }
                );
                setLodgmentNoList(newLodgmentNoList);
              }
            };
            return (
              <tr key={`admin-lodgment-list-${index}`}>
                <td className="seller-check">
                  {Number(lodgmentDelete) === 0 ? (
                    <Checkbox
                      onChange={changeLodgmentNoList}
                      checked={lodgmentNoList.includes(lodgment.lodgmentNo)}
                    />
                  ) : (
                    ""
                  )}
                  {lodgment.lodgmentNo}
                </td>
                <td
                  onClick={() => {
                    navigate(`/seller/lodgmentView/${lodgment.lodgmentNo}`);
                  }}
                >
                  {lodgment.lodgmentName}
                </td>
                <td>{lodgment.lodgmentTypeName}</td>
                <td>{lodgment.businessName}</td>
                <td>
                  {lodgment.lodgmentDelete === 0 ? (
                    <>{"등록대기"}</>
                  ) : (
                    "등록완료"
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {Number(lodgmentDelete) === 0 ? (
        <button className="admin-seller-btn" onClick={updateLodmentDelete}>
          등록
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

export default AdminLodgmentList;
