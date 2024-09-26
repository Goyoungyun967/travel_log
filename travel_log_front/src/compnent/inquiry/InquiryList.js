import axios from "axios";
import { useEffect, useState } from "react";
import PageNavi from "../utils/PageNavi";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";

const InquiryList = () => {
    const backServer = process.env.REACT_APP_BACK_SERVER;
    const [reqPage, setReqPage] = useState(1)
    const [InquiryList, setInquiryList] = useState(null);
    const [type, setType] = useState(" ");
    const [state, setState] = useState(0);
    const [pi, setPi] = useState(null);
    const navigate = useNavigate();
    useEffect(()=>{
        axios.get(`${backServer}/admin/inquiry/list/${reqPage}/${type}/${state}`).then((res)=>{
            console.log(res);
            setInquiryList(res.data.list);
            setPi(res.data.pi);
        }).catch((err)=>{
            console.log(err);
        })
    },[reqPage,type,state])
    return (
        InquiryList ? 
        <>
            <div className="inquiry-search-box">
                <FormControl>
                    <FormLabel id="type">사용자</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="type"
                        defaultValue=" "
                        name="radio-buttons-group"
                        onChange={(e)=>{
                            setType(e.target.value);
                        }}
                    >
                        <FormControlLabel value=" " control={<Radio />} label="전체" />
                        <FormControlLabel value="member" control={<Radio />} label="회원" />
                        <FormControlLabel value="seller" control={<Radio />} label="판매자" />
                    </RadioGroup>
                </FormControl>
                <FormControl>
                    <FormLabel id="state">처리상태</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={0}
                        name="radio-buttons-group"
                        onChange={(e)=>{
                            setState(e.target.value);
                        }}
                    >
                        <FormControlLabel value={0} control={<Radio />} label="전체" />
                        <FormControlLabel value={1} control={<Radio />} label="답변대기" />
                        <FormControlLabel value={2} control={<Radio />} label="답변완료" />
                    </RadioGroup>
                </FormControl>
            </div>
            <table className="inquiry-list-table">
                <thead>
                    <tr>
                        <th width={"10%"}>번호</th>
                        <th width={"40%"}>제목</th>
                        <th width={"15%"}>작성자</th>
                        <th width={"20%"}>작성일</th>
                        <th width={"15%"}>처리상태</th>
                    </tr>
                </thead>
                <tbody>
                    {InquiryList.map((inquiry,index)=>{
                        return <tr key={`inquiry-list-${index}`} className="inquiry-list-content" onClick={()=>{
                            navigate(`/admin/inquiryView/${inquiry.inquiryNo}`);
                        }}>
                            <td>{inquiry.inquiryNo}</td>
                            <td>{inquiry.inquiryTitle}</td>
                            <td>{inquiry.memberId ? inquiry.memberId : inquiry.representativeName}</td>
                            <td>{inquiry.regDate}</td>
                            <td>{inquiry.inquiryState === 0 ? "답변대기" : "답변완료"}</td>
                        </tr>
                    })}
                </tbody>
            </table>
            <div className="inquiry-page-navi">
                <PageNavi reqPage={reqPage} setReqPage={setReqPage} pi={pi}/>
            </div>
        </>
        : "");
}

export default InquiryList;