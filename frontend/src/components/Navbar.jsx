import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Boxes, LogOut } from "lucide-react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0F1115]/90 backdrop-blur-xl border-b border-gray-800">
      <div className="max-w-7xl mx-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="text-xl font-bold text-white cursor-pointer tracking-wide"
        >
          <img src="./images.png" alt="" className="w-[120px]" />
        </div>

        {/* NAV LINKS */}
        <div className="flex items-center mx-[-190px] gap-6 text-sm font-semibold">
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

          {/* LOGOUT */}
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-400 bg-red-500/10 hover:bg-red-100 transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
