import { useState } from "react";
import UqillEditor from "../utils/UqillEditor";
import "./inquiry.css";

const InquiryWrite = (props) => {
    const [inquiryTitle, setinquiryTitle] = useState("");
    const [inquiryContent, setInquiryContent] = useState("");
    const [inquiryFile, setInquiryFile] = useState([]);
    const [showInquiryFile, setShowInquiryFile] = useState([]);
    const addInquiryFile = (e) => {
        const files = e.target.files;
        const fileArr = new Array();
        const filenameArr = new Array();
        for(let i=0;i<files.length;i++){
            fileArr.push(files[i]);
            filenameArr.push(files[i].name);
        }
        setInquiryFile([...inquiryFile, ...fileArr]);
        setShowInquiryFile([...showInquiryFile, ...filenameArr]);
    }
    const writeInquiry = () =>{

    }
    return (
        <div className="inquiry-write-wrap">
            <div className="inquiry-page-title"><h3>1:1문의</h3></div>
            <table>
                <tbody>
                    <tr>
                        <th style={{width : "30%"}}><label htmlFor="inquiryTitle">제목</label></th>
                        <td><input type="text" id="inquiryTitle" value={inquiryTitle} onChange={(e)=>{
                            setinquiryTitle(e.target.value);
                        }}></input></td>
                    </tr>
                    <tr>
                        <th>파일첨부</th>
                        <td><label className="inquiry-file" htmlFor="inquiry-file">파일선택</label><input type="file" id="inquiry-file" style={{display : "none"}} onChange={addInquiryFile} multiple></input></td>
                    </tr>
                    <tr>
                        <th>첨부파일 목록</th>
                        <td>{showInquiryFile.map((file,index)=>{
                            const deleteFile = () => {
                                showInquiryFile.splice(index,1);
                                inquiryFile.splice(index,1);
                                setShowInquiryFile([...showInquiryFile]);
                                setInquiryFile([...inquiryFile]);
                            }
                            return (
                                <div className="inquiry-file-wrap">
                                    <span className="">{file}</span>
                                    <span className="material-icons deleteInquiryFile" onClick={deleteFile}>delete</span>
                                </div>
                            );
                        })}</td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="inquiry-input-content"><UqillEditor boardContent={inquiryContent} setBoardContent={setInquiryContent} width={"100%"} /></td>
                    </tr>
                    <tr>
                        <td colSpan={2}><div className="inquiry-btn-wrap"><button className="inquiry-write-btn" onClick={writeInquiry}>문의하기</button></div></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default InquiryWrite;