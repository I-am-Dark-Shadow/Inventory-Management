import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  branch: { type: String, required: true }, // <--- ADD THIS
}, { timestamps: true });

export default mongoose.model('Category', categorySchema);