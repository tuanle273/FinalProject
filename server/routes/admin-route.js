const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/auth");
const chartController = require("../controllers/chartController");

router.get("/countbooking", verifyToken, chartController.countBooking);

router.get("/countdiscount", verifyToken, chartController.countDiscount);

router.get("/countuser", verifyToken, chartController.countUser);

router.get("/countvehicle", verifyToken, chartController.countVehicle);

module.exports = router;
