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
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  availability: {
    type: Boolean,
    required: true,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = mongoose.model("posts", PostSchema);
