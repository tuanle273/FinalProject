const express = require("express");
const { response } = require("../index");
const router = express.Router();
const verifyToken = require("../middlewares/auth");
const Discount = require("../models/Discount");
const DiscountController = require("../controllers/DiscountController");

router.get("/", verifyToken, DiscountController.getDiscount);

router.put("/:id", verifyToken, DiscountController.updateDiscount);

router.post("/", verifyToken, DiscountController.createDiscount);

router.delete("/:id", verifyToken, DiscountController.deleteDiscount);

module.exports = router;
