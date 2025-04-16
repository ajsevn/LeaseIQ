import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const ChartComponent = ({ data }) => {
  if (!data || !data.columns || !data.row_count)
    return <p>No chart data available</p>;

  // Generate a colorful dataset
  const colors = [
    "rgba(75, 192, 192, 0.2)",
    "rgba(108, 214, 214, 0.76)",
    "rgba(11, 61, 61, 0.87)",
    "rgba(75, 192, 192, 0.99)",
  ];
  const chartData = data.columns.slice(0, 5).map((col, index) => ({
    name: col,
    value: Math.floor(Math.random() * 100),
    fill: colors[index % colors.length], // Assign colors dynamically
  }));

  return (
    <div className="chart-box">
      <h3 className="chart-title">📊 Data Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;
