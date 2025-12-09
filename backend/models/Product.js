import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true, default: 0 },
  barcode: { type: String, required: true }, // unique removed temporarily to allow same barcode in diff branches if needed
  branch: { type: String, required: true }, // <--- ADD THIS
  minStockLevel: { type: Number, default: 5 },
}, { timestamps: true });

export default mongoose.model('Product', productSchema);