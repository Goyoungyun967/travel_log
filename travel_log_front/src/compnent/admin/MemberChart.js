import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { createChart, downloadWorkbook } from "../utils/ExcelChart";

const MemberChart = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [enrollData, setEnrollData] = useState([]);
  const [memberData, setMemberData] = useState([]);
  const [regions, setRegions] = useState(null);
  const [region, setRegion] = useState("서울");
  const [regionData, setRegionData] = useState([]);
  const [regionsData, setRegionsData] = useState([]);
  const getChartData = (data, setChartData) => {
    const newMemberData = new Array();
    for (let i = 0; i < 7; i++) {
      const data = {
        name: i + 1 !== 7 ? i + 1 + "0대" : i + 1 + "0대 이상",
        총이용자: 0,
        남성: 0,
        여성: 0,
      };
      newMemberData.push(data);
    }
    data.forEach((item) => {
      const index = newMemberData.findIndex((obj) => obj.name === item.age);
      item.gender === "m"
        ? (newMemberData[index].남성 = item.memberCount)
        : (newMemberData[index].여성 = item.memberCount);
      newMemberData[index].총이용자 += item.memberCount;
    });
    setChartData(newMemberData);
  };
  useEffect(() => {
    axios
      .get(`${backServer}/admin/member/enroll`)
      .then((res) => {
        const newChartData = new Array();
        for (let i = 0; i < 12; i++) {
          const data = {
            name: i + 1 + "월",
            올해: 0,
            작년: 0,
          };
          newChartData.push(data);
        }
        const date = new Date();
        const year = date.getFullYear();
        res.data.forEach((item) => {
          const index =
            Number(item.date.substr(5, 1)) === 0
              ? Number(item.date.substr(6, 1)) - 1
              : Number(item.date.substr(5, 2)) - 1;
          Number(item.date.substr(0, 4)) === year
            ? (newChartData[index].올해 = item.enrollCount)
            : (newChartData[index].작년 = item.enrollCount);
        });
        setEnrollData(newChartData);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${backServer}/admin/lodgment/region`)
      .then((res) => {
        setRegions(res.data);
        axios
          .get(`${backServer}/admin/lodgment/region/member`)
          .then((response) => {
            const newChartData = new Array();
            for (let i = 0; i < res.data.length; i++) {
              const data = {
                name: res.data[i],
                이용자수: 0,
              };
              newChartData.push(data);
            }
            response.data.forEach((item) => {
              const index = newChartData.findIndex(
                (obj) => obj.name === item.region
              );
              newChartData[index].이용자수 = item.memberCount;
            });
            setRegionsData(newChartData);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${backServer}/admin/member/age/gender`)
      .then((res) => {
        getChartData(res.data, setMemberData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${backServer}/admin/lodgment/region/member/${region}`)
      .then((res) => {
        getChartData(res.data, setRegionData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [region]);
  return (
    <>
      <div className="enroll-chart">
        <button
          className="excel-down"
          onClick={(e) => {
            const target = e.currentTarget.nextSibling;
            const chart = [target];
            downloadWorkbook(chart, enrollData);
          }}
        >
          엑셀파일
        </button>
        <LineChart
          width={800}
          height={450}
          data={enrollData}
          margin={{ top: 30, right: 10, left: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            label={{
              value: "가입자수",
              offset: 17,
              position: "top",
            }}
            domain={[0, (dataMax) => Math.floor(dataMax * 1.5)]}
          />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="올해" stroke="#8884d8" />
          <Line type="monotone" dataKey="작년" stroke="#82ca9d" />
        </LineChart>
      </div>
      <div className="member-chart">
        <button
          className="excel-down"
          onClick={(e) => {
            const target = e.currentTarget.nextSibling;
            const chart = [target];
            downloadWorkbook(chart, memberData);
          }}
        >
          엑셀파일
        </button>
        <ComposedChart
          width={800}
          height={450}
          data={memberData}
          margin={{ top: 40, right: 20, left: 20, bottom: 30 }}
        >
          <XAxis dataKey="name" />
          <YAxis
            label={{
              value: "이용자수",
              offset: 17,
              position: "top",
            }}
            domain={[0, (dataMax) => Math.floor(dataMax * 1.5)]}
          />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#f5f5f5" />
          <Bar dataKey="남성" barSize={20} fill="#413ea0" />
          <Bar dataKey="여성" barSize={20} fill="#ff8e99" />
          <Bar dataKey="총이용자" barSize={20} fill="#ff7300" />
        </ComposedChart>
      </div>
      <div className="regions-chart">
        <button
          className="excel-down"
          onClick={(e) => {
            const target = e.currentTarget.nextSibling;
            const chart = [target];
            downloadWorkbook(chart, regionsData);
          }}
        >
          엑셀파일
        </button>
        <BarChart
          width={800}
          height={450}
          data={regionsData}
          margin={{ top: 40, right: 20, left: 20, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            label={{
              value: "지역별 이용자",
              offset: 17,
              position: "top",
            }}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="이용자수" barSize={25} fill="#8884d8" />
        </BarChart>
      </div>
      {regions ? (
        <FormControl style={{ width: "200px", marginTop: "50px" }}>
          <InputLabel id="regions">지역 선택</InputLabel>
          <Select
            labelId="regions"
            id="regions"
            value={region}
            label="region"
            onChange={(e) => {
              setRegion(e.target.value);
            }}
          >
            {regions.map((region, index) => {
              return (
                <MenuItem key={`region+${index}`} value={region}>
                  {region}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      ) : (
        ""
      )}
      <div className="regions-chart">
        <button
          className="excel-down"
          onClick={(e) => {
            const target = e.currentTarget.nextSibling;
            const chart = [target];
            downloadWorkbook(chart, regionData);
          }}
        >
          엑셀파일
        </button>
        <ComposedChart
          width={800}
          height={450}
          data={regionData}
          margin={{ top: 40, right: 20, left: 20, bottom: 30 }}
        >
          <XAxis dataKey="name" />
          <YAxis
            label={{
              value: `${region} 이용자수`,
              offset: 17,
              position: "top",
            }}
          />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#f5f5f5" />
          <Bar dataKey="남성" barSize={20} fill="#413ea0" />
          <Bar dataKey="여성" barSize={20} fill="#ff8e99" />
          <Line type="monotone" dataKey="총이용자" stroke="#ff7300" />
        </ComposedChart>
      </div>
    </>
  );
};

export default MemberChart;
