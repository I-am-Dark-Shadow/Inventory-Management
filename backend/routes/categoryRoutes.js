import express from 'express';
import asyncHandler from 'express-async-handler';
import Category from '../models/Category.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get ALL categories (Global)
router.get('/', protect, asyncHandler(async (req, res) => {
  // Ekhane kono branch filter nei. Sobai sob category pabe.
  const categories = await Category.find({}).sort({ name: 1 });
  res.json(categories);
}));

// @desc    Add new category (Global)
router.post('/', protect, asyncHandler(async (req, res) => {
  const { name } = req.body;
  
  // Case-insensitive check (Monitor == monitor)
  // Regex use kore check korchi jate "Monitor" thakle "monitor" add na hoy
  const categoryExists = await Category.findOne({ 
    name: { $regex: new RegExp(`^${name}$`, 'i') } 
  });

  if (categoryExists) {
    res.status(400);
    throw new Error('Category already exists in the system');
  }

  // Branch chara save hobe
  const category = await Category.create({ name });
  res.status(201).json(category);
}));

export default router;