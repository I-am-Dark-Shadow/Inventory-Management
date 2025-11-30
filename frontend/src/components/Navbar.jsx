import { Bell, Moon, UserCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  // Map route to title
  const getTitle = () => {
    switch(location.pathname) {
      case '/': return 'Dashboard';
      case '/inventory': return 'Stock Inventory';
      default: return 'Overview';
    }
  };

  return (
    <div className="flex justify-between items-center mb-8 bg-[#18181B] p-4 rounded-xl border border-gray-800">
      <h2 className="text-xl font-semibold text-white">{getTitle()}</h2>

      <div className="flex items-center gap-4">
        {/* Top Navigation Links from Design */}
        <div className="bg-[#0B0C10] border border-gray-700 rounded-lg p-1 flex gap-1 mr-4">
          <button className={`px-4 py-1.5 rounded text-sm font-medium ${location.pathname === '/' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}>
            Dashboard
          </button>
          <button className={`px-4 py-1.5 rounded text-sm font-medium ${location.pathname === '/inventory' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}>
            Stock
          </button>
        </div>

        {/* Action Icons */}
        <button className="text-gray-400 hover:text-white"><Bell size={20} /></button>
        <button className="text-gray-400 hover:text-white"><Moon size={20} /></button>
        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold cursor-pointer">
          <UserCircle size={24} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;