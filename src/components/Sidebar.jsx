import { Link, useLocation } from "@tanstack/react-router";
import { Book, BookOpenText, Gauge, Home, LibraryBig, LogOut, Settings, StickyNote } from "lucide-react";
import Streak from "./Streak";
import { useUser } from "../hooks/useUser";

const Sidebar = ({ sidebarOpen, closeSideBar }) => {
  const activeTab = useLocation({ select: (location) => location.pathname }).replace("/app", "");
  const { logOut } = useUser()

  const handleLogout = () => {
    logOut()
  }

  return (
    <aside
      className={` flex transition text-[0.8rem]  lls:transition-none flex-col shrink-0 bg-inherit h-full fixed top-0 z-100 lls:static  w-fit md:w-fit ${!sidebarOpen ? "-translate-x-full lls:translate-0" : "lls:w-60"}`}
    >
      <div className="shrink-0 flex flex-col h-full   bg-black text-white rounded-tr-3xl">
        <Link to={"/"}>
          <h2
            className={`shrink-0  pt-10 pb-6 mx-auto text-xl flex w-22 items-center gap-2 ${!sidebarOpen ? "md:w-fit" : ""}`}
          >
            <img
              src="../favicon.png"
              alt="logo"
              className="block sm:hidden h-full w-full"
            />
            <img
              src="../brillo.svg"
              alt="logo"
              className="hidden sm:block h-7 "
            />
          </h2>
        </Link>
        <ul className="h-full flex items-stretch flex-col p-6 px-4 gap-2 md:px-6">
          <li onClick={closeSideBar}>
            <Link
              className={`flex gap-2 items-center justify-stretch  p-4 py-3  rounded-xl hover:bg-[#333] hover:text-[#eee] transition ${activeTab == "/dashboard" ? "bg-[#333] text-[#eee] " : "opacity-45"}`}
              to="/app/dashboard"
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
              className={`flex gap-2 items-center justify-stretch  p-4 py-3  rounded-xl hover:bg-[#333] hover:text-[#eee] transition ${activeTab == "/courses" ? "bg-[#333] text-[#eee] " : "opacity-45"}`}
              to="/app/courses"
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
              className={`flex gap-2 items-center justify-stretch  p-4 py-3  rounded-xl hover:bg-[#333] hover:text-[#eee] transition ${activeTab == "/notes" ? "bg-[#333] text-[#eee] " : "opacity-45"}`}
              to="/app/notes"
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
              className={`flex gap-2 items-center justify-stretch  p-4 py-3  rounded-xl hover:bg-[#333] hover:text-[#eee] transition ${activeTab == "/settings" ? "bg-[#333] text-[#eee] " : "opacity-45"}`}
              to="/app/settings"
            >
              <Settings size={20} />
              <p
                className={`${sidebarOpen ? "" : "lls:hidden"} md:block font-semibold`}
              >
                Settings
              </p>
            </Link>
          </li>
          <li onClick={handleLogout} className=" hover:text-red-500">
            <Link
              className={`flex gap-2 items-center justify-stretch  p-4 py-3  rounded-xl hover:text-red-500 transition opacity-45 hover:opacity-100`}
              to="/app/login"
            >
              <LogOut size={20} />
              <p
                className={`${sidebarOpen ? "" : "lls:hidden"} md:block font-semibold`}
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
