const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/auth");
const authController = require("../controllers/authController");

// @route GET api/auth
// @des Check if user is logged in
//@access public

router.get("/", verifyToken, authController.verifyUser);

// route Post api/auth/register
// desc Register user
// access Public
router.post("/register", authController.register);

// route Post api/auth/login
// desc Login user
// access Public

router.post("/login", authController.login);

//
router.post("/forgotpass", verifyToken, authController.forgotPass);

router.post("/reset-password/:resetToken", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    const user = await User.findById(decoded._id);
    if (!user) return res.status(404).send({ error: "User not found." });

    user.password = password;
    await user.save();

    return res.status(200).send({ message: "Password reset successful." });
  } catch (error) {
    return res.status(400).send({ error: "Invalid password reset token." });
  }
});
module.exports = router;
