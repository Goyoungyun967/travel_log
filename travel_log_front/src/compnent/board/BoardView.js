import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BoardView = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const boardNo = params.boardNo;
  const [board, setBoard] = useState({});

  useEffect(() => {
    axios
      .get(`${backServer}/board/boardNo/${boardNo}`)
      .then((res) => {
        console.log(res);
        setBoard(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [backServer, boardNo]);
  console.log(board);

  return (
    <div className="board-view-wrap">
      <div className="board-view-content">
        <div className="board-view-info">
          <div className="board-thumb">
            <img
              src={
                board.boardThumb
                  ? `${backServer}/board/thumb/${board.boardThumb}`
                  : "/image/lodgment_default_img.png"
              }
              className="img-board-view"
              alt="썸네일"
            />
          </div>

          <div className="board-view-preview">
            <div className="board-view-head">
              <span style={{ width: "30%" }}>{board.boardWriter} 닉네임</span>
              <span style={{ width: "30%" }}>{board.boardDate} 작성일</span>
            </div>
            <p className="file-title">첨부파일</p>
            <div className="file-zone">
              {board.fileList &&
                board.fileList.map((file, i) => (
                  <div className="board-file" key={i}>
                    <img
                      src={`${backServer}/board/file/${file.FileNo}`}
                      alt={file.filename}
                      className="img-board-view"
                      onError={(e) => {
                        e.target.onerror = null; // 무한 호출 방지
                        e.target.src = "/image/lodgment_default_img.png"; // 기본 이미지 설정
                      }}
                    />
                    <span className="file-name">{file.filename}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// const FileItem = ({ file }) => {
//   const backServer = process.env.REACT_APP_BACK_SERVER;

//   const filedown = () => {
//     axios
//       .get(`${backServer}/board/file/${file.boardFileNo}`, {
//         responseType: "blob",
//       })
//       .then((res) => {
//         const blob = new Blob([res.data]);
//         const fileObjectUrl = window.URL.createObjectURL(blob);
//         const link = document.createElement("a");
//         link.href = fileObjectUrl;
//         link.style.display = "none";
//         link.download = file.filename;
//         document.body.appendChild(link);
//         link.click();
//         link.remove();
//         window.URL.revokeObjectURL(fileObjectUrl);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return (
//     <div className="board-file">
//       <img
//         src={`${backServer}/board/file/${file.boardFileNo}`}
//         alt={file.filename}
//         className="img-board-view"
//         onError={(e) => {
//           e.target.onerror = null; // 무한 호출 방지
//           e.target.src = "/image/lodgment_default_img.png"; // 기본 이미지 설정
//         }}
//       />
//       <span className="file-name">{file.filename}</span>
//       <span className="material-icons file-icon" onClick={filedown}>
//         file_download
//       </span>
//     </div>
//   );
// };

export default BoardView;
