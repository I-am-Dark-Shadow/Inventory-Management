import express from 'express';
import { sendLowStockReport } from '../controllers/reportController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/send', protect, sendLowStockReport);

export default router;