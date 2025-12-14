import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true, // Puro database e nam unique hobe
    trim: true
  }
  // branch: ... <--- EI LINE TA DELETE KORE DIN
}, { timestamps: true });

export default mongoose.model('Category', categorySchema);