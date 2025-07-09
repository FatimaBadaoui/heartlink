import { Router } from "express";
import {
  addPost,
  deletePost,
  dislikePost,
  getPosts,
  getPostsById,
  getPostsByUserId,
  likePost,
  updatePost,
} from "../controllers/posts.controller.js";

const router = Router();

// URL: /api/posts

router.get("/", getPosts);
router.post("/", addPost);
router.get("/:postId", getPostsById);
router.put("/:postId", updatePost);
router.delete("/:postId", deletePost);
// Get posts by user ID
router.get("/user/:userId", getPostsByUserId);

// like post
router.put("/like/:postId", likePost);
router.put("/dislike/:postId", dislikePost);

export default router;
