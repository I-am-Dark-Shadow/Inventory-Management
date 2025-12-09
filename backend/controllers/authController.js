import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, branch } = req.body; // Branch nilam
  
  const userExists = await User.findOne({ email });
  if (userExists) { res.status(400); throw new Error('User already exists'); }

  const user = await User.create({ name, email, password, branch });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      branch: user.branch, // Return branch
      token: generateToken(user._id),
    });
  } else { res.status(400); throw new Error('Invalid user data'); }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password, branch } = req.body; // Login time e branch check korbo
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    // Check if user belongs to the selected branch
    if(user.branch !== branch) {
        res.status(401);
        throw new Error(`Access Denied! You belong to ${user.branch} branch.`);
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      branch: user.branch,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});