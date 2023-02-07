const User = require("../models/User");
const getUser = async (req, res) => {
  try {
    const userDetail = await User.find({ user: req.userId });
    res.json({ success: true, userDetail });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
module.exports = {
  getUser,
};
