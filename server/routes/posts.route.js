import { Router } from "express";
import {
  addPost,
  deletePost,
  dislikePost,
  getPosts,
  likePost,
  updatePost,
} from "../controllers/posts.controller.js";

const router = Router();

router.get("/", getPosts);
router.post("/", addPost);
router.put("/:postId", updatePost);
router.delete("/:postId", deletePost);

// like post
router.put("/like/:postId", likePost);
router.put("/dislike/:postId", dislikePost);

export default router;
