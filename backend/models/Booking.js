const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  // propertyId: String,
  // userEmail: String,
  // agentEmail: String
  names: String,
  email: String,
  phone: Number,
  reason: String,
  agentEmail: String
});

module.exports = mongoose.model("Booking", bookingSchema);
