const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
router.get("/", (req, res) => res.send("USER ROUTE"));
// route Post api/auth/register
// desc Register user
// access Public
router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email)
    return res.status(400).json({
      success: false,
      message: "Missing username or password",
    });

  try {
    const user = await User.findOne({ username });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "Username already taken" });
    //All goood
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();

    //return Token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN
    );
    res.json({ success: true, message: "Created token", accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// route Post api/auth/login
// desc Login user
// access Public

router.post("/login", async (req, res) => {
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
        message: "Username not found",
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
      { userId: user._id },
      process.env.ACCESS_TOKEN
    );
    res.json({ success: true, message: "Login Successfully", accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
