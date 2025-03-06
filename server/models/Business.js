const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema({
  name: String,
  industry: String,
  revenue: Number,
  employees: Number,
  location: String
}, { timestamps: true });

module.exports = mongoose.model("Business", BusinessSchema);
