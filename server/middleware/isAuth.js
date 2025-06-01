import asyncHandler from "../config/asyncHandler.js";
import jwt from "jsonwebtoken";

const isAuth = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  // console.log("token", token);
  if (token) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      // add userId to request object
      req.userId = payload.userId;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export default isAuth;
