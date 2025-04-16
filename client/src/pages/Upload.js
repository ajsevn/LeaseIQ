import { useState } from "react";
import axios from "axios";
import {
  FaUpload,
  FaTable,
  FaChartBar,
  FaColumns,
  FaList,
} from "react-icons/fa";
import ChartComponent from "../components/ChartComponent";
const Upload = () => {
  const [file, setFile] = useState(null);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5001/upload",
        formData
      );

      if (response.data) {
        setInsights(response.data);
        setMessage("Upload successful! Insights generated.");
      } else {
        setMessage("No insights received.");
      }
    } catch (error) {
      setMessage("Error uploading file");
    }
  };

  const formatFieldName = (name) => {
    return name
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="upload-page">
      {/* Header */}
      <div className="header">
        <h2 className="main-title">
          <FaUpload /> Upload & Get Insights
        </h2>
        <p className="subtitle">
          Upload a CSV file to analyze the data and get insights instantly.
        </p>
      </div>

      {/* Why Use This? */}
      <div className="why-use">
        <h3 className="section-heading">Why Use This?</h3>
        <div className="features-grid">
          <div className="feature-card">
            <FaTable className="feature-icon" />
            <h3>Data Exploration</h3>
            <p>Analyze patterns and trends in your dataset.</p>
          </div>
          <div className="feature-card">
            <FaChartBar className="feature-icon" />
            <h3>Visual Insights</h3>
            <p>Get a graphical representation of correlations.</p>
          </div>
          <div className="feature-card">
            <FaColumns className="feature-icon" />
            <h3>Custom Reports</h3>
            <p>Generate detailed reports from your data.</p>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="upload-container">
        <input
          type="file"
          className="file-input"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          className="upload-btn"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? (
            "Uploading..."
          ) : (
            <>
              <FaUpload /> Upload & Analyze
            </>
          )}
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {/* Content Grid */}
      {insights && (
        <div className="content-grid">
          {/* Chart Section */}
          <div className="chart-container">
            <ChartComponent data={insights} />
          </div>

          {/* Insights Section */}
          <div className="insights-container">
            <div className="insight-card">
              <FaTable className="icon" />
              <p>
                <strong>Total Rows:</strong> {insights.row_count ?? "N/A"}
              </p>
            </div>
            <div className="insight-card">
              <FaColumns className="icon" />
              <p>
                <strong>Total Columns:</strong> {insights.column_count ?? "N/A"}
              </p>
            </div>
            <div className="insight-card">
              <FaList className="icon" />
              <p>
                <strong>Columns:</strong>{" "}
                {Array.isArray(insights.columns)
                  ? insights.columns.map(formatFieldName).join(", ")
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Preview Table */}

      {insights?.preview?.length > 0 && (
        <div className="preview-table-container">
          <h3 className="section-heading">🔍 Data Preview</h3>
          <table className="preview-table">
            <thead>
              <tr>
                {Object.keys(insights.preview[0]).map((key) => (
                  <th key={key}>{formatFieldName(key)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {insights.preview.map((row, idx) => (
                <tr key={idx}>
                  {Object.values(row).map((val, i) => (
                    <td key={i}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer */}
      <div className="footer">
        <p>Made with ❤️ to simplify data analysis</p>
      </div>
    </div>
  );
};

export default Upload;
