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
router.get("/history", verifyToken, userController.getHistory);
router.get("/admin", userController.authenticateRole(["admin"]), (req, res) => {
  res.send({ success: "Admin zone." });
});

router.get("/owner", userController.authenticateRole(["owner"]), (req, res) => {
  res.send({ success: "Owner zone." });
});
module.exports = router;
