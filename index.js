const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const app = express();
const db = require("./config/db");
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

const PORT = process.env.PORT || 5000;

(async () => {
  await db.connectDb();
})();

app.listen(PORT, () => {
  console.log("Server started on http://localhost:" + PORT);
});
module.exports = app;
