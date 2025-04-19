const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/.env" });
console.log("🔐 Loaded JWT_SECRET:", process.env.JWT_SECRET);

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000", // Allow frontend
    credentials: true
}));

// Database Connection
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/leaseiqdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit if DB connection fails
  });

// Routes
const authRoutes = require("./routes/auth");
const businessRoutes = require("./routes/business");

app.use("/api/auth", authRoutes);
app.use("/api/business", businessRoutes);

// Health Check Route
app.get("/", (req, res) => res.send("🚀 Server is running..."));

// 404 Handler
app.use((req, res) => res.status(404).json({ error: "Not Found" }));

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("🔥 Server Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
