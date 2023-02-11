const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/auth");
const session = require("express-session");
const app = express();

const userController = require("../controllers/userController");
const passport = require("passport");
const cookieSession = require("cookie-session");
// @route GET api/auth/getUser
// @des Check user details
//@access public

router.get("/profile", verifyToken, userController.getUser);
router.put("/profile/:id", verifyToken, userController.updateUser);

router.get("/history", verifyToken, userController.getHistory);
router.get("/admin", userController.authenticateRole(["admin"]), (req, res) => {
  res.send({ success: "Admin zone." });
});

router.get("/owner", userController.authenticateRole(["owner"]), (req, res) => {
  res.send({ success: "Owner zone." });
});

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
app.use(
  session({
    secret: "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",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Define the authentication routes
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"], scope: ["email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect to the dashboard
    res.redirect("/dashboard");
  }
);
router.get("/api/current_user", (req, res) => {
  res.send(req.user);
});

module.exports = router;
