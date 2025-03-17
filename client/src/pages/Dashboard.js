import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Dropdown from "../components/ui/dropdown";
import { Bar, Pie } from "react-chartjs-2";  // Add this import for the Pie Chart
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const BASE_URL = "http://localhost:5001";

const Dashboard = () => {
  const [region, setRegion] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedField, setSelectedField] = useState("cases_count"); // Default field
  const navigate = useNavigate();

  
  useEffect(() => {
    console.log("Selected Field:", selectedField);
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate],[selectedField]);

  const fetchReraData = async () => {
    if (!region) {
      setError("Please select a region.");
      return;
    }
    setLoading(true);
    setError(null);
  
    try {
      const response = await axios.get(`${BASE_URL}/rera-data`, {
        params: { region },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
  
      console.log("✅ Raw API Response:", response.data);
  
      let rawData = response.data;
  
      // 🔹 Step 1: Check if the response is a string and preprocess if necessary
      if (typeof rawData === "string") {
        try {
          // Replace occurrences of NaN with null to make the data valid JSON
          rawData = rawData.replace(/NaN/g, "null");
  
          // Try to parse the raw data into JSON
          rawData = JSON.parse(rawData);
          console.log("✅ Parsed API Response:", rawData);
        } catch (error) {
          console.error("❌ Error Parsing JSON:", error.message);
          setError("Invalid JSON format received from the API.");
          return; // Exit early if parsing fails
        }
      }
  
      // 🔹 Step 2: Check if rawData is an array (or valid object) after parsing
      if (!Array.isArray(rawData)) {
        console.error("❌ Invalid data format: Expected an array but got:", typeof rawData);
        setError("Invalid data format received from the API.");
        return; // Exit early if data format is incorrect
      }
  
      // 🔹 Step 3: Sanitize and filter out invalid data
      const sanitizedData = rawData
  .filter((item, index) => {
    // Check if the item is an object and has a valid structure
    if (!item || typeof item !== "object" || item[selectedField] === undefined || item[selectedField] === null) {
      console.warn(`⚠️ Skipping invalid data at index ${index}:`, item);
      return false;
    }

    // Parse the selected field value to a number and check if it's valid
    let value = parseFloat(item[selectedField]);
    if (isNaN(value) || value < 0) {
      console.warn(`⚠️ Skipping invalid data at index ${index} with value: ${item[selectedField]}`);
      return false;
    }

    return true;
  })
  .map((item) => ({
    district: item.district || "Unknown",
    category: selectedField || "Unknown", // Default category if district is missing
    value: parseFloat(item[selectedField]) || 0, // Ensure numerical format and default to 0 if NaN
  }));

console.log("✅ Sanitized & Formatted Data:", sanitizedData);
console.log('Sanitized Data:', sanitizedData);  

// 🔹 Step 4: Check if there's valid data after sanitization
if (sanitizedData.length === 0) {
  throw new Error("No valid data found after filtering.");
}

setData(sanitizedData);

  
      setData(sanitizedData);
    } catch (err) {
      console.error("❌ Error Processing Data:", err);
      setError(err.message || "Failed to fetch RERA data.");
    } finally {
      setLoading(false);
    }
  };
  
  const pieChartData = {
    labels: data.map((item) => `${item.district}: ${selectedField}`),  // Show both category and selected field value
    datasets: [
      {
        label: selectedField.replace(/_/g, " "),  // Dynamically update label based on selected field
        data: data.map((item) => item.value),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)', 
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
      },
    ],
  };
  
  const chartData = {
    labels: data.map((item) => `${item.district}: ${selectedField}`),  // Show both category and selected field value
    datasets: [
      {
        label: selectedField.replace(/_/g, " "),  // Dynamically update label based on selected field
        data: data.map((item) => item.value),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  

  return (
    <div className="rera-dashboard-container p-6 bg-white shadow-lg rounded-md w-full max-w-4xl">
  <h2 className="rera-dashboard-title text-2xl font-semibold mb-4 text-center text-gray-800">RERA Data Dashboard</h2>

  <div className="rera-dashboard-filters mb-6 mt-4 flex gap-4 items-center justify-between sm:flex-col md:flex-row">
    <div className="rera-dashboard-region flex items-center gap-2">
      <label className="rera-dashboard-label font-medium text-gray-600">Select Region:</label>
      <select
        className="rera-dashboard-select p-2 border rounded-md w-full md:w-auto text-gray-800"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
      >
        <option value="">-- Select --</option>
        <option value="mumbai-city">Mumbai City</option>
        <option value="thane">Thane</option>
        <option value="pune">Pune</option>
      </select>
    </div>

    <div className="rera-dashboard-field flex items-center gap-2">
      <label className="rera-dashboard-label font-medium text-gray-600">Select Field:</label>
      <Dropdown onFieldChange={setSelectedField} />
    </div>

    <button
      className="rera-dashboard-button p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
      onClick={fetchReraData}
    >
      Fetch Data
    </button>
  </div>

  {loading && <div className="rera-dashboard-loading text-center p-4 bg-gray-200 rounded-md">Loading...</div>}
  {error && <div className="rera-dashboard-error p-4 bg-red-500 text-white rounded-md text-center">{error}</div>}

  {data.length > 0 ? (
    <div className="rera-dashboard-charts mt-6">
      {/* Bar Chart */}
      <h3 className="rera-dashboard-chart-title text-lg font-semibold mb-4 mt-6 text-gray-800">📊 Bar Chart - {selectedField.replace(/_/g, " ")}</h3>
      <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />

      {/* Pie Chart */}
      <h3 className="rera-dashboard-chart-title text-lg font-semibold mb-4 mt-6 text-gray-800">🍰 Pie Chart - {selectedField.replace(/_/g, " ")}</h3>
      <div className="rera-dashboard-pie-chart">
        <Pie data={pieChartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
      </div>
    </div>
  ) : (
    <p className="text-center text-gray-500">No data to display</p>
  )}
</div>


  );
};

export default Dashboard;
