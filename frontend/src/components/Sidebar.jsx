import { LayoutDashboard, Package, LogOut, ClipboardList, X } from 'lucide-react'; 
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { logout } = useContext(AuthContext);
  
  const navClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      isActive ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
    }`;

  return (
    <>
      {/* --- OVERLAY (Mobile Only) --- */}
      {/* Jokhon menu open thakbe, background kalo hoye jabe r click korle bondho hobe */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 md:hidden glass"
        ></div>
      )}

      {/* --- SIDEBAR CONTAINER --- */}
      <div className={`
        fixed top-0 h-screen w-64 bg-[#0F1115] border-r border-gray-800 text-white z-50 flex flex-col p-4 transition-transform duration-300 ease-in-out
        
        /* DESKTOP STYLES (Always visible on Left) */
        md:left-0 md:translate-x-0 md:border-r 

        /* MOBILE STYLES (Right side, Hidden by default) */
        right-0 border-l md:border-l-0
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-black font-bold">K</div>
            <h1 className="font-semibold text-lg">KREDENT</h1>
          </div>
          
          {/* Close Button (Mobile Only) */}
          <button onClick={onClose} className="md:hidden text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-2">
          <NavLink to="/" onClick={onClose} className={navClasses}>
            <LayoutDashboard size={20} /> Dashboard
          </NavLink>
          <NavLink to="/inventory" onClick={onClose} className={navClasses}>
            <Package size={20} /> Inventory
          </NavLink>
          <NavLink to="/assignments" onClick={onClose} className={navClasses}>
            <ClipboardList size={20} /> Assigned Items
          </NavLink>
        </nav>

        {/* Logout Button */}
        <button onClick={logout} className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-gray-800 rounded-lg transition-colors mt-auto">
          <LogOut size={20} /> Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;