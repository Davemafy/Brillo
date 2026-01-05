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
      className={`  flex transition text-[0.8rem]  md:transition-none flex-col shrink-0 bg-inherit h-full fixed top-0 z-100 md:static w-fit ${!sidebarOpen ? "-translate-x-full md:translate-0" : "md:w-60"}`}
    >
      <div className="shrink-0 flex flex-col h-full   bg-black text-white roun">
        <h2
          className={`shrink-0  p-10 text-xl flex  items-center gap-2 ${!sidebarOpen ? "" : ""}`}
        >
          <Link to={"/"}>
            <img src="../brillo.svg" alt="logo" className=" h-7 " />
          </Link>
        </h2>
        <ul className="h-full flex items-stretch flex-col pb-10">
          <li onClick={closeSideBar} className=" relative">
            <div
              className={`absolute h-full w-1 bg-white rounded-tr-2xl rounded-br-2xl top-0 ${activeTab === "/courses" ? "translate-y-full" : activeTab === "/notes" ? "translate-y-[200%]" : activeTab === "/settings" && "opacity-0"} `}
            ></div>
            <Link
              className={`flex gap-2 items-center justify-stretch  p-4 py-3 px-8 pr-20   hover:bg-[#333] hover:text-[#eee] transition ${activeTab == "/dashboard" ? "bg-[#333] text-[#eee] " : "opacity-45"}`}
              to="/app/dashboard"
            >
              <Home size={20} />
              <p
                className={`${sidebarOpen ? "" : ""}  md:block font-semibold`}
              >
                Dashboard
              </p>
            </Link>
          </li>
          <li onClick={closeSideBar}>
            <Link
              className={`flex gap-2 items-center justify-stretch  p-4 py-3 px-8 pr-20   hover:bg-[#333] hover:text-[#eee] transition ${activeTab == "/courses" ? "bg-[#333] text-[#eee] " : "opacity-45"}`}
              to="/app/courses"
            >
              <LibraryBig size={20} />
              <p
                className={`${sidebarOpen ? "" : ""}  md:block font-semibold`}
              >
                Courses
              </p>
            </Link>
          </li>
          <li onClick={closeSideBar}>
            <Link
              className={`flex gap-2 items-center justify-stretch  p-4 py-3 px-8 pr-20   hover:bg-[#333] hover:text-[#eee] transition ${activeTab == "/notes" ? "bg-[#333] text-[#eee] " : "opacity-45"}`}
              to="/app/notes"
            >
              <BookOpenText size={20} />
              <p
                className={`${sidebarOpen ? "" : ""} md:block font-semibold`}
              >
                Notes
              </p>
            </Link>
          </li>
          <li onClick={closeSideBar} className="mt-auto relative">
            <div
              className={`absolute h-full w-1 bg-white rounded-tr-2xl rounded-br-2xl top-0 transition opacity-0 ${activeTab === "/settings" && "opacity-100"} `}
            ></div>
            <Link
              className={`flex gap-2 items-center justify-stretch  p-4 py-3 px-8 pr-20   hover:bg-[#333] hover:text-[#eee] transition ${activeTab == "/settings" ? "bg-[#333] text-[#eee] " : "opacity-45"}`}
              to="/app/settings"
            >
              <Settings size={20} />
              <p
                className={`${sidebarOpen ? "" : ""} md:block font-semibold`}
              >
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
              <p
                className={`${sidebarOpen ? "" : ""} md:block font-semibold`}
              >
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
