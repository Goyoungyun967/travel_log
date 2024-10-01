import axios from "axios";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const MemberChart = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    axios
      .get(`${backServer}/admin/member/chart`)
      .then((res) => {
        console.log(res.data);
        for (let i = 0; i < 12; i++) {
          const data = {
            name: i + "월",
            올해: res.data.data1[i],
            작년: res.data.data2[i],
          };
          chartData.push(data);
        }
        console.log(chartData);
        setChartData([...chartData]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <LineChart
        width={700}
        height={400}
        data={chartData}
        margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="올해" stroke="#8884d8" />
        <Line type="monotone" dataKey="작년" stroke="#82ca9d" />
      </LineChart>
    </>
  );
};

export default MemberChart;
