const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require("./routes/auth-route");
const vehicleRouter = require("./routes/vehicle-route");
const bookingRouter = require("./routes/booking-route");
const brandRouter = require("./routes/brand-route");
const discountRouter = require("./routes/discount-route");
const paymentRouter = require("./routes/payment-route");
const adminRouter = require("./routes/admin-route");
const session = require("express-session");
const passport = require("passport");

const userRouter = require("./routes/user-route");
const app = express();
const db = require("./config/db");
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

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
app.use("/api/brand", brandRouter);
app.use("/api/discount", discountRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/admin", adminRouter);

const PORT = process.env.PORT || 5000;

(async () => {
  await db.connectDb();
})();

app.listen(PORT, () => {
  console.log("Server started on http://localhost:" + PORT);
});
module.exports = app;
