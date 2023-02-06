const express = require("express");
const { response } = require("../index");
const router = express.Router();
const verifyToken = require("../middlewares/auth");
const Post = require("../models/Post");
const postController = require("../controllers/postController");

//@route GET api/post
// @desc get post
// @access Private

router.get("/", verifyToken, postController.getPost);

//@route PUT api/post
// @desc Update post
// @access Private

router.put("/:id", verifyToken, postController.updatePost);

//@route POST api/post
// @desc Create post
// @access Private

router.post("/", verifyToken, postController.createPost);

//@route DELETE api/post
// @desc DELETE post
// @access Private

router.delete("/:id", verifyToken, postController.deletePost);

module.exports = router;
