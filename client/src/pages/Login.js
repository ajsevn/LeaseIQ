import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import "../styles/Login.css"; // Ensure you add relevant styles
import LoginBg from "../components/image/login-bg.jpg"; // Import image

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await loginUser(email, password);
      if (response.token) {
        localStorage.setItem("token", response.token);
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
    <div className="login-container">
      {/* Left Side (Image) */}
      <div className="login-image" style={{ backgroundImage: `url(${LoginBg})` }}></div>

      {/* Right Side (Login Form) */}
      <div className="login-form-container">
        <h2>Welcome Back</h2>
        {error && <p className="text-red-500">{error}</p>}
        
        <form onSubmit={handleLogin}>
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

          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember Me
            </label>
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit" className="login-btn">Login</button>
        </form>

        {/* Social Login */}
        <div className="social-login">
          <p>Or sign in with</p>
          <button className="facebook-btn">Facebook</button>
          <button className="google-btn">Google</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
