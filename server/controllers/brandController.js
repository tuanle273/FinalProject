const express = require("express");
const { response } = require("../index");
const router = express.Router();

const Brand = require("../models/Brand");

const getVehicleBrand = async (req, res) => {
  try {
    const VehicleBrand = await Brand.find({ Brand });
    res.json({
      VehicleBrand,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const updateBrand = async (req, res) => {
  Brand.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedBrand) => {
      if (err) {
        res.status(500).send({ error: err });
      } else {
        res.json({
          success: true,
          message: "Update Brand Success!",
          Brand: updatedBrand,
        });
      }
    }
  );
};

const createBrand = async (req, res) => {
  const newBrand = new Brand(req.body);

  newBrand.save((err, savedBrand) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.json({
        success: true,
        message: "Add Brand Success!",
        Brand: newBrand,
      });
    }
  });
};
const deleteBrand = async (req, res) => {
  Brand.findByIdAndRemove(req.params.id, (err, deletedBrand) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.json({
        success: true,
        message: "Delete Successfully",
        deletedBrand,
      });
    }
  });
};

module.exports = {
  getVehicleBrand,
  updateBrand,
  deleteBrand,
  createBrand,
};
