const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { response } = require("../index");
const Booking = require("../models/Booking");
const fileUploader = require("../utils/cloudinary.config");
const csvtojson = require("csvtojson");
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

const uploadCSV = async (req, res) => {
  try {
    const csvString = req.body.csv; // assume csv data is sent in the "csv" field of the request body
    const jsonArray = await csvtojson().fromString(csvString);
    res.json(jsonArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
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

const banUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isBanned = true;
    await user.save();

    return res.status(200).json({ message: "User banned successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const unbanUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isBanned = false;
    await user.save();

    return res.status(200).json({ message: "User unban successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
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
const uploadCloudinary = async (req, res, next) => {
  try {
    fileUploader.single("file")(req, res, function (err) {
      if (err) {
        next(new Error("Error uploading file!"));
        return;
      }

      if (!req.file) {
        next(new Error("No file uploaded!"));
        return;
      }

      res.json({ secure_url: req.file.path });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getUser,
  getHistory,
  authenticateRole,
  updateUser,
  getAllUser,
  banUser,
  unbanUser,
  uploadCloudinary,
  uploadCSV,
};
