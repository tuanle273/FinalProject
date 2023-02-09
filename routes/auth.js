const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/auth");
const authController = require("../controllers/authController");
const emailResetPass = require("../utils/emailResetPass");
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
router.post("/forgotpass", verifyToken, emailResetPass.emailPass);

router.post("/reset-password/:token", emailResetPass.tokenPass);
module.exports = router;
