import React from "react";
import Select from "react-select";

const Filters = ({ region, setRegion, options, setSelectedField }) => {
  return (
    <div className="filters">
      <div className="filter-group">
        <label>Select Region:</label>
        <Select
          options={options}
          value={options.find((option) => option.value === region)}
          onChange={(selected) => setRegion(selected.value)}
        />
      </div>

      <div className="filter-group">
        <label>Select Field:</label>
        <Select options={options} onChange={(selected) => setSelectedField(selected.value)} />
      </div>

      <button className="fetch-btn">Fetch Data</button>
    </div>
  );
};

export default Filters;
