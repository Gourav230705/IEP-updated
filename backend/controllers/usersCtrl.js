const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const usersController = {
  
  // Register User
  
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw new Error("Please all fields are required");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userCreated = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    res.json({
      username: userCreated.username,
      email: userCreated.email,
      id: userCreated._id,
    });
  }),

  
  // Login User
  
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid login credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid login credentials");
    }

    const token = jwt.sign({ id: user._id }, "Key", {
      expiresIn: "30d",
    });

    res.json({
      message: "Login Success",
      token,
      id: user._id,
      email: user.email,
      username: user.username,
    });
  }),

  
  // Get Profile
  
  profile: asyncHandler(async (req, res) => {
    console.log(req.user);
    const user = await User.findById(req.user);
    if (!user) {
      throw new Error("User not found");
    }

    res.json({ username: user.username, email: user.email });
  }),

  
  // Update User Profile
  
  updateUserProfile: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Find user by the ID from  auth middleware
    const user = await User.findById(req.user);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Update only the provided fields
    if (username) user.username = username;
    if (email) user.email = email;

    // Update password only if provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await user.save();

    res.json({
      message: "Profile updated successfully",
      username: updatedUser.username,
      email: updatedUser.email,
    });
  }),
};

module.exports = usersController;
