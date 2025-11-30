import { X } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom'; // <-- Import This

const AssignStockModal = ({ product, onClose, onAssign }) => {
  const [formData, setFormData] = useState({
    employeeName: '',
    department: '',
    quantity: 1
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAssign({ productId: product._id, ...formData });
  };

  // PORTAL LOGIC
  return createPortal(
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-[#18181B] w-[450px] rounded-xl p-6 border border-gray-800 shadow-2xl relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Assign: {product?.name}</h2>
          <button onClick={onClose}><X className="text-gray-400 hover:text-white" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1">Assign To (Employee)</label>
            <input type="text" className="w-full bg-black border border-gray-700 rounded p-2 text-white" 
                 value={formData.employeeName} onChange={e => setFormData({...formData, employeeName: e.target.value})} required />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Department</label>
             <input type="text" className="w-full bg-black border border-gray-700 rounded p-2 text-white" 
                 value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} required />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Quantity</label>
            <input type="number" className="w-full bg-black border border-gray-700 rounded p-2 text-white" 
                 value={formData.quantity} onChange={e => setFormData({...formData, quantity: parseInt(e.target.value)})} 
                 min="1" max={product?.quantity} required/>
             <p className="text-xs text-gray-500 mt-1">Available: {product?.quantity}</p>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 mt-4">
            Confirm Assignment
          </button>
        </form>
      </div>
    </div>,
    document.body // <-- Attached to body
  );
};

export default AssignStockModal;