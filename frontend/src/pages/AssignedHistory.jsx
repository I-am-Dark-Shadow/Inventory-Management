import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Search, ClipboardList, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AssignedHistory = () => {
  const [assignments, setAssignments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const { data } = await axios.get('/products/assignments');
        setAssignments(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  // --- SEARCH LOGIC (Employee Name OR Barcode) ---
  const filteredAssignments = assignments.filter((item) => {
    const term = searchTerm.toLowerCase();
    const employeeMatch = item.employeeName.toLowerCase().includes(term);
    const barcodeMatch = item.product?.barcode?.toLowerCase().includes(term);
    const productMatch = item.product?.name?.toLowerCase().includes(term); // Optional: Product name search

    return employeeMatch || barcodeMatch || productMatch;
  });

  return (
    <div>
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-3">
            {/* <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-800 rounded-full text-gray-400">
                <ArrowLeft size={20}/>
            </button> */}
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ClipboardList className="text-blue-400" /> Assigned History
            </h2>
        </div>

        {/* Search Bar */}
        <div className="relative md:w-80">
          <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search Employee or Barcode..." 
            className="w-full bg-black border border-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:border-blue-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-[#18181B] rounded-lg border border-gray-800 overflow-hidden shadow-lg">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-[#0F1115] text-gray-200 uppercase font-medium">
            <tr>
              <th className="px-6 py-4">Employee Name</th>
              <th className="px-6 py-4">Department</th>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Barcode</th>
              <th className="px-6 py-4">Assigned Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filteredAssignments.length > 0 ? (
              filteredAssignments.map((a) => (
                <tr key={a._id} className="hover:bg-gray-800/50 transition">
                  <td className="px-6 py-4 text-white font-semibold flex items-center gap-2">
                    {a.employeeName}
                  </td>
                  <td className="px-6 py-4">{a.department}</td>
                  <td className="px-6 py-4 text-white">{a.product?.name || <span className="text-red-500">Deleted Item</span>}</td>
                  <td className="px-6 py-4 font-mono text-yellow-500/80">
                    {a.product?.barcode || 'N/A'}
                  </td>
                  <td className="px-6 py-4">{new Date(a.assignedDate).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-12 text-gray-500">
                  {loading ? 'Loading...' : 'No matching records found.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedHistory;