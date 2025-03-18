import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/Home.css"; // Scoped styles
import ColumnAnalysis from "../components/ColumnAnalysis";

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };
  const isAuthenticated = !!localStorage.getItem("token");
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/dashboard"); // Redirect to dashboard if authenticated
    } else {
      navigate("/login"); // Redirect to login if not authenticated
    }
  };

  const features = [
    {
      title: "Data-Driven Insights",
      description: "Get real-time analytics on real estate trends.",
    },
    {
      title: "AI-Powered Analysis",
      description: "Leverage machine learning for accurate predictions.",
    },
    {
      title: "Seamless Reports",
      description: "Generate detailed reports with a single click.",
    },
    {
      title: "Market Comparisons",
      description: "Compare properties across various locations.",
    },
    {
      title: "Investment Insights",
      description: "Get personalized investment recommendations.",
    },
    {
      title: "Lease Tracking",
      description: "Track lease agreements with ease.",
    },
  ];

  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(features.length / itemsPerPage);
  const paginatedFeatures = features.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="home-container">
      {/* Hero Section with Overlay */}
      <div className="home-hero">
        <Slider {...settings} className="home-carousel">
          <div>
            <img
              src="/images/banner1.png"
              alt="Slide 1"
              className="home-slide-img full-width"
            />
          </div>
          <div>
            <img
              src="/images/banner2.png"
              alt="Slide 2"
              className="home-slide-img full-width"
            />
          </div>
          <div>
            <img
              src="/images/banner3.png"
              alt="Slide 3"
              className="home-slide-img full-width"
            />
          </div>
        </Slider>
        <div className="home-hero-overlay">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="home-title"
          >
            Welcome to LeaseIQ
          </motion.h1>
          <p className="home-subtitle">
            Your AI-powered real estate analytics platform
          </p>
          <button className="home-button" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      </div>

      {/* Feature Cards with Pagination */}
      <div className="home-features">
        {paginatedFeatures.map((feature, index) => (
          <motion.div
            key={index}
            className="home-card"
            whileHover={{ scale: 1.05 }}
          >
            <Card className="home-card-inner">
              <CardContent>
                <h2 className="home-card-title">{feature.title}</h2>
                <p className="home-card-desc">{feature.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="home-pagination">
        <Button
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </Button>
        <span className="home-page-info">
          Page {currentPage + 1} of {totalPages}
        </span>
        <Button
          disabled={currentPage === totalPages - 1}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </Button>
      </div>
      <div className="container-fluid">
      <ColumnAnalysis />
      </div>
    </div>
  );
};

export default Home;
