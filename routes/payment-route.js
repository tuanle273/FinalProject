const express = require("express");
const app = express();

const stripe = require("../utils/stripe.config");

app.post("/stripe", stripe.createPayment);

module.exports = app;
