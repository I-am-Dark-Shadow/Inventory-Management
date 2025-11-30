import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-black text-white font-sans">
      
      {/* Sidebar Component with State Props */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-64 transition-all duration-300">
        
        {/* --- MOBILE HEADER (Visible only on Mobile) --- */}
        <div className="md:hidden bg-[#0F1115] border-b border-gray-800 p-4 flex justify-between items-center sticky top-0 z-30">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-black font-bold">K</div>
             <span className="font-bold text-lg">KREDENT STOCK</span>
          </div>
          
          {/* Hamburger Menu Button (Opens Sidebar from Right) */}
          <button onClick={() => setSidebarOpen(true)} className="text-white hover:bg-gray-800 p-2 rounded">
            <Menu size={24} />
          </button>
        </div>

        {/* Page Content */}
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;