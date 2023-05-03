const express = require("express");

const router = express.Router();
const verifyToken = require("../middlewares/auth");

const DiscountController = require("../controllers/discountController");

router.get("/", verifyToken, DiscountController.getDiscount);

router.post("/checkcode", verifyToken, DiscountController.checkDiscountCode);

router.put("/:id", verifyToken, DiscountController.updateDiscount);

router.post("/", verifyToken, DiscountController.createDiscount);

router.delete("/:id", verifyToken, DiscountController.deleteDiscount);

module.exports = router;
