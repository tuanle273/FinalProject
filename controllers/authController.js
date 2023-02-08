const express = require("express");

const argon2 = require("argon2");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const verifyUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found." });
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const register = async (req, res) => {
  const { username, password, email } = req.body;

  if (!email || !username || !password)
    return res.status(400).json({
      success: false,
      message: "Missing username or password",
    });

  try {
    const user = await User.findOne({ username });
    const emailCheck = await User.findOne({ email });

    if (emailCheck)
      return res
        .status(400)
        .json({ success: false, message: "email already taken" });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "username already taken" });
    //All good
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();

    //return Token
    const accessToken = jwt.sign(
      {
        userId: newUser._id,
        userEmail: newUser.email,
        userRole: newUser.role,
        userName: newUser.username,
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "1d" }
    );

    res.json({ success: true, message: "Created token", accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({
      success: false,
      message: "Missing username or password",
    });

  try {
    //check existing user
    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({
        success: false,
        message: "Incorrect username or password",
      });
    //username Found
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password" });
    //All good
    //return Token
    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.ACCESS_TOKEN,
      { expiresIn: "1h" }
    );
    res.json({ success: true, message: "Login Successfully", accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  register,
  login,
  verifyUser,
};
