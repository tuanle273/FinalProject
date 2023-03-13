const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
  brand: {
    type: String,
  },
});

module.exports = mongoose.model("Brand", BrandSchema);
