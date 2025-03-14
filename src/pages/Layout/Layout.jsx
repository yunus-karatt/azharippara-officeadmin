import React, { useEffect, useRef } from "react";
import Header from "../../components/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useSidebar } from "../../../Context/SidebarContext";

const Layout = () => {
  const { isSidebarOpen, closeSidebar } = useSidebar();
  const sidebarRef = useRef(null);
  const location= useLocation()

  const handleOutsideClick = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      if (isSidebarOpen) {
        closeSidebar();
      }
    }
  };

  // closing sidebar if click is outside sidebar
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick); // Mobile support

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, []);

  // closing sidebar when route change
  useEffect(()=>{
    if(isSidebarOpen){
      closeSidebar()
    }
  },[location.pathname])
  return (
    <div className="">
      <div
        className={`w-full md:w-[calc(100vw-300px)]  fixed top-0 md:left-[300px]`}
      >
        <Header />
      </div>

      <div
        ref={sidebarRef}
        className={`w-[300px] h-[100vh] fixed z-10  md:translate-x-0 top-0  transition-all  duration-500 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } `}
      >
        <Sidebar />
      </div>

      {isSidebarOpen && (
        <div onClick={()=>closeSidebar()} className="fixed top-0 right-0 bg-black/30 h-screen w-screen backdrop-blur-sm "></div>
      )}

      <div className={`mt-[70px] md:ml-[300px] p-3 bg-white`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
