import { useEffect, useState } from "react";
import axios from "../api/axios"; // Ensure axios is correctly configured

const BusinessList = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBusinesses = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/business");
        setBusinesses(res.data);
      } catch (err) {
        setError("Failed to load businesses");
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  const analyzeData = async () => {
    if (businesses.length === 0) {
      alert("No business data available for analysis!");
      return;
    }

    try {
      const res = await axios.post("/analyze", { businesses });
      alert(`Average Revenue: ${res.data.average_revenue} USD`);
    } catch (err) {
      alert("Analysis failed!");
    }
  };
  
  return (
    <div>
      <h2>Business List</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {businesses.map((biz) => (
          <li key={biz._id}>{biz.name} - {biz.revenue} USD</li>
        ))}
      </ul>
      <button onClick={analyzeData} disabled={loading || businesses.length === 0}>
        Analyze Business Data
      </button>
    </div>
  );
};

export default BusinessList;
