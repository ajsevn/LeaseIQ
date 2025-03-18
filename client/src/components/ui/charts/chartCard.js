import React from "react";
import { Bar, Pie } from "react-chartjs-2";

const ChartCard = ({ title, data, type }) => {
  return (
    <div className="chart-card">
      <h3>{title}</h3>
      {type === "bar" ? (
        <Bar data={data} options={{ responsive: true, plugins: { legend: { display: false } } }} />
      ) : (
        <Pie data={data} options={{ responsive: true, plugins: { legend: { display: false } } }} />
      )}
    </div>
  );
};

export default ChartCard;
