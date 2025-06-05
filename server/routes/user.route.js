import { Router } from "express";
import {
  acceptFriendRequest,
  deleteUser,
  getUser,
  login,
  requestFriend,
  signup,
  updateUser,
} from "../controllers/user.controller.js";
import { userValidationRules, validate } from "../middleware/userValidation.js";

const router = Router();

// User routes
router.get("/", (req, res) => {
  res.send("User route is working");
});
router.post("/signup", userValidationRules(), validate, signup);
router.post("/login", login);
router.put("/", updateUser);
router.delete("/", deleteUser);
router.get("/:userId", getUser);
router.patch("/acceptFriend/:friendId", acceptFriendRequest);
router.patch("/requestFriend/:friendId", requestFriend);

export default router;
