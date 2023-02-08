const User = require("../models/User");

const getUser = async (req, res) => {
  try {
    const userDetail = await User.findById(req.userId);
    res.json({ success: true, userDetail });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const verifyRole = () => async(req, res, next) => {
  const userDetail2 = await User.findById(req.role);
  if (req.role !== roleUser) return res.status(401).send("Unauthorized.");
  next();
};

const checkUser = async (req, res) => {
  try {
    res.send("Hello, admin!");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = {
  getUser,
  verifyRole,
  checkUser,
};
