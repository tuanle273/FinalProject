const express = require("express");
const { response } = require("../index");
const router = express.Router();
const verifyToken = require("../middlewares/auth");
const Brand = require("../models/Brand");
const BrandController = require("../controllers/BrandController");

router.get("/", verifyToken, BrandController.getVehicleBrand);

router.put("/:id", verifyToken, BrandController.updateBrand);

router.post("/", verifyToken, BrandController.createBrand);

router.delete("/:id", verifyToken, BrandController.deleteBrand);

module.exports = router;
