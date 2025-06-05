import mongoose from "mongoose";
import asyncHandler from "../config/asyncHandler.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

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

  // add post ID to the author's posts array
  await User.findByIdAndUpdate(author, {
    $push: { posts: newPost._id },
  });

  res.status(201).json({
    message: "Post created successfully",
    data: newPost,
  });
});

const getPosts = asyncHandler(async (req, res) => {
  let posts = await Post.find()
    .populate("author", "firstName lastName avatar")
    .sort({ createdAt: -1 });

  // queries
  const { search } = req.query;
  if (search) {
    posts = posts.filter((post) => {
      const fullName = `${post.author.firstName} ${post.author.lastName}`;
      return (
        fullName.toLowerCase().includes(search.toLowerCase()) ||
        post.content.toLowerCase().includes(search.toLowerCase())
      );
    });
  }

  if (!posts || posts.length === 0) {
    res.status(404);
    throw new Error("No posts found");
  }
  res.status(200).json({
    message: "Posts retrieved successfully",
    data: posts,
  });
});

const updatePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { content, image } = req.body;

  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    { content, image },
    { new: true }
  );

  res.status(200).json({
    message: "Post updated successfully",
    data: updatedPost,
  });
});

const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { userId } = req;

  // find the post to ensure it exists
  const post = await Post.findById(postId);
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  // delete post from the author's posts array
  await User.findByIdAndUpdate(userId, {
    $pull: { posts: new mongoose.Types.ObjectId(postId) }, // Ensure postId is an ObjectId
  });

  // delete the post
  await Post.findByIdAndDelete(postId);

  res.status(200).json({
    message: "Post deleted successfully",
  });
});

export { addPost, getPosts, updatePost, deletePost };
