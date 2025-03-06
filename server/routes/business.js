const express = require("express");
const auth = require("../middleware/auth");
const Business = require("../models/Business");

const router = express.Router();

// Create Business
router.post("/", auth, async (req, res) => {
  try {
    const business = new Business(req.body);
    await business.save();
    res.json(business);
  } catch (err) {
    res.status(500).json({ error: "Error creating business" });
  }
});

// Get All Businesses
router.get("/", async (req, res) => {
  const businesses = await Business.find();
  res.json(businesses);
});

module.exports = router;
