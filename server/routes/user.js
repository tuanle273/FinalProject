const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/auth");
const userController = require("../controllers/userController");
const passport = require("passport");
const { loginByGoogle } = require("../controllers/authController");

router.get("/profile", verifyToken, userController.getUser);

router.put("/profile/:id", verifyToken, userController.updateUser);

router.get("/history", verifyToken, userController.getHistory);

router.get("/admin", userController.authenticateRole(["admin"]), (req, res) => {
  res.send({ success: "Admin zone." });
});

router.get("/owner", userController.authenticateRole(["owner"]), (req, res) => {
  res.send({ success: "Owner zone." });
});

//Login by GOOGLE

loginByGoogle();
router.get(
  "/auth/google",

  passport.authenticate("google", { scope: ["profile"], scope: ["email"] })
);

router.get(
  "/auth/google/callback",

  passport.authenticate("google", { session: false }),
  function (req, res) {
    res.redirect("http://localhost:3000");
  }
);

module.exports = router;
