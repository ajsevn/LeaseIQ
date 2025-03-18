import React from "react";

const DataTable = () => {
  const data = [
    { city: "Mumbai", leaseType: "Commercial", term: "12 months", risk: "Low Utilization" },
    { city: "Pune", leaseType: "Residential", term: "24 months", risk: "Outgrowing Space" },
    { city: "Delhi", leaseType: "Office", term: "36 months", risk: "Favorable Location" },
  ];

  return (
    <div className="data-table">
      <table>
        <thead>
          <tr>
            <th>Property & City</th>
            <th>Lease & Type</th>
            <th>Term</th>
            <th>Risk</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.city}</td>
              <td>{row.leaseType}</td>
              <td>{row.term}</td>
              <td className={`risk-label ${row.risk.replace(/\s+/g, "-").toLowerCase()}`}>{row.risk}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
