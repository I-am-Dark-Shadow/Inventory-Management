import { useEffect, useState } from 'react';
import { Monitor, Cpu, Keyboard, Mouse, Server, Plug, Search, FolderPlus, Mail, Plus, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import toast from 'react-hot-toast';
import AddStockModal from '../components/Modals/AddStockModal';
import SendReportModal from '../components/Modals/SendReportModal';
import AddCategoryModal from '../components/Modals/AddCategoryModal';

const Dashboard = () => {
  const [categoryStats, setCategoryStats] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Modal States
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const [isReportModalOpen, setReportModalOpen] = useState(false);
  const [preSelectedCategory, setPreSelectedCategory] = useState('Monitor');

  const fetchData = async () => {
    try {
      const { data } = await axios.get('/products?limit=2000');
      processCategoryStats(data.products);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const processCategoryStats = (items) => {
    const stats = {};
    // Calculate total quantity per category
    items.forEach(item => {
      if (!stats[item.category]) {
        stats[item.category] = { name: item.category, totalQuantity: 0 };
      }
      stats[item.category].totalQuantity += item.quantity;
    });
    setCategoryStats(Object.values(stats));
  };

  useEffect(() => { fetchData(); }, []);

  // Filter Categories by Search
  const filteredStats = categoryStats.filter(stat => 
    stat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddStock = async (formData) => {
    try {
      await axios.post('/products', formData);
      toast.success('Stock Added');
      setAddModalOpen(false);
      fetchData();
    } catch (err) { toast.error('Error adding stock'); }
  };

  const getIcon = (category) => {
    const cat = category?.toLowerCase() || '';
    if(cat.includes('monitor')) return <Monitor size={24} />;
    if(cat.includes('cpu')) return <Cpu size={24} />;
    if(cat.includes('key')) return <Keyboard size={24} />;
    if(cat.includes('mouse')) return <Mouse size={24} />;
    if(cat.includes('printer')) return <FolderPlus size={24} />;
    return <Plug size={24} />;
  };

  return (
    <div>
      <div className="flex flex-col xl:flex-row justify-between items-center gap-4 mb-8 bg-[#18181B] p-4 rounded-xl border border-gray-800">
        
        {/* Search Bar for Categories */}
        <div className="relative w-full xl:w-96">
            <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search category..." 
              className="bg-black border border-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:border-blue-500 outline-none w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>

        <div className="flex gap-3">
           <button onClick={() => setCategoryModalOpen(true)} className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm border border-gray-700 transition">
            <FolderPlus size={18} /> Add Category
          </button>
          <button onClick={() => setReportModalOpen(true)} className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm border border-gray-700 transition">
            <Mail size={18} /> Email Report
          </button>
          <button onClick={() => { setPreSelectedCategory('Monitor'); setAddModalOpen(true); }} className="flex items-center gap-2 bg-white text-black font-semibold hover:bg-gray-200 px-4 py-2 rounded-lg text-sm transition">
            <Plus size={18} /> Add Stock
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredStats.map((stat) => (
          <div key={stat.name} className={`bg-[#18181B] p-5 rounded-xl border-2 transition hover:shadow-lg 
            ${stat.totalQuantity < 5 ? 'border-red-500/60 shadow-red-900/10' : 'border-green-500/60 shadow-green-900/10'}`}>
            
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-800 rounded-lg text-gray-300">
                  {getIcon(stat.name)}
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">{stat.name}</h3>
                </div>
              </div>
              <span className={`text-3xl font-bold ${stat.totalQuantity < 5 ? 'text-red-400' : 'text-green-400'}`}>
                {stat.totalQuantity}
              </span>
            </div>
            
            <div className="flex justify-between text-sm text-gray-500 mb-6">
              <span>Stock Status:</span>
              <span className={`font-bold ${stat.totalQuantity < 5 ? 'text-red-400' : 'text-green-400'}`}>
                 {stat.totalQuantity < 5 ? 'LOW STOCK' : 'GOOD'}
              </span>
            </div>

            <div className="flex gap-3 mt-auto">
              <button onClick={() => navigate(`/inventory?category=${stat.name}`)} className="flex-1 flex items-center justify-center gap-2 bg-transparent border border-gray-600 hover:bg-gray-700 text-white py-2 rounded text-sm transition">
                <Eye size={16} /> Details
              </button>
              <button onClick={() => { setPreSelectedCategory(stat.name); setAddModalOpen(true); }} className="flex-1 bg-white text-black py-2 rounded text-sm font-bold hover:bg-gray-200 transition">
                + Add
              </button>
            </div>
          </div>
        ))}
      </div>

      {isAddModalOpen && <AddStockModal onClose={() => setAddModalOpen(false)} onAdd={handleAddStock} defaultCategory={preSelectedCategory} />}
      {isCategoryModalOpen && <AddCategoryModal onClose={() => setCategoryModalOpen(false)} onCategoryAdded={fetchData} />}
      {isReportModalOpen && <SendReportModal onClose={() => setReportModalOpen(false)} />}
    </div>
  );
};

export default Dashboard;