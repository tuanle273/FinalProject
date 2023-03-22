const express = require("express");
const router = express.Router();
const paypal = require("../utils/paypal.config");
const stripe = require("../utils/stripe.config");

router.post("/paypal", paypal.createPayment);
router.post("/stripe", stripe.createPayment);

module.exports = router;
