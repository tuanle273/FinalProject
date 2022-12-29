const express = require("express");
const { response } = require("../index");
const router = express.Router();
const verifyToken = require("../middlewares/auth");
const Post = require("../models/Post");

//@route GET api/post
// @desc get post
// @access Private

router.get("/", verifyToken, async (req, res) => {
  try {
    const UId = req.userId;
    const posts = await Post.findOne({ user: UId }).populate("user", [
      "username",
    ]);
    res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//@route PUT api/post
// @desc Update post
// @access Private

router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;
  if (!title)
    return res
      .status(404)
      .json({ success: false, message: "Title is required" });
  try {
    let updatedPost = {
      title,
      description: description || "",
      url: url.startsWith("https://") ? url : "https://" + url,
      status: status || "TO LEARN",
    };
    const postUpdateCondition = {
      _id: req.params.id,
      user: req.userId,
    };

    updatedPost = await Post.findOneAndUpdate(
      postUpdateCondition,
      updatedPost,
      { new: true }
    );

    // user not authorized to update
    if (!updatedPost)
      return res
        .status(403)
        .json({ success: false, message: "User is not authorized to update" });
    res.json({ success: true, message: "Happy Learning!", post: updatedPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

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
      user: "63a9aa280a35ee156c5a0f5a",
    });
    await newPost.save();

    res.json({ success: true, message: "Happy Learning!", post: newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//@route DELETE api/post
// @desc DELETE post
// @access Private

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const postDeleteCondition = { _id: req.params.id, user: req.userId };
    const deletedPost = await Post.findOneAndDelete(postDeleteCondition);

    if (deletedPost)
      return res
        .status(401)
        .json({
          success: false,
          message: "Post not found or user not authorized",
        });
    res.json({
      success: true,
      message: "Delete Successfully",
      post: deletedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
