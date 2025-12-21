import { Link, useLocation } from "@tanstack/react-router";
import { Book, BookOpenText, Gauge, Home, LibraryBig, Settings, StickyNote } from "lucide-react";
import Streak from "./Streak";

const Sidebar = ({ sidebarOpen, closeSideBar }) => {
  const activeTab = useLocation({ select: (location) => location.pathname });

  return (
    <aside
      className={`p-4 flex transition text-[0.8rem]  lls:transition-none flex-col shrink-0 bg-inherit h-full fixed top-0 z-100 lls:static  w-fit md:w-fit ${!sidebarOpen ? "-translate-x-full lls:translate-0" : "lls:w-60"}`}
    >
      <div className="shrink-0 flex flex-col h-full   bg-black text-white rounded-xl">
        <Link to={"/dashboard"} >
          <h2
            className={`shrink-0 p-6.25 py-5.75  text-xl b  flex items-center gap-2 ${!sidebarOpen ? "md:w-full" : ""}`}
          >
            <img src="icon.svg" alt="logo" className="block h-10 w-10" />
          </h2>
        </Link>
        <ul className="h-full flex flex-col p-6 px-4 gap-2 md:pr-10">
          <li onClick={closeSideBar}>
            <Link
              className={`flex gap-2 items-center  p-4 py-3  rounded-xl hover:bg-[#333] hover:text-[#eee] transition ${activeTab == "/dashboard" ? "bg-[#333] text-[#eee] " : "opacity-45"}`}
              to="/dashboard"
            >
              <Home size={20} />
              <p
                className={`${sidebarOpen ? "" : "lls:hidden"}  md:block font-semibold`}
              >
                Dashboard
              </p>
            </Link>
          </li>
          <li onClick={closeSideBar}>
            <Link
              className={`flex gap-2 items-center  p-4 py-3  rounded-xl hover:bg-[#333] hover:text-[#eee] transition ${activeTab == "/courses" ? "bg-[#333] text-[#eee] " : "opacity-45"}`}
              to="/courses"
            >
              <LibraryBig size={20} />
              <p
                className={`${sidebarOpen ? "" : "lls:hidden"}  md:block font-semibold`}
              >
                Courses
              </p>
            </Link>
          </li>
          <li onClick={closeSideBar}>
            <Link
              className={`flex gap-2 items-center  p-4 py-3  rounded-xl hover:bg-[#333] hover:text-[#eee] transition ${activeTab == "/notes" ? "bg-[#333] text-[#eee] " : "opacity-45"}`}
              to="/notes"
            >
              <BookOpenText size={20} />
              <p
                className={`${sidebarOpen ? "" : "lls:hidden"} md:block font-semibold`}
              >
                Notes
              </p>
            </Link>
          </li>
          <li onClick={closeSideBar} className="mt-auto">
            <Link
              className={`flex gap-2 items-center  p-4 py-3  rounded-xl hover:bg-[#333] hover:text-[#eee] transition ${activeTab == "/settings" ? "bg-[#333] text-[#eee] " : "opacity-45"}`}
              to="/settings"
            >
              <Settings size={20} />
              <p
                className={`${sidebarOpen ? "" : "lls:hidden"} md:block font-semibold`}
              >
                Settings
              </p>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
