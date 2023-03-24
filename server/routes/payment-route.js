const express = require("express");
const app = express();
const paypal = require("../utils/paypal.config");
const stripe = require("../utils/stripe.config");

app.post("/paypal", paypal.createPayment);
app.post("/stripe", stripe.createPayment);

module.exports = app;
