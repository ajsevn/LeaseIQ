import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Dropdown from "../components/ui/dropdown";
import ColumnAnalysis from "../components/ColumnAnalysis";
import { Bar, Pie } from "react-chartjs-2"; // Add this import for the Pie Chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  FaMapMarkerAlt,
  FaChartBar,
  FaChartPie,
  FaInfoCircle,
} from "react-icons/fa";
import Select from "react-select";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const BASE_URL = "http://localhost:5001";

const Dashboard = () => {
  const [region, setRegion] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedField, setSelectedField] = useState("cases_count"); // Default field
  const navigate = useNavigate();

  const options = [
    { value: "dadra-daman", label: "Dadra Daman" },
    { value: "mumbai-city", label: "Mumbai City" },
    { value: "mumbai-suburban", label: "Mumbai Suburban" },
    { value: "nagpur", label: "Nagpur" },
    { value: "nashik", label: "Nashik" },
    { value: "others", label: "Others" },
    { value: "palghar", label: "Palghar" },
    { value: "pune", label: "Pune" },
    { value: "raigarh", label: "Raigarh" },
    { value: "thane", label: "Thane" },
  ];

  useEffect(
    () => {
      console.log("Selected Field:", selectedField);
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
    },
    [navigate],
    [selectedField]
  );

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
        console.error(
          "❌ Invalid data format: Expected an array but got:",
          typeof rawData
        );
        setError("Invalid data format received from the API.");
        return; // Exit early if data format is incorrect
      }

      // 🔹 Step 3: Sanitize and filter out invalid data
      const sanitizedData = rawData
        .filter((item, index) => {
          // Check if the item is an object and has a valid structure
          if (
            !item ||
            typeof item !== "object" ||
            item[selectedField] === undefined ||
            item[selectedField] === null
          ) {
            console.warn(`⚠️ Skipping invalid data at index ${index}:`, item);
            return false;
          }

          // Parse the selected field value to a number and check if it's valid
          let value = parseFloat(item[selectedField]);
          if (isNaN(value) || value < 0) {
            console.warn(
              `⚠️ Skipping invalid data at index ${index} with value: ${item[selectedField]}`
            );
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
      console.log("Sanitized Data:", sanitizedData);

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
    labels: data.map((item) => `${item.district}: ${selectedField}`), // Show both category and selected field value
    datasets: [
      {
        label: selectedField.replace(/_/g, " "), // Dynamically update label based on selected field
        data: data.map((item) => item.value),
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
      },
    ],
  };

  const chartData = {
    labels: data.map((item) => `${item.district}: ${selectedField}`), // Show both category and selected field value
    datasets: [
      {
        label: selectedField.replace(/_/g, " "), // Dynamically update label based on selected field
        data: data.map((item) => item.value),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      {/* 🎯 Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Explore RERA Data Insights</h1>
          <p>
            A dynamic dashboard to analyze and visualize real estate trends
            across multiple regions.
          </p>
        </div>
        <div className="hero-image">
          <img src="/images/2.png" alt="RERA Data" />
        </div>
      </section>

      {/* 🎯 Filters Section */}
      <div className="filters">
          <div className="filter-group">
            <label>
              <FaMapMarkerAlt className="icon" /> Select Region:
            </label>
            <Select
              options={options}
              value={options.find((option) => option.value === region)}
              onChange={(selected) => setRegion(selected.value)}
              className="custom-select"
              placeholder="Choose a region"
            />
          </div>

          <div className="filter-group col-6">
            <label>Select Field:</label>
            <Dropdown onFieldChange={setSelectedField} />
          </div>
        </div>
        <div className="row mt-2">
          <div className="fetch-container">
            <button className="fetch-btn" onClick={fetchReraData}>
              Fetch Data
            </button>
          </div>
        </div>

        {/* 🎯 Loading & Error Messages */}
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}

      {/* 🎯 Charts Section */}
      {data.length > 0 ? (
        <div className="charts-section">
          <div className="chart-card">
            <h3>
              <FaChartBar className="icon" /> Market Analysis - Bar Chart
            </h3>
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
              }}
            />
          </div>

          <div className="chart-card small">
            <h3>
              <FaChartPie className="icon" /> Regional Comparison - Pie Chart
            </h3>
            <Pie
              data={pieChartData}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
              }}
            />
          </div>
        </div>
      ) : (
        <p className="no-data">No data to display</p>
      )}

      {/* 🔹 Divider */}
      <div className="section-divider"></div>

      {/* 🔹 Divider */}
      <div className="section-divider"></div>

      {/* 🔹 Divider */}
      <div className="section-divider"></div>

      {/* 🔹 Static RERA Data Section */}
      <div className="static-rera-section mt-2">
        <h2>Real Estate Market Overview</h2>
        <div className="static-data-grid">
          <div className="static-card">
            <h3>Mumbai City</h3>
            <p>
              📈 Avg. Price per Sq.Ft: <strong>₹22,500</strong>
            </p>
            <p>
              🏗️ New Projects: <strong>120</strong>
            </p>
            <p>
              📊 Market Growth: <strong>5.4% (YoY)</strong>
            </p>
          </div>

          <div className="static-card">
            <h3>Pune</h3>
            <p>
              📈 Avg. Price per Sq.Ft: <strong>₹12,800</strong>
            </p>
            <p>
              🏗️ New Projects: <strong>85</strong>
            </p>
            <p>
              📊 Market Growth: <strong>4.1% (YoY)</strong>
            </p>
          </div>

          <div className="static-card">
            <h3>Thane</h3>
            <p>
              📈 Avg. Price per Sq.Ft: <strong>₹18,200</strong>
            </p>
            <p>
              🏗️ New Projects: <strong>102</strong>
            </p>
            <p>
              📊 Market Growth: <strong>3.9% (YoY)</strong>
            </p>
          </div>

          <div className="static-card">
            <h3>Nagpur</h3>
            <p>
              📈 Avg. Price per Sq.Ft: <strong>₹7,600</strong>
            </p>
            <p>
              🏗️ New Projects: <strong>67</strong>
            </p>
            <p>
              📊 Market Growth: <strong>2.7% (YoY)</strong>
            </p>
          </div>
        </div>
        <ColumnAnalysis />
      </div>
      {/* 🔹 Divider */}
      <div className="section-divider"></div>

      {/* Information Section */}
      <section className="info-section">
        <div className="info-card">
          <div className="info-icon-wrapper">
            <i className="info-icon fas fa-info-circle"></i>{" "}
            {/* Using FontAwesome for the icon */}
          </div>
          <h3>Understanding RERA Data</h3>
          <p>
            The Real Estate (Regulation and Development) Act ensures
            transparency in property transactions. Our platform empowers users
            to explore market trends and analyze regional shifts with up-to-date
            insights.
          </p>
        </div>

        <div className="info-card">
          <img
            src="/images/data-trend.png"
            alt="Market Trends"
            className="info-img"
          />
          <h3>Analyzing Market Trends</h3>
          <p>
            Get insights into pricing trends, project completions, and
            region-specific statistics. Our interactive charts allow you to
            compare historical data and make informed investment decisions.
          </p>
        </div>

        <div className="info-card">
          <img
            src="/images/1.png"
            alt="Empowering Decisions"
            className="info-img"
          />
          <h3>Empowering Your Decisions</h3>
          <p>
            Whether you're a buyer, investor, or researcher, our platform
            provides critical data to help you navigate the real estate market
            efficiently, ensuring informed decision-making at every step.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
