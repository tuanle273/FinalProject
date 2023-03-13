const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiscountSchema = new Schema({
  code: {
    type: String,
  },
  name: {
    type: String,
  },
  amount: {
    type: Number,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
});

module.exports = mongoose.model("Discount", DiscountSchema);
