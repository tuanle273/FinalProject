const express = require("express");

const router = express.Router();
const verifyToken = require("../middlewares/auth");

const BrandController = require("../controllers/brandController");

router.get("/", verifyToken, BrandController.getVehicleBrand);

router.put("/:id", verifyToken, BrandController.updateBrand);

router.post("/", verifyToken, BrandController.createBrand);

router.delete("/:id", verifyToken, BrandController.deleteBrand);

module.exports = router;
