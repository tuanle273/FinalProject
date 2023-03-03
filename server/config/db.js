const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const db = mongoose.connection;

const connectDb = async () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB Connected Successfully!"));
  db.on("error", (err) => {
    console.log("DB connection error:", err.message);
    process.exit(1);
  });
};

module.exports = {
  connectDb,
};
