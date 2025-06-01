import asyncHandler from "../config/asyncHandler.js";
import Post from "../models/Post.js";

const addPost = asyncHandler(async (req, res) => {
  const { content, image } = req.body;
  // get author from the request object, assuming it's set by an authentication middleware
  const author = req.userId;
  console.log("author", author);
  // Validate that content and author are provided
  if (!content || !author) {
    res.status(400);
    throw new Error("Content and author are required");
  }
  const newPost = await Post.create({
    content,
    image,
    author,
  });

  res.status(201).json({
    message: "Post created successfully",
    data: newPost,
  });
});

const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .populate("author", "firstName lastName avatar")
    .sort({ createdAt: -1 });
  if (!posts || posts.length === 0) {
    res.status(404);
    throw new Error("No posts found");
  }
  res.status(200).json({
    message: "Posts retrieved successfully",
    data: posts,
  });
});

export { addPost, getPosts };
