const express = require("express");
const { response } = require("../index");
const router = express.Router();
const verifyToken = require("../middlewares/auth");
const Vehicle = require("../models/Vehicle");
const vehicleController = require("../controllers/VehicleController");

//@route GET api/Vehicle
// @desc get Vehicle
// @access Private

router.get("/", verifyToken, vehicleController.getVehicle);

router.get("/searchvehicle", verifyToken, vehicleController.searchVehicle);
//@route GET api/Vehicle/:id
// @desc get Vehicledetail
// @access Private

router.get("/:id", verifyToken, vehicleController.getVehicleDetails);

//@route PUT api/Vehicle
// @desc Update Vehicle
// @access Private

router.put("/:id", verifyToken, vehicleController.updateVehicle);

//@route Vehicle api/Vehicle
// @desc Create Vehicle
// @access Private

router.post("/", verifyToken, vehicleController.createVehicle);

//@route DELETE api/Vehicle
// @desc DELETE Vehicle
// @access Private

router.delete("/:id", verifyToken, vehicleController.deleteVehicle);

module.exports = router;
