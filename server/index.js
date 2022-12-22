const express = require("express");
const dotenv = require("dotenv");
const authRouter = require("./routes/auth");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const db = mongoose.connection;
const postRouter = require("./routes/post");
const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

dotenv.config();
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected!"));
db.on("error", (err) => {
  console.log("DB connection error:", err.message);
});

app.listen(PORT, () => {
  console.log("Server started on http://localhost:" + PORT);
});

module.exports = app;
