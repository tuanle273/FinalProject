const express = require("express");
const nodemailer = require("nodemailer");
const argon2 = require("argon2");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const passport = require("passport");

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
      process.env.ACCESS_TOKEN
      // { expiresIn: "1d" }
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

const loginByGoogle = async (req, res) => {
  const GoogleStrategy = require("passport-google-oauth20").Strategy;
  const keys = require("./../utils/key");
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "http://localhost:5000/api/user/auth/google/callback",
        scope: ["email"],
      },
      (accessToken, refreshToken, email, profile, done) => {
        console.log("🚀 ~ file: user.js:40 ~ accessToken", accessToken);
        accessToken = jwt.sign(
          {
            googleId: profile.id,
            userEmail: profile.email,
            userRole: profile.role,
            userName: profile.username,
          },
          process.env.ACCESS_TOKEN,
          { expiresIn: "1h" }
        );

        // Check if google profile exist.
        console.log(profile);
        if (profile.id) {
          User.findOne({ googleId: profile.id }).then((existingUser) => {
            if (existingUser) {
              done(null, existingUser);
            } else {
              new User({
                googleId: profile.id,
                email: profile.emails[0].value,
                username: profile.emails[0].value,
                avatar: profile.photos[0].value,
              })
                .save()
                .then((user) => done(null, user));
            }
          });
        }
      }
    )
  );

  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });
};
module.exports = {
  register,
  login,
  verifyUser,
  loginByGoogle,
};
