import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { FaHome, FaSignInAlt, FaUpload, FaTachometerAlt, FaBars, FaTimes } from "react-icons/fa";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Upload from "./pages/Upload";
import "./styles/Navbar.css"; // Ensure CSS is imported

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        {/* Navbar */}
        <nav className="navbar">
          <div className="navbar-logo">LeaseIQ</div>
          <button className="menu-toggle" onClick={() => setIsNavOpen(!isNavOpen)}>
            {isNavOpen ? <FaTimes /> : <FaBars />}
          </button>
          <div className={`navbar-links ${isNavOpen ? "open" : ""}`}>
            <Link to="/" className="nav-link"><FaHome className="nav-icon" /> Home</Link>
            <Link to="/login" className="nav-link"><FaSignInAlt className="nav-icon" /> Login</Link>
            <Link to="/upload" className="nav-link"><FaUpload className="nav-icon" /> Upload</Link>
            <Link to="/dashboard" className="nav-link"><FaTachometerAlt className="nav-icon" /> Dashboard</Link>
          </div>
        </nav>
        {/* Routes */}
        <div className="flex-grow flex items-center justify-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function Home() {
  return <h1 className="text-2xl font-bold">Welcome to LeaseIQ</h1>;
}

export default App;
