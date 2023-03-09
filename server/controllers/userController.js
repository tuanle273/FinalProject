const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { response } = require("../index");
const Booking = require("../models/Booking");

const getAllUser = async (req, res) => {
  try {
    const Users = await User.find({ User });
    res.json({
      Users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getUser = async (req, res) => {
  try {
    const userDetail = await User.findById(req.userId);
    res.json({ success: true, userDetail });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateUser = async (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedUser) => {
      if (err) {
        res.status(500).send({ error: err });
      } else {
        res.json({
          success: true,
          message: "Update user Success!",
          userDetail: updatedUser,
        });
      }
    }
  );
};

const getHistory = async (req, res) => {
  try {
    const bookingDetail = await Booking.find({ userId: req.userId });
    res.json({ success: true, bookingDetail });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const authenticateRole = (requiredRoles) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN);
      const userRole = decodedToken.userRole;

      if (!requiredRoles.includes(userRole)) {
        return res.status(401).send("Unauthorized");
      }

      next();
    } catch (error) {
      return res.status(401).send("Unauthorized");
    }
  };
};

module.exports = {
  getUser,
  getHistory,
  authenticateRole,
  updateUser,
  getAllUser,
};
