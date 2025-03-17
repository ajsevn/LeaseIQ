import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";

const BASE_URL = "http://localhost:5001"; // Ensure Flask backend is running
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c"];

const Dashboard = () => {
  const [region, setRegion] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
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
      const response = await axios.get(`${BASE_URL}/rera-data`, {
        params: { region },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      
      console.log("API Raw Response:", response.data);
      
      const rawData = response.data;
      
      const formattedData = Array.isArray(rawData) 
        ? rawData.map(item => ({
            category: item.project_name || "Unknown",
            value: Number(item.number_of_appartments) || 0
          }))
        : [];
      
      console.log("Formatted Data:", formattedData);
      setData([...formattedData]);
    } catch (err) {
      console.error("API Fetch Error:", err);
      setError(err.response?.data?.error || "Failed to fetch RERA data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-md w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">📊 RERA Data Dashboard</h2>
      <div className="mb-6 flex gap-4 items-center">
        <label className="font-semibold">Select Region:</label>
        <select
          className="p-2 border rounded-md flex-1"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="">-- Select --</option>
          <option value="mumbai-city">Mumbai City</option>
          <option value="thane">Thane</option>
          <option value="pune">Pune</option>
        </select>
        <button
          className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={fetchReraData}
        >
          Fetch Data
        </button>
      </div>
      {loading && <div className="text-center p-4 bg-gray-200 rounded-md">Loading...</div>}
      {error && <div className="p-4 bg-red-500 text-white rounded-md text-center">{error}</div>}
      {data.length > 0 ? (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">📉 Data Visualization</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
          <h3 className="text-lg font-semibold mt-6">📝 Pie Chart Representation</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="category" cx="50%" cy="50%" outerRadius={100}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-center text-gray-500">No data to display</p>
      )}
    </div>
  );
};

export default Dashboard;
