import axios from "axios";
import { useEffect, useState } from "react";
import UqillEditor from "../utils/UqillEditor";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FaqWrite = (props) => {
    const backServer = process.env.REACT_APP_BACK_SERVER;
    const faqNo = props.faqNo;
    const faqTypeList = props.faqTypeList;
    const [faqCategory, setFaqCategory] = useState(0);
    const [faq, setFaq] = useState({faqType : "L1", faqTitle : ""});
    const [faqContent,setFaqContent] = useState("")
    const navigate = useNavigate();
    const changeValue = (e) => {
        setFaq({...faq, [e.target.id] : e.target.value})
    }
    useEffect(()=>{
        setFaq({...faq, faqType : faqTypeList[faqCategory].typeList[0].faqType});
        if(faqNo){
            
        }
    },[faqCategory]);
    const faqWrite = () => {
        const writeFaq = {...faq, faqContent};
        console.log(writeFaq);
        axios.post(`${backServer}/faq`,writeFaq).then((res)=>{
            if(res.data > 0){
            Swal.fire({
                title : "작성 완료",
                text : "작성이 완료 되었습니다.",
                icon : "success"
            }).then(()=>{
                navigate(`/faq/faqList/${faq.faqType}`);
            })
            }else{
                Swal.fire({
                    title : "작성 실패",
                    text : "잠시 후 다시 시도해주세요.",
                    icon : "error"
                })
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
    return (faqTypeList ? 
        <div className="faq-write-wrap">
            <table>
                <tbody>
                    <tr>
                        <td colSpan={2}>
                            <div className="input-item">
                                <select id="faqCategory" onChange={(e)=>{
                                    setFaqCategory(e.target.value);
                                }}>
                                    {faqTypeList.map((item,index)=>{
                                        return <option key={`faqCategoryInput+${index}`} value={index} >{item.category}</option>
                                    })}
                                </select>
                                <select id="faqType" onChange={changeValue}>
                                    {faqTypeList[faqCategory].typeList.map((typeList,index)=>{
                                        return <option key={`faqTypeInput+${index}`} value={typeList.faqType}>{typeList.faqTypeName}</option>
                                    })
                                    }
                                </select>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th><label htmlFor="faqTitle">제목</label></th>
                        <td><input type="text" id="faqTitle" value={faq.faqTitle} onChange={changeValue}></input></td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="faq-input-content"><UqillEditor boardContent={faqContent} setBoardContent={setFaqContent} width={"100%"} /></td>
                    </tr>
                    <tr>
                        <td colSpan={2}><div className="faq-btn-wrap"><button className="faq-write-btn" onClick={faqWrite}>작성하기</button></div></td>
                    </tr>
                </tbody>
            </table>
        </div>
        : ""
    );
}

export default FaqWrite;