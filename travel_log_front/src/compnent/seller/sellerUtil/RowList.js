import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";

const RowList = () => {
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100,
    maxColumns: 6,
  });

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rowHeight={25} {...data} />
    </div>
  );
};

export default RowList;
