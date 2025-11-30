import express from 'express';
import asyncHandler from 'express-async-handler';
import Category from '../models/Category.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get all categories
// @route   GET /api/categories
router.get('/', protect, asyncHandler(async (req, res) => {
  const categories = await Category.find({}).sort({ name: 1 });
  res.json(categories);
}));

// @desc    Add new category
// @route   POST /api/categories
router.post('/', protect, asyncHandler(async (req, res) => {
  const { name } = req.body;
  
  const categoryExists = await Category.findOne({ name });
  if (categoryExists) {
    res.status(400);
    throw new Error('Category already exists');
  }

  const category = await Category.create({ name });
  res.status(201).json(category);
}));

export default router;