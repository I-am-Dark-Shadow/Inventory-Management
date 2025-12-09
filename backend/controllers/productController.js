import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';
import Assignment from '../models/Assignment.js';

// Get Products (Branch Specific)
export const getProducts = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.limit) || 10;
  // Filter by User's Branch
  const keyword = req.query.search
    ? {
        branch: req.user.branch, // <--- Filter
        $or: [
          { name: { $regex: req.query.search, $options: 'i' } },
          { barcode: { $regex: req.query.search, $options: 'i' } },
        ],
      }
    : { branch: req.user.branch }; // <--- Filter

  const products = await Product.find({ ...keyword }).sort({ createdAt: -1 });
  res.json({ products });
});

// Create Product (Auto-assign Branch)
export const createProduct = asyncHandler(async (req, res) => {
  const { name, category, quantity, barcode } = req.body;
  
  // Check if barcode exists IN THIS BRANCH
  const productExists = await Product.findOne({ barcode, branch: req.user.branch });

  if (productExists) {
    res.status(400); throw new Error('Product with this barcode already exists in this branch');
  }

  const product = await Product.create({
    name, category, quantity, barcode,
    branch: req.user.branch // <--- Save Branch
  });
  res.status(201).json(product);
});

// Assign Product
export const assignProduct = asyncHandler(async (req, res) => {
  const { productId, employeeName, department, quantity } = req.body;
  const product = await Product.findOne({ _id: productId, branch: req.user.branch });

  if (!product) { res.status(404); throw new Error('Product not found'); }
  if (product.quantity < quantity) { res.status(400); throw new Error('Insufficient stock'); }

  await Assignment.create({
    product: productId,
    employeeName,
    department,
    quantityAssigned: quantity,
    branch: req.user.branch // <--- Save Branch
  });

  product.quantity = product.quantity - quantity;
  await product.save();

  res.json({ message: 'Stock assigned successfully', product });
});

// Get History (Branch Specific)
export const getAssignments = asyncHandler(async (req, res) => {
  const assignments = await Assignment.find({ branch: req.user.branch })
    .populate('product', 'name barcode')
    .sort({ createdAt: -1 });
  res.json(assignments);
});

// Delete Product
export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id, branch: req.user.branch });
    if(product) {
        await product.deleteOne();
        res.json({ message: 'Product removed' });
    } else { res.status(404); throw new Error('Product not found'); }
});