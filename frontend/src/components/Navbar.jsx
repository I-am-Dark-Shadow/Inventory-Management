import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Boxes, LogOut, Menu, X } from "lucide-react";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state

  // Link a click korle jeno menu bondho hoye jay (Mobile a)
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0F1115]/90 backdrop-blur-xl border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer"
        >
          {/* Mobile a logo ektu choto, Desktop a boro */}
          <img src="./images.png" alt="Logo" className="w-[100px] md:w-[120px]" />
        </div>

        {/* --- DESKTOP MENU (Hidden on Mobile) --- */}
        <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg transition
              ${isActive ? "bg-blue-500/20 text-blue-400" : "text-gray-300 hover:bg-white/10"}`
            }
          >
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>

          <NavLink
            to="/inventory"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg transition
              ${isActive ? "bg-green-500/20 text-green-400" : "text-gray-300 hover:bg-white/10"}`
            }
          >
            <Boxes size={18} /> Inventory
          </NavLink>

          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-400 bg-red-500/10 hover:bg-red-500/20 transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        {/* --- MOBILE MENU BUTTON (Visible only on Mobile) --- */}
        <button 
            className="md:hidden text-gray-300 hover:text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
        >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* --- MOBILE DROPDOWN MENU --- */}
      {isOpen && (
        <div className="md:hidden bg-[#0F1115] border-b border-gray-800 px-4 pt-2 pb-4 shadow-xl">
           <div className="flex flex-col space-y-3">
              <NavLink
                to="/"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition text-base font-medium
                  ${isActive ? "bg-blue-500/20 text-blue-400" : "text-gray-300 hover:bg-white/10"}`
                }
              >
                <LayoutDashboard size={20} /> Dashboard
              </NavLink>

              <NavLink
                to="/inventory"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition text-base font-medium
                  ${isActive ? "bg-green-500/20 text-green-400" : "text-gray-300 hover:bg-white/10"}`
                }
              >
                <Boxes size={20} /> Inventory
              </NavLink>

              <button
                onClick={() => {
                    closeMenu();
                    logout();
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 bg-red-500/10 hover:bg-red-500/20 transition text-base font-medium w-full text-left"
              >
                <LogOut size={20} /> Logout
              </button>
           </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;