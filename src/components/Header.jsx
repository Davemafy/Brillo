import { Menu, MenuSquare, X } from "lucide-react";
import { useLocation } from "@tanstack/react-router";
import NavBar, { SearchBar, UserBar } from "./NavBar";

function Header({ toogleSidebar }) {
  const pathname = useLocation({
    select: (location) => location.pathname,
  }).replace("/app/", "");
  const activeTab = pathname[0].toUpperCase() + pathname.slice(1);

  return (
    <header className={`md:hidden items-center border-b border-grey`}>
      <div className="w-full z-10 flex items-center justify-between gap-4 bg-inherit p-6 py-5.5 lg:py-6.75">
        <h2 className="text-xl font-bold border-gray-200">{activeTab}</h2>
        <div className="lg:hidden grid place-items-center">
          <button onClick={toogleSidebar} className="p-2 cursor-pointer">
            <div className=" flex flex-col items-end gap-1">
              <div className="w-7.5 h-0.75 rounded-2xl bg-dark"></div>
              <div className="w-5 h-0.75 rounded-2xl bg-dark"></div>
              <div className="w-7 h-0.75 rounded-2xl bg-dark"></div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
