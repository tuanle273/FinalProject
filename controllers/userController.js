const User = require("../models/User");

const getUser = async (req, res) => {
  try {
    const userDetail = await User.findById(req.userId);
    res.json({ success: true, userDetail });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = {
  getUser,
};
