import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from '../api/axios';
import { Plus, Trash2, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

// Imports
import AddStockModal from '../components/Modals/AddStockModal';
import AssignStockModal from '../components/Modals/AssignStockModal';
import DeleteConfirmModal from '../components/Modals/DeleteConfirmModal'; // <-- IMPORT THIS

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search & Pagination State
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Modal States
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [assignTarget, setAssignTarget] = useState(null);
  
  // Delete Modal State
  const [deleteTarget, setDeleteTarget] = useState(null); // <-- NEW STATE

  // URL Params for Category Filter
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const fetchData = async () => {
    try {
      const { data } = await axios.get('/products?limit=1000');
      setProducts(data.products);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // --- FILTER LOGIC ---
  const filteredProducts = products.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.barcode.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryParam ? p.category === categoryParam : true;
    return matchesSearch && matchesCategory;
  });

  // --- PAGINATION LOGIC ---
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // --- NEW DELETE LOGIC ---
  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
        await axios.delete(`/products/${deleteTarget._id}`);
        toast.success('Item moved to scrap (Deleted)');
        setDeleteTarget(null); // Close Modal
        fetchData(); // Refresh Data
    } catch(e) { 
        toast.error('Error deleting item'); 
    }
  };

  const formatDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, "0");

  const monthNames = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

  // const handleAssignStock = async (formData) => {
  //     try {
  //       await axios.post('/products/assign', formData);
  //       toast.success('Assigned');
  //       setAssignTarget(null);
  //       fetchData();
  //     } catch (e) { toast.error('Error assigning'); }
  // };

  const handleAddStock = async (formData) => {
      try {
          await axios.post('/products', formData);
          toast.success('Added');
          setAddModalOpen(false);
          fetchData();
      } catch(e) { toast.error('Error adding'); }
  }

  return (
    <div className="space-y-8">
      {/* --- STOCK SECTION --- */}
      <div>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
                {categoryParam ? `${categoryParam} Stock` : 'All Stocks'}

                <span className="bg-blue-500/10 text-blue-400 px-3 py-2 rounded-lg text-sm font-semibold">
                    {filteredProducts.length}
                </span>
                {/* <span className="text-sm text-gray-400">
                    Showing {filteredProducts.length} items
                  </span> */}
            </h2>
            
            <div className="flex gap-3 w-full md:w-auto">
               <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-3 text-gray-500" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search name, category, barcode..." 
                    className="w-full bg-black border border-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:border-blue-500 outline-none"
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  />
               </div>
               <button onClick={() => setAddModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white text-sm font-semibold flex items-center gap-1 uppercase">
                  <Plus size={16} /> Add
               </button>
            </div>
        </div>
        
        <div className="bg-[#18181B] rounded-lg border border-gray-800 overflow-hidden">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-[#0F1115] text-blue-500  text-lg uppercase font-medium text-center">
              <tr>
                <th className="px-6 py-4">Barcode</th>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th> 
                <th className="px-6 py-4">Date</th> 
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-800/50 text-center">
                    <td className="px-6 py-4 font-mono text-white">{p.barcode}</td>
                    <td className="px-6 py-4 text-white font-medium">{p.name?.toUpperCase()}</td>
                    <td className="px-6 py-4"><span className="bg-gray-800 px-2 py-1 rounded text-xs">{p.category}</span></td>
                    <td className="px-6 py-4">
                       {p.quantity > 0 ? (
                         <span className="text-green-400 font-bold bg-green-500/10 px-3 py-1 rounded-full text-xs">
                           IN STOCK
                         </span>
                       ) : (
                         <span className="text-red-400 font-bold bg-red-500/10 px-3 py-1 rounded-full text-xs">
                           OUT OF STOCK
                         </span>
                       )}
                    </td>
                    <td className="px-4 py-3 text-gray-300 uppercase font-mono">
                        {formatDate(p.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                      {/* <button onClick={() => setAssignTarget(p)} disabled={p.quantity < 1} className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded hover:bg-blue-500/20 disabled:opacity-30">Assign</button> */}
                      
                      {/* DELETE BUTTON: Opens Modal now */}
                      <button 
                        onClick={() => setDeleteTarget(p)} 
                        className="bg-red-500/10 text-red-400 px-3 py-2 rounded hover:bg-red-500/20 flex"
                      >
                        <Trash2 size={14}/>
                      </button>

                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-12 text-gray-500 text-lg">
                     Item Not Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION CONTROLS */}
        {filteredProducts.length > itemsPerPage && (
           <div className="flex justify-center items-center gap-4 mt-6">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 bg-gray-800 rounded disabled:opacity-50 hover:bg-gray-700"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-gray-400">Page {currentPage} of {totalPages}</span>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 bg-gray-800 rounded disabled:opacity-50 hover:bg-gray-700"
              >
                <ChevronRight size={20} />
              </button>
           </div>
        )}
      </div>

      {/* --- MODALS --- */}
      {isAddModalOpen && <AddStockModal onClose={() => setAddModalOpen(false)} onAdd={handleAddStock} />}
      {assignTarget && <AssignStockModal product={assignTarget} onClose={() => setAssignTarget(null)} onAssign={handleAssignStock} />}
      
      {/* DELETE MODAL */}
      <DeleteConfirmModal 
        isOpen={!!deleteTarget}
        itemName={deleteTarget?.name}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />

    </div>
  );
};

export default Inventory;