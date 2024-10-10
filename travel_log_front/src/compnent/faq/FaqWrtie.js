import axios from "axios";
import { useEffect, useState } from "react";
import UqillEditor from "../utils/UqillEditor";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const FaqWrite = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const faqNo = useParams().faqNo;
  const categoryIndex = useParams().categoryIndex;
  const faqTypeList = props.faqTypeList;
  //const [faqTypeList,setFaqTypeList] = useState(null);
  /*
    useEffect(()=>{
        const newFaqTypeList = new Array();
        for(let i=0;i<list.length;i++){
            const arr = new Array();
            for(let j=0;j<list[i].typeList.length;j++){
                const faqType = {faqTypeName : list[i].typeList[j].faqTypeName};
                arr.push(faqType);
            }
            const faqCategory = {categoryName : list[i].category, category : list[i].typeList[0].faqType.substring(0,1),typeList : arr};
            newFaqTypeList.push(faqCategory);
        }
        setFaqTypeList(newFaqTypeList);
    },[])
    */

  const [faqCategoryIndex, setFaqCategoryIndex] = useState(
    categoryIndex ? Number(categoryIndex) : 0
  );
  const [faq, setFaq] = useState({ faqType: "L1", faqTitle: "" });
  const [faqContent, setFaqContent] = useState("");
  const navigate = useNavigate();
  const changeValue = (e) => {
    setFaq({ ...faq, [e.target.id]: e.target.value });
  };
  useEffect(() => {
    if (faqNo) {
      axios
        .get(`${backServer}/admin/faq/${faqNo}`)
        .then((res) => {
          setFaq(res.data);
          setFaqContent(res.data.faqContent);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setFaq({ faqType: "L1", faqTitle: "" });
      setFaqContent("");
      setFaqCategoryIndex(0);
    }
  }, [faqNo]);

  const writeFaq = () => {
    const writeFaq = { ...faq, faqContent };
    axios
      .post(`${backServer}/admin/faq`, writeFaq)
      .then((res) => {
        if (res.data > 0) {
          Swal.fire({
            title: "작성 완료",
            text: "작성이 완료 되었습니다.",
            icon: "success",
          }).then(() => {
            navigate(`/faq/faqList/${faq.faqType}/${faqCategoryIndex}`);
          });
        } else {
          Swal.fire({
            title: "작성 실패",
            text: "잠시 후 다시 시도해주세요.",
            icon: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateFaq = () => {
    const updateFaq = { ...faq, faqContent };
    axios
      .patch(`${backServer}/admin/faq`, updateFaq)
      .then((res) => {
        if (res.data > 0) {
          Swal.fire({
            title: "수정 완료",
            text: "수정이 완료 되었습니다.",
            icon: "success",
          }).then(() => {
            navigate(`/faq/faqList/${faq.faqType}/${faqCategoryIndex}`);
          });
        } else {
          Swal.fire({
            title: "수정 실패",
            text: "잠시 후 다시 시도해주세요.",
            icon: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return faqTypeList ? (
    <div className="faq-write-wrap">
      <table>
        <tbody>
          <tr>
            <td colSpan={2}>
              {/*faqTypeList.map((category,index)=>{
                                    return <div key={`faq-category-${index}`} className="input-item">
                                        <select id="faqCategory" value={faq.faqType.substring(0,1)} onChange={(e)=>{
                                            const newFaqType  = e.target.value+faq.faqType.substring(0,2);
                                            setFaq({...faq, faqType : newFaqType})
                                        }}>
                                            <option value={category.category}>{category.categoryName}</option>
                                        </select>
                                        <select id="faqType" value={faq.faqType.substring(1,1)} onChange={(e)=>{
                                            const newFaqType  = faq.faqType.substring(1,1)+e.target.value;
                                            console.log(newFaqType);
                                            setFaq({...faq, faqType : newFaqType})
                                        }}>
                                            {category.typeList.map((type,i)=>{
                                                return <option key={`faq-type-${i}`} value={i}>{type.faqTypeName}</option>
                                            })}
                                        </select>
                                    </div>
                            })*/}
              {
                <div className="input-item">
                  <select
                    id="faqCategory"
                    value={faqCategoryIndex}
                    onChange={(e) => {
                      setFaqCategoryIndex(e.target.value);
                      setFaq({
                        ...faq,
                        faqType:
                          faqTypeList[e.target.value].typeList[0].faqType,
                      });
                    }}
                  >
                    {faqTypeList.map((item, index) => {
                      return (
                        <option key={`faqCategoryInput+${index}`} value={index}>
                          {item.category}
                        </option>
                      );
                    })}
                  </select>
                  <select
                    id="faqType"
                    value={faq.faqType}
                    onChange={changeValue}
                  >
                    {faqTypeList[faqCategoryIndex].typeList.map(
                      (typeList, index) => {
                        return (
                          <option
                            key={`faqTypeInput+${index}`}
                            value={typeList.faqType}
                          >
                            {typeList.faqTypeName}
                          </option>
                        );
                      }
                    )}
                  </select>
                </div>
              }
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="faqTitle">제목</label>
            </th>
            <td>
              <input
                type="text"
                id="faqTitle"
                value={faq.faqTitle}
                onChange={changeValue}
              ></input>
            </td>
          </tr>
          <tr>
            <td colSpan={2} className="faq-input-content">
              <UqillEditor
                boardContent={faqContent}
                setBoardContent={setFaqContent}
                width={"100%"}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <div className="faq-btn-wrap">
                <button
                  className="faq-write-btn"
                  onClick={faqNo ? updateFaq : writeFaq}
                >
                  {faqNo ? "수정하기" : "작성하기"}
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ) : (
    ""
  );
};

export default FaqWrite;
