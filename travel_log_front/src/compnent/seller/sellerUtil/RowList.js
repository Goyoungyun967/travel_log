import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// 판매자 매출 정보 리스트
const RowList = (props) => {
  const stmInfo = props.stmInfo;
  console.log(stmInfo);
  //   const [filterModel, setFilterModel] = useState({ items: [] }); 만약 여기서 필터를 조회하고 싶으면 사용하기

  // 행 넣기
  const rows = stmInfo.map((item, i) => ({
    id: i + 1,
    date: ` ${item.stmDate}`,
    name: Number(item.stmPrice),
  }));

  // 열 지정
  const columns = [
    { field: "date", headerName: "날짜", width: 500, filterable: false },
    { field: "name", headerName: "(월)매출", width: 400, filterable: false },
  ];

  // 필터 조회하고 싶으면 사용하기(필터 막아놓음)
  //   const handleFilterModelChange = (model) => {
  //     setFilterModel(model);
  //     console.log("현재 필터 모델:", model);
  //     // 여기서 필터링된 정보를 처리할 수 있습니다.
  //     // 예: 필터링된 데이터 가져오기
  //   };
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rowHeight={25}
        rows={rows}
        columns={columns}
        // onFilterModelChange={handleFilterModelChange}
      />
    </div>
  );
};

// 판매자 문의 글 리스트
const SellerInqList = (props) => {
  const navigate = useNavigate();
  const inqList = props.inqList;

  // html코드 안보이게
  const HtmlCellRenderer = (params) => {
    return <div dangerouslySetInnerHTML={{ __html: params.value }} />;
  };

  // 날짜 변환 (시 분 초 제거)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월 지정
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`; // 년-월-일 로..!
  };

  // map 돌려서 행 지정
  const rows = inqList.map((inq) => ({
    id: inq.inquiryNo,
    title: inq.inquiryTitle,
    content: inq.inquiryContent,
    date: formatDate(inq.regDate),
    hasReply: inq.inquiryReply != null ? "Yes" : "No", // 답변 처리 되어있음 Yes
  }));

  // 해당 행 클릭시 상세로 이동하게..
  const handleRowClick = (params) => {
    const inqNo = params.row.id;
    console.log(inqNo);
    navigate(`/seller/inqView/${inqNo}`);
  };

  return (
    <>
      <div>
        <DataGrid
          columns={[
            { field: "title", headerName: "제목", width: 200 },
            {
              field: "content",
              headerName: "내용",
              width: 300,
              renderCell: HtmlCellRenderer, // 커스텀 셀 렌더러 사용
            },
            { field: "date", headerName: "날짜", width: 150 },
            { field: "hasReply", headerName: "답변 유무", width: 150 },
          ]}
          rows={rows}
          pageSize={5} // 페이지당 5개 행 표시
          rowsPerPageOptions={5} // 사용자가 선택할 페이지 크기 옵션
          pagination // 페이지네이션 활성화
          disableSelectionOnClick // 클릭 선택 비활성화
          onRowClick={handleRowClick}
        />
      </div>
    </>
  );
};

// 판매자 예약 글 리스트
const SellerReserveList = (props) => {
  const navigate = useNavigate();
  const list = props.list;
  console.log(list);

  // 날짜 변환 함수 정의
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // map 돌려서 행 지정
  const rows = list.map((item, i) => ({
    id: item.bookingNo,
    memberId: item.memberId,
    lodgmentName: item.lodgmentName,
    roomName: item.roomName,
    date: formatDate(item.startDate) + "~" + formatDate(item.endDate),
    paymentDate: formatDate(item.paymentDate),
    status:
      item.status === 1
        ? "예약중"
        : item.status === 2
        ? "이용완료"
        : "예약취소", // 상태 업데이트
  }));

  // 해당 행 클릭시 상세로 이동하게..
  const handleRowClick = (params) => {
    const inqNo = params.row.id;
    console.log(inqNo);
    navigate(`/seller/reserve/${inqNo}`);
  };
  return (
    <>
      <div>
        <DataGrid
          columns={[
            { field: "memberId", headerName: "회원 아이디", width: 100 },
            {
              field: "lodgmentName",
              headerName: "호텔 이름",
              width: 200,
            },
            { field: "roomName", headerName: "방 이름", width: 150 },
            { field: "date", headerName: "머무는 날", width: 200 },
            { field: "paymentDate", headerName: "결제일", width: 150 },
            { field: "status", headerName: "상태", width: 150 },
          ]}
          rows={rows}
          pageSize={5} // 페이지당 5개 행 표시
          rowsPerPageOptions={5} // 사용자가 선택할 페이지 크기 옵션
          pagination // 페이지네이션 활성화
          disableSelectionOnClick // 클릭 선택 비활성화
          onRowClick={handleRowClick}
        />
      </div>
    </>
  );
};
export { RowList, SellerInqList, SellerReserveList };
