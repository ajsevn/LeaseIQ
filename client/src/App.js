import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FaHome, FaSignInAlt, FaUpload, FaTachometerAlt, FaBars, FaTimes } from "react-icons/fa";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Upload from "./pages/Upload";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import "./styles/Navbar.css";

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token")); // Persist auth

  useEffect(() => {
    console.log("Is Authenticated:", isAuthenticated);
  }, [isAuthenticated]);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <>
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        {/* Navbar */}
        <nav className="navbar">
          <div className="navbar-logo">LeaseIQ</div>
          <button
            className="menu-toggle"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            {isNavOpen ? <FaTimes /> : <FaBars />}
          </button>
          <div className={`navbar-links ${isNavOpen ? "open" : ""}`}>
            <Link to="/" className="nav-link">
              <FaHome className="nav-icon" /> Home
            </Link>
            {!isAuthenticated ? (
              <Link to="/login" className="nav-link">
                <FaSignInAlt className="nav-icon" /> Login
              </Link>
            ) : (
              <>
                <Link to="/upload" className="nav-link">
                  <FaUpload className="nav-icon" /> Upload
                </Link>
                <Link to="/dashboard" className="nav-link">
                  <FaTachometerAlt className="nav-icon" /> Dashboard
                </Link>
                <a
                  onClick={handleLogout}
                  className="nav-link logout-btn"
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </a>
              </>
            )}
          </div>
        </nav>

        {/* Routes */}
        <div className="flex-grow flex items-center justify-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route path="/upload" element={<Upload />} />
            <Route
              path="/dashboard"
              element={<ProtectedRoute element={<Dashboard />} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
    <Footer/>
    </>
  );

}

export default App;
