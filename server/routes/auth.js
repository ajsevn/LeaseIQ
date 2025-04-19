const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");

require("dotenv").config();

const router = express.Router();

// REGISTER API
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "Email already in use" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to database
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Registration error:", error.message);
        res.status(500).json({ error: "Registration failed" });
    }
});

// LOGIN API - Generates JWT
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Log the incoming request data
        console.log("Received login request with:", { email, password });

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found");
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Log the hashed password from the database
        console.log("JWT_SECRET from env:", process.env.JWT_SECRET);
        console.log("Hashed password from database:", user.password);
        console.log("Password being compared:", password);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Password mismatch");
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET, // Use the environment variable
            { expiresIn: "1h" } // Hardcoded expiration for testing
        );

        console.log("Login successful, token generated");
        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ error: "Login failed" });
    }
});

// GET PROFILE - Protected Route
router.get("/profile", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json(user);
    } catch (error) {
        console.error("Profile error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
