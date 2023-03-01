const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
  title: {
    type: String,
  },
  model: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  platenumber: {
    type: String,
    default: "",
  },
  year: {
    type: Number,
    default: "",
  },
  capacity: {
    type: Number,
    default: "",
  },
  rate: {
    type: Number,
    default: "",
  },
  seat: {
    type: Number,
    default: "",
  },
  transmission: {
    type: String,
  },
  price: {
    type: Number,
  },
  type: {
    type: String,
    default: "Car",
  },
  availability: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/duax5havz/image/upload/v1675608212/istockphoto-1131164548-612x612_tta6jg.jpg",
  },
});

module.exports = mongoose.model("Vehicle", VehicleSchema);
