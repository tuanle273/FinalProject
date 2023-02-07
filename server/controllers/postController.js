const express = require("express");
const { response } = require("../index");
const router = express.Router();
const verifyToken = require("../middlewares/auth");
const Post = require("../models/Post");
const User = require("../models/User");
const postController = require("../controllers/postController");

const getPost = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updatePost = async (req, res) => {
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
};
const createPost = async (req, res) => {
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
      user: req.userId,
    });
    await newPost.save();

    res.json({ success: true, message: "Happy Learning!", post: newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const postDeleteCondition = { _id: req.params.id, user: req.userId };
    const deletedPost = await Post.findOneAndDelete(postDeleteCondition);

    if (deletedPost)
      return res.status(401).json({
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
};
module.exports = {
  getPost,
  updatePost,
  createPost,
  deletePost,
};
