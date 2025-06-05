import { Router } from "express";
import {
  addPost,
  deletePost,
  dislikePost,
  getPosts,
  likePost,
  updatePost,
} from "../controllers/posts.controller.js";
import upload from "../middleware/upload.js";

const router = Router();

router.get("/", getPosts);
router.post("/", upload.single("image"), addPost);
router.put("/:postId", updatePost);
router.delete("/:postId", deletePost);

// like post
router.put("/like/:postId", likePost);
router.put("/dislike/:postId", dislikePost);

export default router;
