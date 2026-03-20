const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: String,
  address: String,
  price: Number,
  images: [String],
  agentEmail: String,
  agentPhone: String
}, { timestamps: true });

module.exports = mongoose.model("Property", propertySchema);
