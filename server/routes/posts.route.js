import { Router } from "express";
import {
  addPost,
  deletePost,
  getPosts,
  updatePost,
} from "../controllers/posts.controller.js";

const router = Router();

router.get("/", getPosts);
router.post("/", addPost);
router.put("/:postId", updatePost);
router.delete("/:postId", deletePost);

export default router;
