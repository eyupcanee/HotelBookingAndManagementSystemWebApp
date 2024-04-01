import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Chart.css";

const data = [
  {
    name: "Ocak",
    rezervasyon: 200,
  },
  {
    name: "Şubat",
    rezervasyon: 120,
  },
  {
    name: "Mart",
    rezervasyon: 200,
  },
  {
    name: "Nisan",
    rezervasyon: 278,
  },
  {
    name: "Mayıs",
    rezervasyon: 189,
  },
  {
    name: "Haziran",
    rezervasyon: 239,
  },
  {
    name: "Temmuz",
    rezervasyon: 349,
  },
];

const Chart = () => {
  return (
    <div className="chart">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Line type="monotone" dataKey="rezervasyon" stroke="#ffda85" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
