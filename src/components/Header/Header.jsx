import { LogOut, Menu } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../../../Context/SidebarContext";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const { toggleSidebar } = useSidebar();
  return (
    <nav className="w-full h-[70px]  bg-gradient-to-br from-blue-50/50 to-indigo-100/20 backdrop-blur-sm flex items-center justify-between  ">
      <div className="px-3 flex items-center gap-1">
        <div onClick={toggleSidebar} className="md:hidden  text-deep-navy">
          <Menu />
        </div>
        <h1 className=" md:text-22 font-bold uppercase flex flex-col md:flex-row">
          {" "}
          <span>Azharippara</span> <span> office admin </span>
        </h1>
      </div>
      <div className="flex-1 h-full flex items-center justify-end px-6">
        <button
          onClick={handleLogout}
          className="size-10 bg-[#0F4C4C] hover:bg-[#0F4C4C]/80 flex items-center justify-center text-white cursor-pointer"
        >
          {<LogOut />}
        </button>
      </div>
    </nav>
  );
};

export default Header;
