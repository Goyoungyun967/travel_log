import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const SellerChart = (props) => {
  const stmInfo = props.stmInfo;
  console.log(stmInfo);
  //   const data = [
  //     { name: "Page A", uv: 4000 },
  //     { name: "Page B", uv: 3000 },
  //     { name: "Page C", uv: 2000 },
  //     { name: "Page D" },
  //     { name: "Page E", uv: 1890 },
  //     { name: "Page F", uv: 2390 },
  //     { name: "Page G", uv: 3490 },
  //   ];

  const data = stmInfo.map((item, i) => ({
    name: `${item.stmDate}`,
    가격: `${item.stmPrice}`,
  }));

  return (
    <div>
      <LineChart
        width={900}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 20, // 왼쪽 여백을 늘려서 그래프가 넘어가지 않게 함
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line
          connectNulls
          type="monotone"
          dataKey="가격"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </LineChart>
    </div>
  );
};

export default SellerChart;
