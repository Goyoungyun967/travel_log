import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ComposedChart,
  PieChart,
  Pie,
  Cell,
  Text,
} from "recharts";

const SellerChart = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [sellerList, setSellerList] = useState(null);
  const [sellerNo, setSellerNo] = useState(0);
  const [type, setType] = useState("year");
  const [month, setMonth] = useState("1");
  const [sellerListSales, setSellerListSales] = useState(null);
  const [sellerSales, setSellerSales] = useState(null);
  const [sellerSalesGender, setSellerSalesGender] = useState(null);
  const [sellerSalesAge, setSellerSalesAge] = useState(null);
  const years = new Array();
  const months = new Array();
  (() => {
    const date = new Date();
    const year = date.getFullYear();
    for (let i = 0; i < 5; i++) {
      years.push(String(year - i));
    }
    for (let i = 0; i < 12; i++) {
      months.push(String(i + 1));
    }
  })();
  const [year, setYear] = useState(years[0]);
  useEffect(() => {
    axios
      .get(`${backServer}/admin/seller/list`)
      .then((res) => {
        setSellerList(res.data);
        setSellerNo(res.data[0].sellerNo);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    const date =
      type === "year"
        ? year
        : year + (Number(month) < 10 ? "0" + month : month);
    axios
      .get(`${backServer}/admin/seller/sales/${type}/${date}`)
      .then((res) => {
        const newChartData = new Array();
        res.data.forEach((item) => {
          const data = {
            name: item.businessName,
            매출: item.sales,
          };
          newChartData.push(data);
        });
        setSellerListSales(newChartData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [type, year, month]);
  useEffect(() => {
    axios
      .get(`${backServer}/admin/seller/sales/${sellerNo}`)
      .then((res) => {
        const newChartData = new Array();
        const date = new Date();
        const year = date.getFullYear() - 2000;
        for (let i = 0; i < 12; i++) {
          const data = {
            name: i + 1 + "월",
            올해총매출: 0,
            작년총매출: 0,
            올해: 0,
            작년: 0,
          };
          newChartData.push(data);
        }
        res.data.forEach((item, i) => {
          const index =
            Number(item.date.substr(5, 1)) === 0
              ? Number(item.date.substr(6, 1)) - 1
              : Number(item.date.substr(5, 2)) - 1;
          if (Number(item.date.substr(2, 2)) === year) {
            newChartData[index].올해 = item.sales;
            newChartData[index].올해총매출 = item.sum;
          } else {
            newChartData[index].작년 = item.sales;
            newChartData[index].작년총매출 = item.sum;
          }
          if (i === res.data.length - 1 && index !== 11) {
            for (let j = 0; j < newChartData.length - index; j++) {
              if (Number(item.date.substr(2, 2)) === year) {
                newChartData[j + index].올해총매출 = item.sum;
              } else {
                newChartData[j + index].작년총매출 = item.sum;
              }
            }
          }
        });
        setSellerSales(newChartData);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${backServer}/admin/seller/sales/gender/${sellerNo}`)
      .then((res) => {
        const newChartData = new Array();
        res.data.forEach((item) => {
          const data = { name: item.gender, value: item.sales };
          newChartData.push(data);
        });
        setSellerSalesGender(newChartData);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${backServer}/admin/seller/sales/age/${sellerNo}`)
      .then((res) => {
        const newChartData = new Array();
        res.data.forEach((item, index) => {
          const data = { name: item.age, value: item.sales };
          newChartData.push(data);
        });
        setSellerSalesAge(newChartData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [sellerNo]);
  const COLORS = [
    "#FFBB28",
    "#0088FE",
    "#00C49F",
    "#8a42ff",
    "#FF8042",
    "#6a398f",
    "#9e9b9b",
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <Text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </Text>
    );
  };
  const cutStr = (str) => {
    if (str.length > 3) {
      return str.substr(0, 3) + "...";
    } else {
      return str;
    }
  };
  return (
    <>
      <div className="chart-select-box">
        <FormControl style={{ width: "200px" }}>
          <InputLabel id="types">조건 선택</InputLabel>
          <Select
            labelId="types"
            id="type"
            value={type}
            label="type"
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <MenuItem value={"year"}>연도별</MenuItem>
            <MenuItem value={"month"}>월별</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={{ width: "200px" }}>
          <InputLabel id="years">연도</InputLabel>
          <Select
            labelId="years"
            id="years"
            value={year}
            label="year"
            onChange={(e) => {
              setYear(e.target.value);
            }}
          >
            {years.map((item, index) => {
              return (
                <MenuItem key={`years+${index}`} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        {type === "month" ? (
          <>
            <FormControl style={{ width: "200px" }}>
              <InputLabel id="months">월</InputLabel>
              <Select
                labelId="months"
                id="month"
                value={month}
                label="month"
                onChange={(e) => {
                  setMonth(e.target.value);
                }}
              >
                {months.map((item, index) => {
                  return (
                    <MenuItem key={`months+${index}`} value={item}>
                      {`${item}월`}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </>
        ) : (
          ""
        )}
      </div>
      {sellerListSales ? (
        <BarChart
          width={800}
          height={450}
          data={sellerListSales}
          margin={{ top: 40, right: 20, left: 40, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            label={{ value: "(단위 : 천원)", position: "left", offset: 0 }}
          />
          <YAxis
            label={{
              value:
                type === "year"
                  ? year.substr(2, 2) + "년 매출"
                  : year.substr(2, 2) + "년" + month + "월 매출",
              offset: 17,
              position: "top",
            }}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="매출" barSize={25} fill="#8884d8" />
        </BarChart>
      ) : (
        ""
      )}
      {sellerList ? (
        <>
          <FormControl style={{ width: "200px", marginTop: "50px" }}>
            <InputLabel id="sellerList">판매자 선택</InputLabel>
            <Select
              labelId="sellerList"
              id="sellerList"
              value={sellerNo}
              label="sellerNo"
              onChange={(e) => {
                setSellerNo(e.target.value);
              }}
            >
              {sellerList.map((seller, index) => {
                return (
                  <MenuItem
                    key={`sellerNo+chart+${index}`}
                    value={seller.sellerNo}
                  >
                    {seller.businessName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <ComposedChart
            width={800}
            height={450}
            data={sellerSales}
            margin={{ top: 40, right: 20, left: 40, bottom: 30 }}
          >
            <XAxis
              dataKey="name"
              label={{
                value: "(단위 : 천원)",
                position: "left",
                offset: 0,
              }}
            />
            <YAxis
              label={{
                value: `${cutStr(
                  sellerList[
                    sellerList.findIndex((obj) => obj.sellerNo === sellerNo)
                  ].businessName
                )} 매출`,
                offset: 17,
                position: "top",
              }}
            />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#f5f5f5" />
            <Bar dataKey="작년" barSize={20} fill="#413ea0" />
            <Bar dataKey="올해" barSize={20} fill="#ff8e99" />
            <Line type="monotone" dataKey="작년총매출" stroke="#82ca9d" />
            <Line type="monotone" dataKey="올해총매출" stroke="#ff7300" />
          </ComposedChart>
        </>
      ) : (
        ""
      )}
      <div className="pie-chart">
        <PieChart width={400} height={400}>
          <Legend layout="vertical" verticalAlign="top" align="top" />
          <Tooltip />
          <Pie
            data={sellerSalesAge}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            dataKey="value"
          >
            {sellerSalesAge
              ? sellerSalesAge.map((item, index) => (
                  <Cell key={`age-cell-${index}`} fill={COLORS[index]} />
                ))
              : ""}
          </Pie>
        </PieChart>
        <PieChart width={400} height={400}>
          <Legend layout="vertical" verticalAlign="top" align="top" />
          <Tooltip />
          <Pie
            data={sellerSalesGender}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            dataKey="value"
          >
            <Cell fill="#ff8e99" />
            <Cell fill="#413ea0" />
          </Pie>
        </PieChart>
      </div>
    </>
  );
};

export default SellerChart;
