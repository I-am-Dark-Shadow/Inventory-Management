import express from 'express';
import asyncHandler from 'express-async-handler';
import Category from '../models/Category.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, asyncHandler(async (req, res) => {
  // Only show categories for the user's branch
  const categories = await Category.find({ branch: req.user.branch }).sort({ name: 1 });
  res.json(categories);
}));

router.post('/', protect, asyncHandler(async (req, res) => {
  const { name } = req.body;
  
  const categoryExists = await Category.findOne({ name, branch: req.user.branch });
  if (categoryExists) { res.status(400); throw new Error('Category already exists'); }

  const category = await Category.create({ name, branch: req.user.branch });
  res.status(201).json(category);
}));

export default router;