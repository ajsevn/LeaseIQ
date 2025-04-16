const express = require("express");
const path = require("path");
const router = express.Router();

// Sample route
router.get("/", (req, res) => {
    res.json({ message: "Welcome to the Business API!" });
});

router.use(express.static(path.join(__dirname, "../../client/build")));

router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;
