import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { state: "Maharashtra", count: 68 },
  { state: "Karnataka", count: 55 },
  { state: "Gujarat", count: 48 },
  { state: "Tamil Nadu", count: 42 },
  { state: "Delhi", count: 33 },
  { state: "UP", count: 30 },
  { state: "Telangana", count: 25 },
  { state: "WB", count: 18 },
  { state: "Others", count: 10 },
];

const LeaseBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, bottom: 10, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="state" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#007bff" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default LeaseBarChart;
