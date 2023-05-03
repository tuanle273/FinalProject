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
    min: 0,
    max: 1,
  },

});

module.exports = mongoose.model("Discount", DiscountSchema);
