const express = require("express");
const { response } = require("../index");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const Post = require("../models/Post");

//@route POST api/post
// @desc Create post
// @access Private

router.post("/", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  if (!title)
    return res
      .status(404)
      .json({ success: false, message: "Title is required" });
  try {
    const newPost = new Post({
      title,
      description,
      url: url.startsWith("https://") ? url : "https://" + url,
      status: status || "TO LEARN",
      user: "63a1a10fd17019b06239745e",
    });
    await newPost.save();

    res.json({ success: true, message: "Happy Learning!", post: newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
