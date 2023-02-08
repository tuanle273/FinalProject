const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const authRouter = require("./routes/auth");
const vehicleRouter = require("./routes/vehicle");
const userRouter = require("./routes/user");
const app = express();
const db = require("./config/db");
app.use(express.json());
app.use(cors());

// Router
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/vehicle", vehicleRouter);

const PORT = process.env.PORT || 5000;

(async () => {
  await db.connectDb();
})();

app.listen(PORT, () => {
  console.log("Server started on http://localhost:" + PORT);
});
module.exports = app;
