import { Router } from "express";
import { login, signup } from "../controllers/user.controller.js";

const router = Router();

// User routes
router.get("/", (req, res) => {
  res.send("User route is working");
});
router.post("/signup", signup);
router.post("/login", login);

export default router;
