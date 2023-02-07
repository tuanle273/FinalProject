const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/auth");
const userController = require("../controllers/userController");
// @route GET api/auth/getUser
// @des Check user details
//@access public

router.get("/profile", verifyToken, userController.getUser);

module.exports = router;
