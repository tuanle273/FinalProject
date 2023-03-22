const express = require("express");
const Booking = require("../models/Booking");
const User = require("../models/User");
const Discount = require("../models/Discount");
const Vehicle = require("../models/Vehicle");
const countBooking = async (req, res) => {
  try {
    const bookings = await Booking.countDocuments();
    res.json({
      bookings,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const countUser = async (req, res) => {
  try {
    const user = await User.countDocuments();

    res.json({
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const countDiscount = async (req, res) => {
  try {
    const discount = await Discount.countDocuments();

    res.json({
      discount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const countVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.countDocuments();

    res.json({
      vehicle,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  countBooking,
  countUser,
  countDiscount,
  countVehicle,
};
