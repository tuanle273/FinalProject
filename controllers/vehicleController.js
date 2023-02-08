const express = require("express");
const { response } = require("../index");
const router = express.Router();
const verifyToken = require("../middlewares/auth");
const Vehicle = require("../models/Vehicle");
const VehicleController = require("./VehicleController");

const getVehicle = async (req, res) => {
  try {
    const Vehicles = await Vehicle.find({ Vehicle });
    res.json({ success: true, Vehicles });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateVehicle = async (req, res) => {
  const { title, description, url, status } = req.body;
  if (!title)
    return res
      .status(404)
      .json({ success: false, message: "Title is required" });
  try {
    let updatedVehicle = {
      title,
      description: description || "",
      url: url.startsWith("https://") ? url : "https://" + url,
      status: status || "TO LEARN",
    };
    const VehicleUpdateCondition = {
      _id: req.params.id,
      user: req.userId,
    };

    updatedVehicle = await Vehicle.findOneAndUpdate(
      VehicleUpdateCondition,
      updatedVehicle,
      { new: true }
    );

    // user not authorized to update
    if (!updatedVehicle)
      return res
        .status(403)
        .json({ success: false, message: "User is not authorized to update" });
    res.json({
      success: true,
      message: "Happy Learning!",
      Vehicle: updatedVehicle,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const createVehicle = async (req, res) => {
  const { title, description, url, status } = req.body;

  if (!title)
    return res
      .status(404)
      .json({ success: false, message: "Title is required" });
  try {
    const newVehicle = new Vehicle({
      title,
      description,
      url: url.startsWith("https://") ? url : "https://" + url,
      status: status || "TO LEARN",
      user: req.userId,
    });
    await newVehicle.save();

    res.json({
      success: true,
      message: "Happy Learning!",
      vehicle: newVehicle,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const deleteVehicle = async (req, res) => {
  try {
    const VehicleDeleteCondition = { _id: req.params.id, user: req.userId };
    const deletedVehicle = await Vehicle.findOneAndDelete(
      VehicleDeleteCondition
    );

    if (deletedVehicle)
      return res.status(401).json({
        success: false,
        message: "Vehicle not found or user not authorized",
      });
    res.json({
      success: true,
      message: "Delete Successfully",
      Vehicle: deletedVehicle,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
module.exports = {
  getVehicle,
  updateVehicle,
  createVehicle,
  deleteVehicle,
};
