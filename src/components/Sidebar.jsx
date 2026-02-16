import { Link, useLocation } from "@tanstack/react-router";
import {
  Book,
  BookOpenText,
  Gauge,
  Home,
  LibraryBig,
  LogOut,
  Settings,
  StickyNote,
} from "lucide-react";
import Streak from "./Streak";
import { useUser } from "../hooks/useUser";

const Sidebar = ({ sidebarOpen, closeSideBar }) => {
  const activeTab = useLocation({
    select: (location) => location.pathname,
  }).replace("/app", "");
  const { logOut } = useUser();

  const handleLogout = () => {
    logOut();
  };

  return (
    <aside
      className={`flex transition text-[0.8rem]  md:transition-none flex-col shrink-0 bg-inherit h-full fixed top-0 z-30 md:static w-fit ${!sidebarOpen ? "-translate-x-[110%] md:translate-0" : "md:w-60"}`}
    >
      <div
        className={` w-screen h-full  absolute sm:hidden  -z-10 top-0 backdrop-blur-[0.2rem]  ${sidebarOpen ? "opacity-100 transition bg-[hsla(0,0%,70%,0.5)] " : "opacity-0 -translate-x-2/3"}`}
      ></div>
      <div className="shrink-0 flex flex-col h-full   bg-dark text-white">
        <h2
          className={`shrink-0  p-10 text-xl flex  items-center gap-2 ${!sidebarOpen ? "" : ""}`}
        >
          <Link to={"/"}>
            <img src="../brillo.svg" alt="logo" className=" h-7 " />
          </Link>
        </h2>
        <ul className="h-full flex items-stretch flex-col gap-2 px-2 pb-10">
          <li onClick={closeSideBar} className=" relative">
            <Link
              activeProps={{ className: "bg-[#333] text-[#eee] opacity-100" }}
              className={`flex gap-2 items-center justify-stretch  p-4 py-3 px-8 pr-20   hover:bg-[#333] hover:text-[#eee] rounded-md  transition ${activeTab == "/dashboard" ? "bg-[#333] text-[#eee] " : "opacity-45"}`}
              to="/app/dashboard"
            >
              <Home size={20} />
              <p className={`${sidebarOpen ? "" : ""}  md:block font-semibold`}>
                Dashboard
              </p>
            </Link>
          </li>
          <li onClick={closeSideBar}>
            <Link
              activeProps={{ className: "bg-[#333] text-[#eee] opacity-100" }}
              className={`flex gap-2 items-center justify-stretch  p-4 py-3 px-8 pr-20   hover:bg-[#333] hover:text-[#eee] rounded-md  transition opacity-45`}
              to="/app/courses"
            >
              <LibraryBig size={20} />
              <p className={`${sidebarOpen ? "" : ""}  md:block font-semibold`}>
                Courses
              </p>
            </Link>
          </li>
          <li onClick={closeSideBar}>
            <Link
              activeProps={{ className: "bg-[#333] text-[#eee] opacity-100" }}
              className={`flex gap-2 items-center justify-stretch  p-4 py-3 px-8 pr-20   hover:bg-[#333] hover:text-[#eee] rounded-md  transition ${activeTab == "/notes" ? "bg-[#333] text-[#eee] " : "opacity-45"}`}
              to="/app/notes"
            >
              <BookOpenText size={20} />
              <p className={`${sidebarOpen ? "" : ""} md:block font-semibold`}>
                Notes
              </p>
            </Link>
          </li>
          <li onClick={closeSideBar} className="mt-auto relative">
            <Link
              activeProps={{ className: "bg-[#333] text-[#eee] opacity-100" }}
              className={`flex gap-2 items-center justify-stretch  p-4 py-3 px-8 pr-20   hover:bg-[#333] hover:text-[#eee] rounded-md  transition ${activeTab == "/settings" ? "bg-[#333] text-[#eee] " : "opacity-45"}`}
              to="/app/settings"
            >
              <Settings size={20} />
              <p className={`${sidebarOpen ? "" : ""} md:block font-semibold`}>
                Settings
              </p>
            </Link>
          </li>
          <li onClick={handleLogout}>
            <Link
              className={`flex gap-2 items-center justify-stretch  p-4 py-3 px-8 pr-20  rounded-xl hover:text-red-500 transition opacity-45 hover:opacity-100`}
              to="/app/login"
            >
              <LogOut size={20} />
              <p className={`${sidebarOpen ? "" : ""} md:block font-semibold`}>
                Log Out
              </p>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
