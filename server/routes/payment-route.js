const express = require("express");
const { response } = require("../index");
const router = express.Router();
const verifyToken = require("../middlewares/auth");
const Brand = require("../models/Brand");
const paypal = require("../utils/paypal.config");

router.post("/", verifyToken, paypal.createPayment);
router.post("/excute", verifyToken, paypal.executePayment);

module.exports = router;
