import { Router } from "express";
import {
  deleteUser,
  getUser,
  login,
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
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);
router.get("/:userId", getUser);

export default router;
