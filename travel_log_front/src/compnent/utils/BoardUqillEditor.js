import { useEffect, useRef } from "react";
import ReactQuill from "react-quill";

const UqillEditor = (props) => {
  const { boardContent, setBoardContent } = props;
  const editorRef = useRef(null);

  const changeValue = (value) => {
    setBoardContent(value); // 텍스트 내용을 상태에 설정
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, false] }],
      ["bold", "underline", "italic", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["clean"],
    ],
  };

  // Quill Editor 초기화
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current
        .getEditor()
        .setContents(
          editorRef.current.getEditor().clipboard.convert(boardContent)
        );
    }
  }, [boardContent]);

  return (
    <ReactQuill
      ref={editorRef}
      value={boardContent}
      onChange={changeValue}
      style={{ width: "700px", height: "400px" }}
      modules={modules}
    />
  );
};

export default UqillEditor;
