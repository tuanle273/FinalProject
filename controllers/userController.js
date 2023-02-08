const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { response } = require("../index");

const getUser = async (req, res) => {
  try {
    const userDetail = await User.findById(req.userId);
    res.json({ success: true, userDetail });
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
  authenticateRole,
};
