const express = require("express");
const app = express();

const stripe = require("../utils/stripe.config");
const paypal = require("../utils/paypal.config");
app.post("/stripe", stripe.createPayment);
app.get("/gettransaction", stripe.getAllTransactions);
app.post("/paypal", paypal.createPayment);

module.exports = app;
