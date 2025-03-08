import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Profile from "./pages/Profile";
import Upload from "./pages/Upload";
import { useState } from "react";
import axios from "axios";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <nav className="p-4 bg-blue-500 text-white w-full flex justify-center gap-4">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/upload">Upload Data</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return <h1 className="text-2xl font-bold">Welcome to the Data Visualization App</h1>;
}


export default App;
