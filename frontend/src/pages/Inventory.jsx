import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from '../api/axios';
import { Plus, Trash2, Search, ChevronLeft, ChevronRight, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';

// Imports
import AddStockModal from '../components/Modals/AddStockModal';
import AssignStockModal from '../components/Modals/AssignStockModal';
import DeleteConfirmModal from '../components/Modals/DeleteConfirmModal';

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
  const [deleteTarget, setDeleteTarget] = useState(null);

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

  // --- DELETE LOGIC ---
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

  // --- DATE FORMATTER ---
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // --- ASSIGN LOGIC ---
  const handleAssignStock = async (formData) => {
       try {
         await axios.post('/products/assign', formData);
         toast.success('Assigned Successfully');
         setAssignTarget(null);
         fetchData();
       } catch (e) { toast.error('Error assigning'); }
  };

  // --- ADD STOCK LOGIC ---
  const handleAddStock = async (formData) => {
      try {
          await axios.post('/products', formData);
          toast.success('Added Successfully');
          setAddModalOpen(false);
          fetchData();
      } catch(e) { toast.error('Error adding'); }
  }

  return (
    <div className="space-y-6 md:space-y-8 pb-20 md:pb-0"> {/* Added padding bottom for mobile */}
      
      {/* --- HEADER SECTION --- */}
      <div>
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-6 gap-4">
            
            {/* Title Section */}
            <h2 className="text-xl font-bold text-white flex items-center gap-3 w-full md:w-auto">
                {categoryParam ? `${categoryParam} Stock` : 'All Stocks'}
                <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg text-sm font-semibold">
                    {filteredProducts.length}
                </span>
            </h2>
            
            {/* Action Section (Search + Add) */}
            <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
               <div className="relative w-full sm:flex-1 xl:w-72">
                  <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search name, category..." 
                    className="w-full bg-black border border-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:border-blue-500 outline-none placeholder-gray-600"
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  />
               </div>
               
               <button 
                onClick={() => setAddModalOpen(true)} 
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white text-sm font-semibold flex items-center justify-center gap-2 uppercase transition-colors"
               >
                  <Plus size={18} /> 
                  <span>Add Stock</span>
               </button>
            </div>
        </div>
        
        {/* --- TABLE SECTION (Responsive Wrapper) --- */}
        <div className="bg-[#18181B] rounded-xl border border-gray-800 shadow-xl overflow-hidden">
          
          {/* overflow-x-auto enables horizontal scrolling on mobile */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-400 min-w-[800px]"> {/* min-w forces scroll on small screens */}
              <thead className="bg-[#0F1115] text-blue-500 text-xs uppercase font-bold tracking-wider text-center border-b border-gray-800">
                <tr>
                  <th className="px-6 py-4 whitespace-nowrap">Barcode</th>
                  <th className="px-6 py-4 whitespace-nowrap">Product Name</th>
                  <th className="px-6 py-4 whitespace-nowrap">Category</th>
                  <th className="px-6 py-4 whitespace-nowrap">Status</th> 
                  <th className="px-6 py-4 whitespace-nowrap">Date</th> 
                  <th className="px-6 py-4 text-right whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {paginatedProducts.length > 0 ? (
                  paginatedProducts.map((p) => (
                    <tr key={p._id} className="hover:bg-gray-800/50 text-center transition-colors">
                      <td className="px-6 py-4 font-mono text-white whitespace-nowrap">{p.barcode}</td>
                      <td className="px-6 py-4 text-white font-medium whitespace-nowrap">{p.name?.toUpperCase()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="bg-gray-800 px-2.5 py-1 rounded text-xs border border-gray-700">
                            {p.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                         {p.quantity > 0 ? (
                           <span className="text-green-400 font-bold bg-green-500/10 px-3 py-1 rounded-full text-xs border border-green-500/20">
                             IN STOCK
                           </span>
                         ) : (
                           <span className="text-red-400 font-bold bg-red-500/10 px-3 py-1 rounded-full text-xs border border-red-500/20">
                             OUT OF STOCK
                           </span>
                         )}
                      </td>
                      
                      <td className="px-4 py-3 text-gray-400 font-mono text-xs whitespace-nowrap">
                          {formatDate(p.date)}
                      </td>

                      <td className="px-6 py-4 text-right whespace-nowrap">
                        <div className="flex justify-end items-center">
                            {/* <button 
                                onClick={() => setAssignTarget(p)} 
                                disabled={p.quantity < 1} 
                                className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 disabled:opacity-30 disabled:cursor-not-allowed transition"
                                title="Assign"
                            >
                                <UserPlus size={16} />
                            </button> */}
                            
                            <button 
                                onClick={() => setDeleteTarget(p)} 
                                className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                                title="Delete"
                            >
                                <Trash2 size={16}/>
                            </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-16 text-gray-500">
                        <div className="flex flex-col items-center gap-2">
                            <Search size={32} className="opacity-20"/>
                            <p>No items found matching your search.</p>
                        </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* PAGINATION CONTROLS */}
        {filteredProducts.length > itemsPerPage && (
           <div className="flex justify-center items-center gap-4 mt-6">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 bg-gray-800 border border-gray-700 rounded-lg disabled:opacity-30 hover:bg-gray-700 text-white transition"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-gray-400 text-sm font-medium">Page <span className="text-white">{currentPage}</span> of {totalPages}</span>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 bg-gray-800 border border-gray-700 rounded-lg disabled:opacity-30 hover:bg-gray-700 text-white transition"
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