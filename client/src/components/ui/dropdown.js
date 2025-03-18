// Dropdown.js
import React from "react";
import Select from "react-select";

const Dropdown = ({ onFieldChange }) => {
  const fieldOptions = [
    { value: "area_of_plot(in_sqmts)", label: "Area Of Plot (in Sqmts)" },
    { value: "cases_count", label: "Cases Count" },
    { value: "complaints_count", label: "Complaints Count" },
    { value: "date_last_modified", label: "Date Last Modified" },
    { value: "district", label: "District" },
    { value: "extended_date_of_completion", label: "Extended Date Of Completion" },
    { value: "location_lat_long", label: "Location Lat/Long" },
    { value: "location_pin_code", label: "Location Pin Code" },
    { value: "number_of_appartments", label: "Number Of Apartments" },
    { value: "number_of_basements", label: "Number Of Basements" },
    { value: "number_of_booked_appartments", label: "Number Of Booked Apartments" },
    { value: "number_of_closed_parking", label: "Number Of Closed Parking" },
    { value: "number_of_plinth", label: "Number Of Plinth" },
    { value: "number_of_plots", label: "Number Of Plots" },
    { value: "number_of_plots_booked_/_alloted_/_sold", label: "Number Of Plots Booked / Alloted / Sold" },
    { value: "number_of_podiums", label: "Number Of Podiums" },
    { value: "number_of_sanctioned_floors", label: "Number Of Sanctioned Floors" },
    { value: "number_of_stilts", label: "Number Of Stilts" },
    { value: "project_area_(sqmts)", label: "Project Area (Sqmts)" },
    { value: "project_name", label: "Project Name" },
    { value: "project_status", label: "Project Status" },
    { value: "project_type", label: "Project Type" },
    { value: "promoter_name", label: "Promoter Name" },
    { value: "proposed_date_of_completion", label: "Proposed Date Of Completion" },
    { value: "recreational_open_space", label: "Recreational Open Space" },
    { value: "rera_id", label: "RERA ID" },
    { value: "revised_proposed_date_of_completion", label: "Revised Proposed Date Of Completion" },
    { value: "sanctioned_fsi", label: "Sanctioned FSI" },
    { value: "total_no__of_open_parking_as_per_sanctioned_plan_(4-wheeler+2-wheeler)", label: "Total No. Of Open Parking (4-Wheeler + 2-Wheeler)" }
  ];

  return (
    <Select
      options={fieldOptions}
      onChange={(selected) => onFieldChange(selected.value)}
      placeholder="Select Field"
      className="md:w-auto"
    />
  );
};

export default Dropdown;
