import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true, default: 0 },
  barcode: { type: String, required: true, unique: true }, // e.g., MON-001
  minStockLevel: { type: Number, default: 5 },
  status: { type: String, default: 'Available' }, // Available, Low Stock, Out of Stock
}, { timestamps: true });

export default mongoose.model('Product', productSchema);