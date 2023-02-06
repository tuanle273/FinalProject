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

module.exports = {
  getPost,
  updatePost,
  verifyUser,
};
