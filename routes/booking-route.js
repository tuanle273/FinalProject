const express = require("express");
const { response } = require("../index");
const router = express.Router();
const verifyToken = require("../middlewares/auth");
const Booking = require("../models/Booking");
const BookingController = require("../controllers/bookingController");

//@route GET api/Booking
// @desc get Booking
// @access Private

router.get("/", verifyToken, BookingController.getBooking);
router.get("/loadbookings", verifyToken, BookingController.loadBooking);

//@route PUT api/Booking
// @desc Update Booking
// @access Private

router.put("/:id", verifyToken, BookingController.updateBooking);

//@route Booking api/Booking
// @desc Create Booking
// @access Private

router.post("/", verifyToken, BookingController.createBooking);

//@route DELETE api/Booking
// @desc DELETE Booking
// @access Private

router.delete("/:id", verifyToken, BookingController.deleteBooking);

module.exports = router;
