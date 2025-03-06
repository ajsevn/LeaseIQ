const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/analyze", async (req, res) => {
  try {
    const response = await axios.post("http://localhost:5001/analyze", req.body);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Analysis failed" });
  }
});

module.exports = router;
