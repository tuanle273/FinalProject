const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/auth");
const userController = require("../controllers/userController");

router.get("/profile", verifyToken, userController.getUser);

router.put("/profile/:id", verifyToken, userController.updateUser);

router.get("/history", verifyToken, userController.getHistory);

router.get("/alluser", verifyToken, userController.getAllUser);

router.get("/banuser/:id", verifyToken, userController.banUser);

router.post("/cloudinary-upload", verifyToken, userController.uploadCloudinary);

router.get("/unbanuser/:id", verifyToken, userController.unbanUser);

router.get("/admin", userController.authenticateRole(["admin"]), (req, res) => {
  res.send({ success: "Admin zone." });
});

router.get("/owner", userController.authenticateRole(["owner"]), (req, res) => {
  res.send({ success: "Owner zone." });
});


module.exports = router;
