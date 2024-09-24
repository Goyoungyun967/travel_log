import { useRef } from "react";
import ReactQuill from "react-quill";

const UqillEditor = (props) => {
  // 보여줄 내용
  const boardContent = props.boardContent;
  // 수정할 내용
  const setBoardContent = props.setBoardContent;
  const editorRef = useRef(null);
  //style 지정
  const width = props.width;
  const height = props.height;
  // 값이 바뀔때 마다 set
  const changeValue = () => {
    const editorData = editorRef.current.getInstance().getHTML();
    setBoardContent(editorData);
  };

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
      {boardContent || boardContent === "" ? (
        <ReactQuill
          ref={editorRef}
          value={boardContent}
          onChange={setBoardContent}
          style={{ width: width ? width :"700px", height: height ? height :"400px" }}
          modules={modules}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default UqillEditor;
