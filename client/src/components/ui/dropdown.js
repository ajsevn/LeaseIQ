// Dropdown.js
import React from "react";

const Dropdown = ({ onFieldChange }) => {
  const fieldOptions = [
    "area_of_plot(in_sqmts)",
    "cases_count",
    "complaints_count",
    "date_last_modified",
    "district",
    "extended_date_of_completion",
    "location_lat_long",
    "location_pin_code",
    "number_of_appartments",
    "number_of_basements",
    "number_of_booked_appartments",
    "number_of_closed_parking",
    "number_of_plinth",
    "number_of_plots",
    "number_of_plots_booked_/_alloted_/_sold",
    "number_of_podiums",
    "number_of_sanctioned_floors",
    "number_of_stilts",
    "project_area_(sqmts)",
    "project_name",
    "project_status",
    "project_type",
    "promoter_name",
    "proposed_date_of_completion",
    "recreational_open_space",
    "rera_id",
    "revised_proposed_date_of_completion",
    "sanctioned_fsi",
    "total_no__of_open_parking_as_per_sanctioned_plan_(4-wheeler+2-wheeler)"
  ];

  return (
    <select onChange={(e) => onFieldChange(e.target.value)}>
      {fieldOptions.map((field, index) => (
        <option key={index} value={field}>
          {field.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
