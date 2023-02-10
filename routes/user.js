const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/auth");

const app = express();
const userController = require("../controllers/userController");
const passport = require("passport");
const cookieSession = require("cookie-session");
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

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./../utils/key");
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "http://localhost:5000/api/user/auth/google/callback",
    },
    (profile, done) => {
      // Check if google profile exist.
      if (profile.id) {
        User.findOne({ googleId: profile.id }).then((existingUser) => {
          if (existingUser) {
            done(null, existingUser);
          } else {
            new User({
              googleId: profile.id,
              email: profile.emails[0].value,
              name: profile.name.familyName + " " + profile.name.givenName,
            })
              .save()
              .then((user) => done(null, user));
          }
        });
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Define the authentication routes
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);
app.get("/api/current_user", (req, res) => {
  res.send(req.user);
});
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
  }),
  function (req, res) {
    // Successful authentication, redirect to the dashboard
    res.redirect("/dashboard");
  }
);
module.exports = router;
