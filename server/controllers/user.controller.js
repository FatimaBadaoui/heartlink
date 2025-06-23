import User from "../models/User.js";
import asyncHandler from "../config/asyncHandler.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cloudinary from "../utils/cloudinary.js";

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
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

  // create cookie
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: "lax", // Prevent CSRF attacks
    expires: new Date(Date.now() + 3600000), // 1 hour
  };
  res.cookie("token", token, cookieOptions);

  // send response
  res.status(200).json({
    message: "Login successful",
    user,
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const { userId } = req;
  const { firstName, lastName, avatar, password } = req.body;

  // Find user by ID
  const user = await User.findOne({ _id: userId });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // If password is provided, hash it
  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  // upload avatar if provided to cloudinary
  if (avatar) {
    try {
      const uploadResult = await cloudinary.uploader.upload(avatar, {
        folder: "avatars", // specify the folder in Cloudinary
      });
      user.avatar = uploadResult.secure_url; // get the secure URL of the uploaded image
    } catch (error) {
      console.error("Error uploading avatar to Cloudinary:", error);
      return res.status(500).json({ message: "Failed to upload avatar" });
    }
  }

  // Update user details
  user.firstName = firstName || user.firstName;
  user.lastName = lastName || user.lastName;
  await user.save();
  res.status(200).json({
    message: "User updated successfully",
    user,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req;

  // Find user by ID
  const user = await User.findOne({ _id: userId });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Delete user
  await User.deleteOne({ _id: userId });
  res.status(200).json({
    message: "User deleted successfully",
  });
});

const getUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  // Find user by ID
  const user = await User.findOne({ _id: userId });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // send response
  res.status(200).json({
    message: "User retrieved successfully",
    user,
  });
});

const acceptFriendRequest = asyncHandler(async (req, res) => {
  const { userId } = req;
  const { friendId } = req.params;

  // Find user by ID
  const user = await User.findOne({ _id: userId });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  // Find friend by ID
  const friend = await User.findOne({ _id: friendId });
  if (!friend) {
    return res.status(404).json({ message: "Friend not found" });
  }
  // Check if friend request exists
  if (!user.friendRequests.includes(friendId)) {
    return res.status(400).json({ message: "Friend request not found" });
  }
  // Add friend to user's friends list
  user.friends.push(friendId);
  // Remove friend from user's friend requests
  user.friendRequests = user.friendRequests.filter(
    (id) => id.toString() !== friendId
  );
  await user.save();
  // Add user to friend's friends list
  friend.friends.push(userId);
  await friend.save();
  res.status(200).json({
    message: "Friend request accepted",
    user,
    friend,
  });
});

const requestFriend = asyncHandler(async (req, res) => {
  const { userId } = req;
  const { friendId } = req.params;

  // Find user by ID
  const user = await User.findOne({ _id: userId });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  // Find friend by ID
  const friend = await User.findOne({ _id: friendId });
  if (!friend) {
    return res.status(404).json({ message: "Friend not found" });
  }
  // Check if friend request already exists
  if (user.friendRequests.includes(friendId)) {
    return res.status(400).json({ message: "Friend request already sent" });
  }
  // Add friend to user's friend requests
  user.friendRequests.push(friendId);
  await user.save();
  res.status(200).json({
    message: "Friend request sent",
    user,
    friend,
  });
});

export {
  signup,
  login,
  updateUser,
  deleteUser,
  getUser,
  acceptFriendRequest,
  requestFriend,
};
