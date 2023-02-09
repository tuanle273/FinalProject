const express = require("express");
const { response } = require("../index");
const router = express.Router();
const verifyToken = require("../middlewares/auth");
const Vehicle = require("../models/Vehicle");
const VehicleController = require("./VehicleController");

const getVehicle = async (req, res) => {
  try {
    const Vehicles = await Vehicle.find({ Vehicle });
    res.json({
      success: true,
      message: "Vehicle found",
      Vehicles,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateVehicle = async (req, res) => {
  Vehicle.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedVehicle) => {
      if (err) {
        res.status(500).send({ error: err });
      } else {
        res.json({
          success: true,
          message: "Update Vehicle Success!",
          vehicle: updatedVehicle,
        });
      }
    }
  );
};

const createVehicle = async (req, res) => {
  const newVehicle = new Vehicle(req.body);

  newVehicle.save((err, savedVehicle) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.json({
        success: true,
        message: "Add Vehicle Success!",
        vehicle: newVehicle,
      });
    }
  });
};

const deleteVehicle = async (req, res) => {
  Vehicle.findByIdAndRemove(req.params.id, (err, deletedVehicle) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.json({
        success: true,
        message: "Delete Successfully",
        deletedVehicle,
      });
    }
  });
};
module.exports = {
  getVehicle,
  updateVehicle,
  createVehicle,
  deleteVehicle,
};
