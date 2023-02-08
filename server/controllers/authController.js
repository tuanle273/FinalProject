const express = require("express");
const nodemailer = require("nodemailer");
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
      {
        userId: user._id,
        userEmail: user.email,
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

// Create a transporter using Gmail as the email provider
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tuandev27@gmail.com",
    pass: "tnqayvcgrtmowokc",
  },
});
//forgot password
const forgotPass = async (req, res) => {
  const email = "tuanle273@gmail.com";

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ error: "Email not found." });
      }

      const resetToken = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN, {
        expiresIn: "1h",
      });

      // Define the email options
      const mailOptions = {
        from: "tuanle2731@gmail.com",
        to: email,
        subject: "Forgot Password",
        text: `Please click on the following link to reset your password: http://localhost:5000/reset-password/${resetToken}`,
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).send({ error: "Failed to send email." });
        } else {
          console.log("Email sent: " + info.response);
          return res.send({ success: "Password reset email sent." });
        }
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).send({ error: "Server error." });
    });
};

module.exports = {
  register,
  login,
  verifyUser,
  forgotPass,
};
