const express = require("express");
const nodemailer = require("nodemailer");
const argon2 = require("argon2");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Create a transporter using Gmail as the email provider
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tuandev27@gmail.com",
    pass: "tnqayvcgrtmowokc",
  },
});
//forgot password
const emailPass = async (req, res) => {
  const email = req.body.email;

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
        text: `Please click on the following link to reset your password: https://client-oxbf.onrender.com/passwordreset/${resetToken}`,
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).send({ error: "Failed to send email." });
        } else {
          console.log("Email sent: " + info.response);
          return res.send({
            success: "Password reset email sent. Please check your EMAIL",
          });
        }
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).send({ error: "Server error." });
    });
};

const tokenPass = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    const user = await User.findById(decoded._id);
    if (!user) return res.status(404).send({ error: "User not found." });

    user.password = await argon2.hash(password);
    //All good

    await user.save();

    return res.status(200).send({ message: "Password reset successful." });
  } catch (error) {
    return res.status(400).send({ error: "Invalid password reset token." });
  }
};

module.exports = { emailPass, tokenPass };
