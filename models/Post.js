const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
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
  model_year: {
    type: String,
    default: "",
  },
  capacity: {
    type: Number,
    default: "",
  },
  rate: {
    type: String,
    default: "",
  },
  seat: {
    type: Number,
    default: "",
  },
  transmission: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    required: true,
    enum: ["to learn", "leaning", "complete"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = mongoose.model("posts", PostSchema);
