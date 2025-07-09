import { Router } from "express";
import {
  deleteUser,
  FollowUser,
  getAllUsers,
  getMe,
  getUser,
  login,
  removeFriend,
  signup,
  updateUser,
} from "../controllers/user.controller.js";
import { userValidationRules, validate } from "../middleware/userValidation.js";
import isAuth from "../middleware/isAuth.js";

const router = Router();

// URL: /api/users

// User routes
router.get("/", getAllUsers);
router.post("/signup", userValidationRules(), validate, signup);
router.post("/login", login);
router.put("/", isAuth, updateUser);
router.delete("/", isAuth, deleteUser);
router.get("/:userId", isAuth, getUser);
router.patch("/followUser/:friendId", isAuth, FollowUser);
router.patch("/unfollowUser/:friendId", isAuth, removeFriend);

router.get("/me", isAuth, getMe);

export default router;
