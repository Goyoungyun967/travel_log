import {
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import PageNavi from "../utils/PageNavi";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AdminMemberList = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [memberList, setMemberList] = useState(null);
  const [pi, setPi] = useState(null);
  const [reqPage, setReqPage] = useState(1);
  const [type, setType] = useState(0);
  useEffect(() => {
    axios
      .get(`${backServer}/admin/member/list/${reqPage}/${type}`)
      .then((res) => {
        setMemberList(res.data.list);
        setPi(res.data.pi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPage, type]);

  return memberList ? (
    <>
      <div className="admin-page-title">
        <h3>회원 관리</h3>
      </div>
      <div className="admin-search-box">
        <FormControl>
          <FormLabel id="type">정렬 기준</FormLabel>
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
            <FormControlLabel value={0} control={<Radio />} label="가입순" />
            <FormControlLabel
              value={1}
              control={<Radio />}
              label="신고많은순"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <table className="admin-list-table" width={"900px"}>
        <thead>
          <tr>
            <th width={"10%"}>번호</th>
            <th width={"15%"}>아이디</th>
            <th width={"15%"}>닉네임</th>
            <th width={"15%"}>가입일</th>
            <th width={"10%"}>신고수</th>
            <th width={"20%"}>종류</th>
            <th width={"15%"}>상태</th>
          </tr>
        </thead>
        <tbody>
          {memberList.map((member, index) => {
            const updateMemberLevel = (e) => {
              member.memberLevel = e.target.value;
              axios
                .patch(`${backServer}/admin/member`, {
                  memberNo: member.memberNo,
                  memberLevel: member.memberLevel,
                })
                .then((res) => {
                  if (res.data) {
                    setMemberList([...memberList]);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            };
            const insertMemberReport = () => {
              axios
                .post(`${backServer}/admin/member/report`, {
                  memberNo: member.memberNo,
                })
                .then((res) => {
                  if (res.data > 0) {
                    Swal.fire({
                      title: "활동 정지 완료",
                      text: "게시글 작성 정지 처리 되었습니다.",
                      icon: "success",
                    });
                    member.memberState = 1;
                    setMemberList([...memberList]);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            };
            return (
              <tr key={`admin-member-list-${index}`}>
                <td>{member.memberNo}</td>
                <td>{member.memberId}</td>
                <td>{member.memberNickname}</td>
                <td>{member.enrollDate}</td>
                <td>{member.reportCount}</td>
                <td>
                  <FormControl style={{ width: "80%" }}>
                    <InputLabel id="levels">등급</InputLabel>
                    <Select
                      labelId="levels"
                      id="levels"
                      value={member.memberLevel}
                      label="level"
                      onChange={updateMemberLevel}
                    >
                      <MenuItem value={1}>관리자</MenuItem>
                      <MenuItem value={2}>회원</MenuItem>
                      <MenuItem value={3}>탈퇴회원</MenuItem>
                    </Select>
                  </FormControl>
                </td>
                <td>
                  {member.memberState === 1 ? (
                    "활동정지"
                  ) : (
                    <div className="admin-btn">
                      <button className="first" onClick={insertMemberReport}>
                        정지하기
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
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

export default AdminMemberList;
