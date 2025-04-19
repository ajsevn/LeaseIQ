import axios from "axios";

const BASE_URL = "http://localhost:5000"; // Adjust if backend runs on a different port

// Login API
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, { email, password });
    return response.data; // Expected: { access_token: "xyz" }
  } catch (error) {
    console.error("Login error:", error.response?.data?.message || error.message);
    return { error: error.response?.data?.message || "Login failed" };
  }
};

// Register API
export const registerUser = async (name, email, password) => {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {  // Use BASE_URL
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const contentType = res.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      return await res.json();
    } else {
      const rawText = await res.text();
      console.error("❌ Non-JSON response received:", rawText);
      return { error: "Server returned non-JSON response" };
    }
  } catch (err) {
    console.error("API Register error:", err);
    return { error: "Something went wrong" };
  }
};

// Analyze Data API (for JSON data)
export const analyzeData = async (data, prompt = "") => {
  try {
    const response = await axios.post(`${BASE_URL}/analyze`, { data, prompt }); // ✅ Fixed endpoint
    return response.data;
  } catch (error) {
    console.error("Analysis error:", error.response?.data?.error || error.message);
    return { error: "Analysis failed" };
  }
};

// Upload File API
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${BASE_URL}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("File upload error:", error.response?.data?.error || error.message);
    return { error: "File upload failed" };
  }
};

// Fetch RERA Data API
export const getReraData = async (region, visualization = "") => {
  try {
    const response = await axios.get(`${BASE_URL}/rera-data`, {
      params: { region, visualization },
    });
    return response.data;
  } catch (error) {
    console.error("RERA data fetch error:", error.response?.data?.error || error.message);
    return { error: "Failed to fetch RERA data" };
  }
};

// Export Processed Data API
export const downloadProcessedData = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/download`, data, {
      responseType: "blob", // ✅ Ensures correct file download format
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "processed_data.csv"); // ✅ Ensures correct filename
    document.body.appendChild(link);
    link.click();
    link.remove();
    
    return { success: true };
  } catch (error) {
    console.error("File download error:", error.response?.data?.error || error.message);
    return { error: "File download failed" };
  }
};

