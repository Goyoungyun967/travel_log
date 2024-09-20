import { useRef } from "react";
import ReactQuill from "react-quill";
const UqillEditor = () => {
  const quillRef = useRef(null);
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, false] }],
      ["bold", "underline", "italic", "strike"], // 글꼴 서식
      [{ list: "ordered" }, { list: "bullet" }], // 리스트
      [{ indent: "-1" }, { indent: "+1" }], // 들여쓰기
      [{ align: [] }], // 정렬
      ["clean"], // 서식 지우기
    ],
  };
  return (
    <>
      <ReactQuill
        ref={quillRef}
        style={{ width: "700px", height: "400px" }}
        modules={modules}
      />
    </>
  );
};

export default UqillEditor;
