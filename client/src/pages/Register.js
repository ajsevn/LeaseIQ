import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api"; // You'll need to define this in your api.js
import "../styles/Login.css";
import LoginBg from "../components/image/login-bg.jpg";

const Register = () => {
  const [name, setName] = useState(""); // New field for registration
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await registerUser(name, email, password);
      if (response.message) {
        navigate("/login");
      } else {
        setError(response.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("❌ Registration error:", err);
      setError("Network error. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      {/* Left Side (Image) */}
      <div className="login-image" style={{ backgroundImage: `url(${LoginBg})` }}></div>

      {/* Right Side (Register Form) */}
      <div className="login-form-container">
        <h2>Create Account</h2>
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">Register</button>
        </form>

        <div className="social-login">
          <p>Or sign up with</p>
          <button className="facebook-btn">Facebook</button>
          <button className="google-btn">Google</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
