import User from "../models/User.js";
import asyncHandler from "../config/asyncHandler.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const { JWT_SECRET } = process.env;

const signup = asyncHandler(async (req, res) => {
  const { username, firstName, lastName, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: "Username already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const user = await User.create({
    username,
    firstName,
    lastName,
    password: hashedPassword,
  });

  // send response
  res.status(201).json({
    message: "User created successfully",
    user,
  });
});

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  // Check password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

  // create cookie
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    expires: new Date(Date.now() + 3600000), // 1 hour
  };
  res.cookie("token", token, cookieOptions);

  // send response
  res.status(200).json({
    message: "Login successful",
    user,
  });
});

export { signup, login };
