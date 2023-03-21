const express = require("express");
const { response } = require("../index");
const router = express.Router();

const Discount = require("../models/Discount");

const getDiscount = async (req, res) => {
  try {
    const discount = await Discount.find({ Discount });

    res.json({
      discount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const checkDiscountCode = async (req, res) => {
  const { code } = req.body;
  try {
    const discount = await Discount.findOne({ code });

    res.json({ success: true, discount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateDiscount = async (req, res) => {
  Discount.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedDiscount) => {
      if (err) {
        res.status(500).send({ error: err });
      } else {
        res.json({
          success: true,
          message: "Update Discount Success!",
          Discount: updatedDiscount,
        });
      }
    }
  );
};

const createDiscount = async (req, res) => {
  const newDiscount = new Discount(req.body);

  newDiscount.save((err, savedDiscount) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.json({
        success: true,
        message: "Add Discount Success!",
        Discount: newDiscount,
      });
    }
  });
};
const deleteDiscount = async (req, res) => {
  Discount.findByIdAndRemove(req.params.id, (err, deletedDiscount) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.json({
        success: true,
        message: "Delete Successfully",
        deletedDiscount,
      });
    }
  });
};
module.exports = {
  getDiscount,
  deleteDiscount,
  createDiscount,
  updateDiscount,
  checkDiscountCode,
};
