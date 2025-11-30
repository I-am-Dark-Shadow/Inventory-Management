import express from 'express';
import { getProducts, createProduct, assignProduct, getAssignments, deleteProduct } from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getProducts)
  .post(protect, createProduct);

router.post('/assign', protect, assignProduct);
router.get('/assignments', protect, getAssignments);
router.delete('/:id', protect, deleteProduct);

export default router;