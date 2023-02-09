const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },
  status: {
        type: String,
        enum: ['pending', 'approved', 'cancelled'],
        default: 'pending'
  },
  
  created_at: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Booking", bookingSchema);
