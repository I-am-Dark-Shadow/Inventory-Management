import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true, default: 0 },
  barcode: { type: String, required: true },
  branch: { type: String, required: true },
  minStockLevel: { type: Number, default: 5 },
  
  // ADD THIS LINE (Apnar manual date er jonno)
  date: { type: Date, required: true, default: Date.now } 
  
}, { timestamps: true });

export default mongoose.model('Product', productSchema);