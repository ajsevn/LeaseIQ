import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:5000"; // Ensure Flask backend is running here

const Dashboard = () => {
  const [region, setRegion] = useState(""); 
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
  }, [navigate]);

  const fetchReraData = async () => {
    if (!region) {
      setError("Please select a region.");
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      console.log(`🔍 Fetching RERA data for: ${region}`); // Debugging

      const response = await axios.get(`${BASE_URL}/rera-data`, {
        params: { region }, // No need to lowercase again (Flask already handles it)
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      console.log("✅ Data received:", response.data);
      setData(response.data);
    } catch (err) {
      console.error("❌ RERA data fetch error:", err.response);
      setError(err.response?.data?.error || "Failed to fetch RERA data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-2">RERA Data Dashboard</h2>

      {/* Region Selection Input */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Select Region:</label>
        <select
          className="p-2 border rounded-md"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="">-- Select --</option>
          <option value="mumbai-city">Mumbai City</option>
          <option value="thane">Thane</option>
          <option value="pune">Pune</option>
          {/* Add more regions as needed */}
        </select>
        <button
          className="ml-2 p-2 bg-blue-500 text-white rounded-md"
          onClick={fetchReraData}
        >
          Fetch Data
        </button>
      </div>

      {/* Loading State */}
      {loading && <div className="p-4 bg-gray-200 rounded-md">Loading...</div>}

      {/* Error Message */}
      {error && <div className="p-4 bg-red-500 text-white rounded-md">{error}</div>}

      {/* Display Data */}
      {data && (
        <pre className="bg-gray-200 p-2 rounded-md overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default Dashboard;
