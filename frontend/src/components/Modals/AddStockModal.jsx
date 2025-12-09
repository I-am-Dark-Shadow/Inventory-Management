import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom'; // <-- Import This
import axios from '../../api/axios';

const AddStockModal = ({ onClose, onAdd, defaultCategory }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    category: defaultCategory || '',
    quantity: 1,
    barcode: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/categories');
        setCategories(data);
        if (!defaultCategory && data.length > 0) {
          setFormData(prev => ({ ...prev, category: data[0].name }));
        }
      } catch (err) {
        console.error('Failed to load categories');
      }
    };
    fetchCategories();
  }, [defaultCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
  };

  // PORTAL LOGIC: Returns the modal directly to document.body
  return createPortal(
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-[#18181B] w-[500px] rounded-xl p-6 border border-gray-800 shadow-2xl relative">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Add New Stock</h2>
          <button onClick={onClose}><X className="text-gray-400 hover:text-white" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1">Product Name</label>
            <input type="text" className="w-full bg-black border border-gray-700 rounded p-2 text-white" 
                 value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-1">Product Category</label>
            <select 
              className="w-full bg-black border border-gray-700 rounded p-2 text-white"
              value={formData.category} 
              onChange={e => setFormData({...formData, category: e.target.value})}
            >
              {categories.length === 0 && <option>Loading...</option>}
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {/* <div>
              <label className="block text-gray-400 text-sm mb-1">Quantity</label>
              <input type="number" className="w-full bg-black border border-gray-700 rounded p-2 text-white" 
                 value={formData.quantity} onChange={e => setFormData({...formData, quantity: parseInt(e.target.value)})} min="1" required/>
            </div> */}
            <div>
              <label className="block text-gray-400 text-sm mb-1">Date</label>
              <input type="date" className="w-full bg-black border border-gray-700 rounded p-2 text-white"
                value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-1">Barcode / Serial</label>
            <input type="text" placeholder="####-####" className="w-full bg-black border border-gray-700 rounded p-2 text-white"
               value={formData.barcode} onChange={e => setFormData({...formData, barcode: e.target.value})} required />
          </div>

          <button type="submit" className="w-full bg-white text-black font-semibold py-2 rounded hover:bg-gray-200 mt-2">
            Add Stock
          </button>
        </form>
      </div>
    </div>,
    document.body // <-- This attaches modal to body
  );
};

export default AddStockModal;