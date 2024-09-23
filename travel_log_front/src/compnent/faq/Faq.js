import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "../faq/faq.css";
import { Link, NavLink, Route, Routes, useParams } from "react-router-dom";
import FaqWrite from "./FaqWrtie";
import { Quill } from "react-quill";

const Faq = () => {
    const backServer = process.env.REACT_APP_BACK_SERVER;
    const [menuState, setMenuState] = useState([]);
    const [faqTypeList, setFaqTypeList] = useState(null);
    useEffect(()=>{
        axios.get(`${backServer}/faq/faqType`).then((res)=>{
            for(let i=0;i<res.data.category.length;i++){
                menuState.push(false);
            }
            setMenuState([...menuState]);
            const arr = new Array;
            for(let i=0;i<res.data.category.length;i++){
                const category = res.data.category[i];
                const typeList = res.data.list.filter((item)=>{
                    return item.faqCategory === category;
                })
                const faqTypeList = {category, typeList : typeList};
                arr.push(faqTypeList);
            }
            setFaqTypeList(arr);
        }).catch((err)=>{
            console.log(err);
        })
    },[])
    return (faqTypeList ?
        <section className="faq-section">
            <div className="faq-wrap">
                <div className="faq-page-title"><h3>자주묻는질문</h3></div>
                <div className="faq-menu-bar">
                <Link to="faqWrite">글쓰기</Link>
                    {faqTypeList.map((faqType,index)=>{
                        return (<div key={"faqTypeCategory"+index}><ul  className="faq-main-menu" onClick={(e)=>{
                            menuState[index] = !menuState[index];
                            setMenuState([...menuState]);
                            e.currentTarget.nextSibling.classList.toggle("active");
                        }}><li>{faqType.category}</li>
                        <span className="material-icons">{menuState[index] ? "expand_less" : "expand_more"}</span>
                        </ul>
                        <ul className="faq-sub-menu">
                        {faqType.typeList.map((item,index)=>{
                             return (
                             <li key={`faqType+${index}`}><NavLink to={`faqList/${item.faqType}`}>{item.faqTypeName}</NavLink></li>
                             );
                            })
                        }
                        </ul>
                        </div>);
                    })}
                    
                </div>
                <div className="faq-content-wrap">
                    <Routes>
                        <Route path="faqList/:faqType" element={<FaqList/>}/>
                        <Route path="faqWrite" element={<FaqWrite faqTypeList={faqTypeList}/>}/>
                    </Routes>
                </div>
            </div>
        </section>
    : "");
}

const FaqList = () => {
    const backServer = process.env.REACT_APP_BACK_SERVER;
    const faqType = useParams().faqType;
    const [faqList, setFaqList] = useState([]);
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
                return <div key={"faq"+index} className="faq-content-box">
                    <div className="faq-title-wrap" onClick={showFaqContent}>
                        {<p className="faq-title">{faq.faqTitle}</p>}
                        
                        <span className="material-icons">expand_more</span>
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
export default Faq;