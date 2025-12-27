import { createFileRoute, Outlet } from "@tanstack/react-router";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { RecordProvider } from "../../contexts/RecordContext";
import { CoursesProvider } from "../../contexts/CoursesContext";
import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";

export const Route = createFileRoute("/_authenticated")({
  component: Setup,
});

function Setup() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme] = useTheme();

  function toogleSidebar() {
    setSidebarOpen((sidebarOpen) => !sidebarOpen);
  }

  function closeSideBar() {
    setSidebarOpen(false);
  }

  return (
    <div className={`setup font-monasans ${theme.themes[theme.current].style}`}>
        <RecordProvider>
          <Sidebar sidebarOpen={sidebarOpen} closeSideBar={closeSideBar} />
          <div className="w-full h-full flex flex-col">
            <Header sidebarOpen={sidebarOpen} toogleSidebar={toogleSidebar} />
            <CoursesProvider>
              <main className="flex-1 w-full overflow-auto">
                <Outlet />
              </main>
            </CoursesProvider>
          </div>
        </RecordProvider>
      </div>
  );
}
