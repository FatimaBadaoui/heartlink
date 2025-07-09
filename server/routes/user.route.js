import { Router } from "express";
import {
  acceptFriendRequest,
  deleteUser,
  getAllUsers,
  getMe,
  getUser,
  login,
  removeFriend,
  requestFriend,
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
router.patch("/acceptFriend/:friendId", isAuth, acceptFriendRequest);
router.patch("/requestFriend/:friendId", isAuth, requestFriend);
router.delete("/removeFriend/:friendId", isAuth, removeFriend);

router.get("/me", isAuth, getMe);

export default router;
