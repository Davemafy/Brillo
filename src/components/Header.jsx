import { Menu, MenuSquare, X } from "lucide-react";
import { useLocation } from "@tanstack/react-router";
import NavBar, { SearchBar, UserBar } from "./NavBar";

function Header({ sidebarOpen, toogleSidebar }) {
  const pathname = useLocation({
    select: (location) => location.pathname,
  }).replace("/app/", "");
  const activeTab = pathname[0].toUpperCase() + pathname.slice(1);

  return (
    <header className={`md:hidden items-center border-b border-grey`}>
      <div className="w-full z-10 flex items-center justify-between gap-4 bg-inherit p-5 py-4 lg:py-6.75">
        <h2 className="text-2xl font-medium leading-6 ">{activeTab}</h2>{" "}
        <div className="lg:hidden grid place-items-center">
          <button onClick={toogleSidebar} className="p-2 cursor-pointer">
            {!sidebarOpen ? (
              <Menu
                size={30}
                className={`p-0.5 py-1 border-[1.5px] ${sidebarOpen && "bg-black text-white"} rounded-md`}
              />
            ) : (
              <X
                size={30}
                className={`p-0.5 py-1 border-[1.5px] ${sidebarOpen && "bg-black text-white"} rounded-md`}
              />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
