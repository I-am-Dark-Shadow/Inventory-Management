import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="pt-20 px-6">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
