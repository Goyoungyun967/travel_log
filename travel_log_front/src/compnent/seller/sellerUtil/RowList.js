import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { useState } from "react";

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

const SellerInqList = () => {
  return (
    <Box sx={{ height: 250, width: "100%" }}>
      <DataGrid
        columns={[{ field: "username" }, { field: "age" }]}
        rows={[
          {
            id: 1,
            username: "@MUI",
            age: 20,
          },
        ]}
      />
    </Box>
  );
};
export { RowList, SellerInqList };
