const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const authRouter = require("./routes/auth");
const vehicleRouter = require("./routes/vehicle");
const bookingRouter = require("./routes/booking");
const session = require("express-session");
const passport = require("passport");

const userRouter = require("./routes/user");
const app = express();
const db = require("./config/db");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

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
