import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      const response = await loginUser(email, password);

      if (response.token) {
        console.log("✅ Token received:", response.token);
        localStorage.setItem("token", response.token); // Store token

        // Double-check token storage before navigating
        if (localStorage.getItem("token")) {
          navigate("/dashboard");
        } else {
          setError("Failed to store authentication token.");
        }
      } else {
        setError(response.error || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      setError("Network error. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
