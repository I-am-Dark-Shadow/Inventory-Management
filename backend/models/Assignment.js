import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  employeeName: { type: String, required: true },
  department: { type: String, required: true },
  quantityAssigned: { type: Number, required: true },
  assignedDate: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model('Assignment', assignmentSchema);