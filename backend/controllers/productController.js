import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';
import Assignment from '../models/Assignment.js';

// @desc    Get all products (with pagination & search)
// @route   GET /api/products
export const getProducts = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;

  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: 'i' } },
          { barcode: { $regex: req.query.search, $options: 'i' } },
        ],
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 });

  res.json({ products, page, pages: Math.ceil(count / pageSize), total: count });
});

// @desc    Create a product
// @route   POST /api/products
export const createProduct = asyncHandler(async (req, res) => {
  const { name, category, quantity, barcode } = req.body;
  const productExists = await Product.findOne({ barcode });

  if (productExists) {
    res.status(400);
    throw new Error('Product with this barcode already exists');
  }

  const product = await Product.create({
    name,
    category,
    quantity,
    barcode,
  });
  res.status(201).json(product);
});

// @desc    Assign product (Reduce Stock)
// @route   POST /api/products/assign
export const assignProduct = asyncHandler(async (req, res) => {
  const { productId, employeeName, department, quantity } = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  if (product.quantity < quantity) {
    res.status(400);
    throw new Error('Insufficient stock');
  }

  // Create Assignment Record
  await Assignment.create({
    product: productId,
    employeeName,
    department,
    quantityAssigned: quantity,
  });

  // Decrease Stock
  product.quantity = product.quantity - quantity;
  await product.save();

  res.json({ message: 'Stock assigned successfully', product });
});

// @desc    Get Assignments History
// @route   GET /api/products/assignments
export const getAssignments = asyncHandler(async (req, res) => {
  const assignments = await Assignment.find({})
    .populate('product', 'name barcode')
    .sort({ createdAt: -1 });
  res.json(assignments);
});

// @desc    Delete product
// @route   DELETE /api/products/:id
export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(product) {
        await product.deleteOne();
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});