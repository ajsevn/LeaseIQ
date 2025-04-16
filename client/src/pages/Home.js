import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { motion } from "framer-motion";
import { Bar, Radar, Line, Pie } from 'react-chartjs-2';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/Home.css"; // Scoped styles

// Updated imports for new components and charts
import { PropertyPriceTrend } from "../components/ui/home/PropertyPriceTrend.js";
import KPIOverview from "../components/ui/home/KPIOverview.js";  
import MapView from "../components/ui/home/MapView.js";  
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, RadialLinearScale, PointElement, LineElement } from 'chart.js';
import chartCard from "../components/ui/charts/chartCard.js"


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, RadialLinearScale, PointElement, LineElement);

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

  const propertyPriceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'], // Example labels
    datasets: [
      {
        label: 'Property Price Trend',
        data: [100, 120, 140, 160], // Example data
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  const propertyDistributionData = {
    labels: ["Mumbai", "Delhi", "Bangalore", "Chennai"],
    datasets: [
      {
        data: [60, 30, 10, 5], // Data for each city
        backgroundColor: [
          "rgba(11, 61, 61, 0.87)", 
        "rgba(108, 214, 214, 0.76)",
        "rgba(75, 192, 192, 0.2)", 
        "rgba(75, 192, 192, 0.99)", 
        ],
        borderColor: [
         "rgba(75, 192, 192, 1)", // Solid teal (border)
        "rgba(75, 192, 192, 1)", // Solid teal (border)
        "rgba(75, 192, 192, 1)", // Solid teal (border)
        "rgba(75, 192, 192, 1)", // Solid teal (border)
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `₹${tooltipItem.raw.toLocaleString()}`;
          },
        },
      },
    },
  };

  const demandAreaData = {
    labels: ['Area 1', 'Area 2', 'Area 3', 'Area 4'],
    datasets: [
      {
        label: 'Demand Area Data',
        data: [50, 75, 30, 85], // example data
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  const priceTrendsData = {
    labels: ["Mumbai", "Delhi", "Bangalore", "Chennai"],
    datasets: [
      {
        label: "Average Price (INR)",
        data: [14500000, 9500000, 7500000, 6500000], // Approximate average prices for each city
        backgroundColor: [
        "rgba(75, 192, 192, 0.2)", 
        "rgba(108, 214, 214, 0.76)", 
        "rgba(11, 61, 61, 0.87)", 
        "rgba(75, 192, 192, 0.99)", 
      ],
      borderColor: [
        "rgba(75, 192, 192, 1)", // Solid teal (border)
        "rgba(75, 192, 192, 1)", // Solid teal (border)
        "rgba(75, 192, 192, 1)", // Solid teal (border)
        "rgba(75, 192, 192, 1)", // Solid teal (border)
      ],
        borderWidth: 1,
      },
    ],
  };
  
  // Example Data for Radar Chart (Market Comparison)
  const marketComparisonData = {
    labels: ['Mumbai', 'Pune', 'Bangalore', 'Delhi'],
    datasets: [
      {
        label: 'Market Comparison',
        data: [65, 59, 80, 81], // example data
        backgroundColor: 'rgba(179,181,198,0.2)',
        borderColor: 'rgba(179,181,198,1)',
        borderWidth: 1,
      },
    ],
  };

  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(features.length / itemsPerPage);
  const paginatedFeatures = features.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
<div className="home-container">
  {/* 🎯 Hero Section */}
  <div className="home-hero">
    <Slider {...settings} className="home-carousel">
      <div><img src="/images/banner1.png" alt="Banner 1" className="home-slide-img" /></div>
      <div><img src="/images/banner2.png" alt="Banner 2" className="home-slide-img" /></div>
      <div><img src="/images/banner3.png" alt="Banner 3" className="home-slide-img" /></div>
    </Slider>
    <div className="home-hero-overlay">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="home-title">
        LeaseIQ - Real Estate Analytics
      </motion.h1>
      <p className="home-subtitle">AI-powered insights and trends</p>
      <button className="home-button" onClick={handleGetStarted}>Explore Analytics</button>
    </div>
  </div>

  {/* 📊 Analytics Overview */}
  <div className="home-analytics-overview">
    <div className="home-analytics-card">
      <h3>Total Properties</h3>
      <div className="home-analytics-card-value">1,236</div>
    </div>
    <div className="home-analytics-card">
      <h3>Average Price</h3>
      <div className="home-analytics-card-value">₹45,00,000</div>
    </div>
    <div className="home-analytics-card">
      <h3>Active Listings</h3>
      <div className="home-analytics-card-value">345</div>
    </div>
    <div className="home-analytics-card">
      <h3>Market Trends</h3>
      <div className="home-analytics-card-value">Increasing</div>
    </div>
  </div>

  {/* 📈 Charts Section */}
<div className="home-chart-section">
  <div className="home-chart-row">
    <div className="home-chart-block">
      <h3 className="home-chart-title">Property Price Trend</h3>
      <Line data={propertyPriceData} options={chartOptions} className="home-chart" />
    </div>

    <div className="home-chart-block m-4">
      <h3 className="home-chart-title">Property Distribution</h3>
      <Pie data={propertyDistributionData} className="home-chart" />
    </div>
  </div>
</div>


  {/* 📊 Latest Insights */}
  <div className="home-insights-container">
    <h2 className="home-insights-title">Key Insights</h2>
    <div className="home-insights-cards">
      <div className="home-insight-card">
        <h4>High Demand Areas</h4>
        <p>Top areas based on property demand trends</p>
        <Bar data={demandAreaData} options={chartOptions} className="home-chart" />
      </div>
      <div className="home-insight-card">
        <h4>Market Comparison</h4>
        <p>Comparing real estate market performance across cities</p>
        <Radar data={marketComparisonData} options={chartOptions} className="home-chart" />
      </div>
      <div className="home-insight-card">
        <h4>Price Trends by Location</h4>
        <p>Comparison of price trends in various regions</p>
        <Line data={priceTrendsData} options={chartOptions} className="home-chart" />
      </div>
      <div className="home-insight-card">
      <h4>Price Trends by Location</h4>
      <p>Comparison of price trends in various cities</p>
      <Pie data={priceTrendsData} options={chartOptions} />
    </div>
    </div>
  </div>

  {/* 📊 Real Estate Heatmap */}
  <div className="home-map-container">
    <h2 className="home-map-title">Real Estate Heatmap</h2>
    <MapView />
  </div>

  {/* 🔻 Footer Divider */}
  <div className="section-divider"></div>
</div>


  );
};

export default Home;
