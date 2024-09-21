import axios from "axios";
import { useEffect, useState } from "react";

const FaqWrite = (props) => {
    const faqTypeList = props.faqTypeList;
    const [faqCategory, setFaqCategory] = useState(0);
    const [faq, setFaq] = useState({faqType : "", faqTitle : "", faqContent : ""});
    const changeValue = (e) => {
        setFaq({...faq,[e.target.id] : e.target.value})
    }
    return (faqTypeList ? 
        <div className="faq-write-wrap">
            <table>
                <tbody>
                    <tr>
                        <th colSpan={2}>
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
                                    })}
                                </select>
                            </div>
                        </th>
                    </tr>
                    <tr>
                        <th><label htmlFor="faqTitle">제목</label></th>
                        <td><input type="text" id="faqTitle" value={faq.faqTitle} onChange={changeValue}></input></td>
                    </tr>
                </tbody>
            </table>
        </div>
        : ""
    );
}

export default FaqWrite;