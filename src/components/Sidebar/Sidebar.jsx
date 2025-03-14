import { House, LayoutDashboard, UserPen } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const sidebarItems = [
  {
    id: 0,
    title: "Dashboard",
    href: "/",
    icon: <LayoutDashboard size={30} />,
  },
  {
    id: 3,
    title: "Households",
    href: "/houses",
    icon: <House size={30} />,
  },
  {
    id: 4,
    title: "Profile",
    href: "/profile",
    icon: <UserPen />,
  },
];
const Sidebar = () => {
  return (
    <div className="w-full h-full px-3 bg-gradient-to-br from-blue-50/50 to-indigo-100/20 backdrop-blur-sm">
      <div className="h-[70px] flex justify-center items-center font-bold text-16 uppercase">
        <img src="/icons/mosque.svg" alt="mosq" className="max-h-[90%]" />
      </div>
      <div className="p-3 grid grid-cols-1 gap-3 mt-3">
        {sidebarItems.map((itme) => (
          <Link
            to={itme.href}
            className="p-3 sidebar-link  py-6 relative bg-emirald-green/10  text-16 "
          >
            <div className="flex items-center gap-2">
              <span>{itme.icon}</span>
              {itme.title}
            </div>
            <span className="fold"></span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
