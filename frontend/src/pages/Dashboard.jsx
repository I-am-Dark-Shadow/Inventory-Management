import { useEffect, useState } from 'react';
import {
  Monitor,
  Cpu,
  Keyboard,
  Mouse,
  Plug,
  Search,
  FolderPlus,
  Plus,
  Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import toast from 'react-hot-toast';

// Modals
import AddStockModal from '../components/Modals/AddStockModal';
import AddCategoryModal from '../components/Modals/AddCategoryModal';

/* =========================
   RESERVE RULES (MASTER)
========================= */
const RESERVE_RULES = {
  monitor: 5,
  cpu: 5,
  mouse: 2,
  keyboard: 2,
  splitter: 2,
  'green vdi': 2,
};

const Dashboard = () => {
  const [categoryStats, setCategoryStats] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Modals
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const [preSelectedCategory, setPreSelectedCategory] = useState('Monitor');

  const navigate = useNavigate();

  /* =========================
       FETCH DATA
  ========================= */
  const fetchData = async () => {
    try {
      const { data } = await axios.get('/products?limit=5000');
      processCategoryStats(data.products);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* =========================
      PROCESS CATEGORY STATS
  ========================= */
  const processCategoryStats = (items) => {
    const stats = {};

    items.forEach((item) => {
      const category = item.category;
      const key = category.toLowerCase();

      if (!stats[category]) {
        const reserve = RESERVE_RULES[key] || 0;
        stats[category] = {
          name: category,
          total: 0,
          reserve,
          available: 0,
        };
      }

      stats[category].total += item.quantity;
    });

    Object.values(stats).forEach((stat) => {
      stat.available = Math.max(stat.total - stat.reserve, 0);
    });

    setCategoryStats(Object.values(stats));
  };

  /* =========================
        SEARCH FILTER
  ========================= */
  const filteredStats = categoryStats.filter((stat) =>
    stat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* =========================
        ADD STOCK
  ========================= */
  const handleAddStock = async (formData) => {
    try {
      await axios.post('/products', formData);
      toast.success('Stock Added');
      setAddModalOpen(false);
      fetchData();
    } catch {
      toast.error('Error adding stock');
    }
  };

  /* =========================
          ICON LOGIC
  ========================= */
  const getIcon = (category) => {
    const cat = category?.toLowerCase() || '';
    if (cat.includes('monitor')) return <Monitor size={24} />;
    if (cat.includes('cpu')) return <Cpu size={24} />;
    if (cat.includes('keyboard')) return <Keyboard size={24} />;
    if (cat.includes('mouse')) return <Mouse size={24} />;
    return <Plug size={24} />;
  };

  /* =========================
            UI
  ========================= */
  return (
    <div className="space-y-8">
      {/* TOP BAR */}
      <div className="flex flex-col xl:flex-row justify-between items-center gap-4 bg-[#18181B] p-4 rounded-xl border border-gray-800">
        {/* Search */}
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

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setCategoryModalOpen(true)}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm border border-gray-700"
          >
            <FolderPlus size={18} /> Add Category
          </button>

          <button
            onClick={() => {
              setPreSelectedCategory('Monitor');
              setAddModalOpen(true);
            }}
            className="flex items-center gap-2 bg-white text-black font-bold px-4 py-2 rounded-lg hover:bg-blue-500 transition"
          >
            <Plus size={18} /> Add Stock
          </button>
        </div>
      </div>

      {/* CATEGORY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {filteredStats.map((stat) => {
          
          //  ✅ NEW LOW STOCK RULE
          const critical = stat.available <= 5;

          return (
            <div
              key={stat.name}
              className={`bg-gradient-to-br from-[#18181B] to-[#0F1115] p-6 rounded-2xl border 
              ${
                critical
                  ? 'border-red-500/60 shadow-red-900/20'
                  : 'border-green-500/60 shadow-green-900/20'
              } hover:shadow-2xl transition`}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-3 rounded-xl ${
                      critical
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-green-500/20 text-green-400'
                    }`}
                  >
                    {getIcon(stat.name)}
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {stat.name}
                  </h3>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-col gap-2 mb-6">
                <div className="bg-black/40 px-3 py-2 rounded-lg flex justify-between items-center">
                  <p className="text-xs text-gray-400">TOTAL</p>
                  <p className="text-xl font-bold text-white">{stat.total}</p>
                </div>

                <div className="bg-black/40 p-3 rounded-lg flex justify-between items-center">
                  <p className="text-xs text-gray-400">RESERVED</p>
                  <p className="text-xl font-bold text-yellow-400">
                    {stat.reserve}
                  </p>
                </div>

                <div className="bg-black/40 p-3 rounded-lg flex justify-between items-center">
                  <p className="text-xs text-gray-400">AVAILABLE</p>
                  <p
                    className={`text-xl font-bold ${
                      critical ? 'text-red-400' : 'text-green-400'
                    }`}
                  >
                    {stat.available}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    navigate(`/inventory?category=${stat.name}`)
                  }
                  className="flex-1 bg-white/10 hover:bg-orange-500/20 text-white py-2 rounded-lg text-sm "
                >
                  <Eye size={16} className="inline mr-1 mb-1" />
                  View
                </button>

                <button
                  onClick={() => {
                    setPreSelectedCategory(stat.name);
                    setAddModalOpen(true);
                  }}
                  className="flex-1 bg-white text-black font-bold py-2 rounded-lg hover:bg-blue-500 transition"
                >
                  + Add
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODALS */}
      {isAddModalOpen && (
        <AddStockModal
          onClose={() => setAddModalOpen(false)}
          onAdd={handleAddStock}
          defaultCategory={preSelectedCategory}
        />
      )}

      {isCategoryModalOpen && (
        <AddCategoryModal
          onClose={() => setCategoryModalOpen(false)}
          onCategoryAdded={fetchData}
        />
      )}
    </div>
  );
};

export default Dashboard;
