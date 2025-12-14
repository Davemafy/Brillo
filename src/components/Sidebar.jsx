import { Link, useLocation } from "@tanstack/react-router";
import { Gauge, Settings, StickyNote } from "lucide-react";

const Sidebar = () => {
  const activeTab = useLocation({ select: (location) => location.pathname });

  console.log(activeTab);

  return (
    <aside className="-translate-full sm:translate-0 flex flex-col shrink-0 bg-white h-full fixed top-0 z-10 sm:static border-r border-grey w-fit md:w-60">
      <ul className="flex-1 flex flex-col gap-2 py-6.25 px-10 sm:px-6.25 md:px-10 mt-35 sm:mt-0">
        <li>
          <Link
            className={`flex gap-2 font-bold -ml-4 p-4 rounded-2xl ${activeTab == "/dashboard" ? "bg-gray-200" : "opacity-60"}`}
            to="/dashboard"
          >
            <Gauge />
            <p className="sm:hidden md:block">Dashboard</p>
          </Link>
        </li>
        <li>
          <Link
            className={`flex gap-2 font-bold -ml-4 p-4 rounded-2xl ${activeTab == "/notes" ? "bg-gray-200" : "opacity-60"}`}
            to="/notes"
          >
            <StickyNote></StickyNote>
            <p className="sm:hidden md:block">Notes</p>
          </Link>
        </li>
        <li className="mt-auto">
          <Link
            className={`flex gap-2 font-bold -ml-4 p-4 rounded-2xl ${activeTab == "/settings" ? "bg-gray-200" : "opacity-60"}`}
            to="/settings"
          >
            <Settings />
            <p className="sm:hidden md:block">Settings</p>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
