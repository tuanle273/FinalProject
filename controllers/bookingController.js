const express = require("express");
const { response } = require("../index");
const router = express.Router();
const verifyToken = require("../middlewares/auth");
const Booking = require("../models/Booking");
const BookingController = require("./BookingController");

const getBooking = async (req, res) => {
  Booking.find({})
    // .populate("BookingId")
    .exec((err, bookings) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(bookings);
      }
    });
};

const updateBooking = async (req, res) => {
  Booking.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedBooking) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({
          success: true,
          message: "Update Booking Success!",
          Booking: updatedBooking,
        });
      }
    }
  );
};

const createBooking = async (req, res) => {
  const newBooking = new Booking(req.body);
  newBooking.save((err, savedBooking) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(savedBooking);
      res.json({
        success: true,
        message: "Add Booking Success!",
        Booking: newBooking,
      });
    }
  });
};

const deleteBooking = async (req, res) => {
  try {
    Booking.findByIdAndRemove(req.params.id, (err, deletedBooking) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(deletedBooking);
      }
    });

    res.json({
      success: true,
      message: "Delete Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
module.exports = {
  getBooking,
  updateBooking,
  createBooking,
  deleteBooking,
};
