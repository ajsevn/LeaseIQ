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
        const {
            name,
            email,
            password
        } = req.body;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to database
        const user = new User({
            name,
            email,
            password: hashedPassword
        });
        await user.save();

        res.json({
            message: "User registered successfully!"
        });
    } catch (error) {
        res.status(500).json({
            error: "Registration failed"
        });
    }
});

//Login and JWT Request
router.post("/login", async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        // Find user by email
        const user = await User.findOne({
            email
        });
        if (!user) return res.status(400).json({
            error: "User not found"
        });

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({
            error: "Invalid credentials"
        });

        // Generate JWT token
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRY
        });

        res.json({
            token
        });
    } catch (error) {
        res.status(500).json({
            error: "Login failed"
        });
    }
});

//Validating auth

router.get("/profile", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({
                error: "User not found"
            });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({
            error: "Server error"
        });
    }
});

//follow up routes here

module.exports = router;
