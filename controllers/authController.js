const express = require("express");
const nodemailer = require("nodemailer");
const argon2 = require("argon2");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const users = require("../models/User");
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
      {
        userId: user._id,
        email: user.email,
        userRole: user.role,
        userName: user.username,
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "1h" }
    );
    res.json({ success: true, message: "Login Successfully", accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//forgot password
const forgotPass = async (req, res) => {
  const { email } = req.body;

  // Verify the email exists in the database
  const user = await User.findOne(email);
  if (!user) return res.status(404).send("User not found.");

  // Generate a JWT token
  const token = jwt.sign({ email }, process.env.ACCESS_TOKEN, {
    expiresIn: "1h",
  });

  // Send the reset password link via email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "tuanle2731@gmail.com",
      pass: "Anhtuan1",
    },
  });

  const resetPasswordLink = `https://example.com/reset-password/${token}`;

  const mailOptions = {
    from: "tuanle2731@gmail.com",
    to: "tuanle273@gmail.com",
    subject: "Reset your password",
    html: `
      <p>
        You are receiving this email because you requested a password reset.
      </p>
      <p>
        Please click on the following link to reset your password:
      </p>
      <a href="${resetPasswordLink}">${resetPasswordLink}</a>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return res.status(500).send("Error sending email.");
    res.send("Reset password link sent to email.");
  });
};

module.exports = {
  register,
  login,
  verifyUser,
  forgotPass,
};
