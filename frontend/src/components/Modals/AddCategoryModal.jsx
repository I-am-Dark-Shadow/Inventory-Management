import { X } from 'lucide-react';
import { useState } from 'react';
import axios from '../../api/axios';
import toast from 'react-hot-toast';

const AddCategoryModal = ({ onClose, onCategoryAdded }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // We will create this endpoint in backend below
      await axios.post('/categories', { name });
      toast.success('Category Added Successfully');
      onCategoryAdded(); // Refresh parent data
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error adding category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#18181B] w-[400px] rounded-xl p-6 border border-gray-800 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Add Category</h2>
          <button onClick={onClose}><X className="text-gray-400 hover:text-white" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1">Category Name</label>
            <input 
              type="text" 
              className="w-full bg-black border border-gray-700 rounded p-2 text-white focus:border-blue-500 outline-none" 
              placeholder="e.g. Printer, Scanner"
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white text-black font-semibold py-2 rounded hover:bg-gray-200 mt-2 disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Save Category'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;