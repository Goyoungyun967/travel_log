import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const FaqList = () => {
    const backServer = process.env.REACT_APP_BACK_SERVER;
    const navigate = useNavigate();
    const faqType = useParams().faqType;
    const [faqList, setFaqList] = useState([]);
    const categoryIndex = useParams().categoryIndex;
    console.log(faqType);
    useEffect(()=>{
        axios.get(`${backServer}/faq/faqList/${faqType}`).then((res)=>{
            console.log(res);
            setFaqList(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    },[faqType])
    return (
        <>
            {faqList.map((faq,index)=>{
                const showFaqContent = (e) => {
                    if(faq.faqContent){
                        e.currentTarget.lastChild.innerText = "expand_more";
                        faq.faqContent = null;
                        setFaqList([...faqList]);
                    }else{
                        axios.get(`${backServer}/faq/${faq.faqNo}`).then((res)=>{
                            faq.faqContent = res.data.faqContent;
                            setFaqList([...faqList]);
                        }).catch((err)=>{
                            console.log(err);
                        })
                        e.currentTarget.lastChild.innerText = "expand_less";
                    }
                }
                const deleteFaq = () => {
                    axios.delete(`${backServer}/admin/faq/${faq.faqNo}`).then((res)=>{
                        if(res.data > 0){
                            Swal.fire({
                                title : "삭제 성공",
                                text : "삭제가 완료 되었습니다.",
                                icon : "success"
                            })
                            faqList.splice(index,1);
                            setFaqList([...faqList]);
                        }else{
                            Swal.fire({
                                title : "삭제 실패",
                                text : "잠시 후 다시 시도해 주세요.",
                                icon : "error"
                            })
                        }
                    })
                } 
                return <div key={"faq"+index} className="faq-content-box">
                    <div className="faq-title-box">
                    <div className="faq-title-wrap" onClick={showFaqContent}>
                        {<p className="faq-title">{faq.faqTitle}</p>}
                        <span className="material-icons">expand_more</span>
                    </div>
                        <div className="faq-btn-box">
                            <button onClick={()=>{
                                navigate(`/faq/faqUpdate/${faq.faqNo}/${categoryIndex}`)
                            }}>수정</button>
                            <button onClick={deleteFaq}>삭제</button>
                        </div>
                    </div>
                    {faq.faqContent ?
                    <div className="faq-content">
                        <p>{faq.faqContent}</p>
                    </div>
                    : ""}
                </div>
            })}
        </>
    );
}

export default FaqList;