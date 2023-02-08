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

router.get(
  "/admin",
  verifyToken,
  userController.verifyRole("Admin"),
  userController.checkUser
);

router.get(
  "/owner",
  verifyToken,
  userController.verifyRole("Owner"),
  userController.checkUser
);
router.get(
  "/guest",
  verifyToken,
  userController.verifyRole("Guest"),
  userController.checkUser
);

module.exports = router;
