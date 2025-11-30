import { X, Mail, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import toast from 'react-hot-toast';

const SendReportModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const calculateCategoryStats = async () => {
      try {
        const { data } = await axios.get('/products?limit=2000');
        
        // Group by Category
        const stats = {};
        data.products.forEach(item => {
          if (!stats[item.category]) {
            stats[item.category] = { name: item.category, totalQty: 0 };
          }
          stats[item.category].totalQty += item.quantity;
        });

        // Filter: Keep only categories with < 5 items
        const lowStockCategories = Object.values(stats).filter(cat => cat.totalQty < 5);
        
        // Map to display format
        setReportData(lowStockCategories.map(cat => ({
            name: 'Generic ' + cat.name, // Just for display label
            category: cat.name,
            quantity: cat.totalQty
        })));

      } catch (err) { console.error(err); }
    };
    calculateCategoryStats();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/report/send', { email, note, items: reportData });
      toast.success(`Category Report sent to ${email}`);
      onClose();
    } catch (error) { toast.error('Failed to send'); } 
    finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#18181B] w-[600px] max-h-[90vh] overflow-y-auto rounded-xl p-6 border border-gray-800 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Low Stock Category Report</h2>
          <button onClick={onClose}><X className="text-gray-400 hover:text-white" /></button>
        </div>

        <form onSubmit={handleSend} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1">To Email</label>
            <input type="email" required className="w-full bg-black border border-gray-700 rounded p-2 text-white"
              value={email} onChange={e => setEmail(e.target.value)} placeholder="manager@company.com" />
          </div>

          <div>
             <label className="block text-gray-400 text-sm mb-2">Categories with Low Stock (&lt; 5)</label>
             <div className="border border-gray-700 rounded-lg overflow-hidden">
                <table className="w-full text-left text-sm text-gray-400">
                   <thead className="bg-[#0F1115]">
                      <tr>
                         <th className="p-3">Category</th>
                         <th className="p-3 text-red-400">Total Available</th>
                      </tr>
                   </thead>
                   <tbody className="bg-black">
                      {reportData.length > 0 ? reportData.map((row, i) => (
                         <tr key={i} className="border-b border-gray-800">
                            <td className="p-3 text-white">{row.category}</td>
                            <td className="p-3 text-red-500 font-bold">{row.quantity}</td>
                         </tr>
                      )) : (
                         <tr><td colSpan="2" className="p-4 text-center text-green-500">All categories have sufficient stock!</td></tr>
                      )}
                   </tbody>
                </table>
             </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 mt-4">
             {loading ? 'Sending...' : 'Send Report'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendReportModal;