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

const AdminSellerList = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [sellerList, setSellerList] = useState(null);
  const [pi, setPi] = useState(null);
  const [sellerApp, setSellerApp] = useState(0);
  const [reqPage, setReqPage] = useState(1);
  useEffect(() => {
    axios
      .get(`${backServer}/admin/seller/list/${reqPage}/${sellerApp}`)
      .then((res) => {
        //setSellerList(res.data.list);
        setSellerList([
          {
            sellerNo: 1,
            businessNo: 12345679,
            represenativeName: "판매자1",
            enrollDate: "2024-09-30",
            sellerApp: 0,
          },
          {
            sellerNo: 2,
            businessNo: 12345671,
            represenativeName: "판매자2",
            enrollDate: "2024-09-30",
            sellerApp: 1,
          },
          {
            sellerNo: 3,
            businessNo: 12345674,
            represenativeName: "판매자3",
            enrollDate: "2024-09-30",
            sellerApp: 0,
          },
          {
            sellerNo: 4,
            businessNo: 212345678,
            represenativeName: "판매자4",
            enrollDate: "2024-09-30",
            sellerApp: 1,
          },
        ]);
        setPi(res.data.pi);
        setSellerNoList([]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPage, sellerApp]);
  const [sellerNoList, setSellerNoList] = useState([]);
  const updateSellerApp = () => {
    axios
      .patch(`${backServer}/admin/seller`, sellerNoList)
      .then((res) => {
        if (res.data) {
          Swal.fire({
            title: "가입 승인 완료",
            text: "가입 승인 처리가 완료 되었습니다.",
            icon: "success",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return sellerList ? (
    <>
      <div className="admin-search-box">
        <FormControl>
          <FormLabel id="sellerApp">가입승인여부</FormLabel>
          <RadioGroup
            row
            aria-labelledby="sellerApp"
            defaultValue={0}
            name="radio-buttons-group"
            onChange={(e) => {
              setSellerApp(e.target.value);
            }}
          >
            <FormControlLabel value={0} control={<Radio />} label="미승인" />
            <FormControlLabel value={1} control={<Radio />} label="승인" />
          </RadioGroup>
        </FormControl>
      </div>
      <table className="admin-list-table">
        <thead>
          <tr>
            <th width={"20%"} className="seller-check">
              {Number(sellerApp) === 0 ? (
                <Checkbox
                  onChange={(e) => {
                    if (e.target.checked) {
                      const newSellerNoList = new Array();
                      sellerList.forEach((seller) => {
                        newSellerNoList.push(seller.sellerNo);
                      });
                      setSellerNoList(newSellerNoList);
                    } else {
                      setSellerNoList([]);
                    }
                  }}
                />
              ) : (
                ""
              )}
              판매자번호
            </th>
            <th width={"30%"}>사업자번호</th>
            <th width={"15%"}>대표자명</th>
            <th width={"20%"}>가입일</th>
            <th width={"15%"}>승인상태</th>
          </tr>
        </thead>
        <tbody>
          {sellerList.map((seller, index) => {
            const changeSellerNoList = (e) => {
              if (e.target.checked) {
                sellerNoList.push(seller.sellerNo);
                setSellerNoList([...sellerNoList]);
              } else {
                const newSellerNoList = sellerNoList.filter((sellerNo) => {
                  return sellerNo != seller.sellerNo;
                });
                setSellerNoList(newSellerNoList);
              }
              console.log(sellerNoList);
            };
            return (
              <tr
                key={`seller-list-${index}`}
                onClick={() => {
                  //navigate(`/admin/sellerInfo/${seller.sellerNo}`);
                }}
              >
                <td className="seller-check">
                  {Number(sellerApp) === 0 ? (
                    <Checkbox
                      onChange={changeSellerNoList}
                      checked={sellerNoList.includes(seller.sellerNo)}
                    />
                  ) : (
                    ""
                  )}
                  {seller.sellerNo}
                </td>
                <td>{seller.businessNo}</td>
                <td>{seller.represenativeName}</td>
                <td>{seller.enrollDate}</td>
                <td>{seller.sellerApp === 0 ? <>{"미승인"}</> : "승인"}</td>
              </tr>
            );
          })}
          {Number(sellerApp) === 0 ? (
            <tr>
              <td colSpan={5}>
                <button className="admin-seller-btn" onClick={updateSellerApp}>
                  가입승인
                </button>
              </td>
            </tr>
          ) : (
            ""
          )}
        </tbody>
      </table>
      <div className="admin-page-navi">
        <PageNavi reqPage={reqPage} setReqPage={setReqPage} pi={pi} />
      </div>
    </>
  ) : (
    ""
  );
};

export default AdminSellerList;
