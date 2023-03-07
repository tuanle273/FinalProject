const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require('body-parser');
const cors = require("cors");
const authRouter = require("./routes/auth");
const vehicleRouter = require("./routes/vehicle");
const bookingRouter = require("./routes/booking");
const session = require("express-session");
const passport = require("passport");

const userRouter = require("./routes/user");
const app = express();
const db = require("./config/db");
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "25mb" }));

app.use(
  session({
    secret: "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",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Router
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/vehicle", vehicleRouter);
app.use("/api/booking", bookingRouter);

const PORT = process.env.PORT || 5000;

(async () => {
  await db.connectDb();
})();

app.listen(PORT, () => {
  console.log("Server started on http://localhost:" + PORT);
});
module.exports = app;
