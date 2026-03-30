import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import { RecordProvider } from "../../../contexts/RecordContext";
import { CoursesProvider } from "../../../contexts/CoursesContext";
import { useState } from "react";
import { useTheme } from "../../../hooks/useTheme";
import { NotesProvider } from "../../../contexts/NotesContext";

export const Route = createFileRoute("/app/_authenticated")({
  beforeLoad: ({ context, location }) => {
    // off user auth for offline debugging
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/app/login",
        search: {
          redirect: location.pathname,
        },
      });
    }
  },
  notFoundComponent: () => (
    <div className="h-full flex items-center justify-center">
      <p>Page not found</p>
    </div>
  ),
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
    <CoursesProvider>
      <NotesProvider>
        <div
          className={`setup font-monasans ${theme.themes[theme.current].style}`}
        >
          <Sidebar sidebarOpen={sidebarOpen} closeSideBar={closeSideBar} />
          <div
            className={`w-full h-full flex flex-col transition ${sidebarOpen && "translate-x-56.75"}`}
          >
            <Header toogleSidebar={toogleSidebar} />
            <main className="flex-1 w-full  overflow-auto">
              <Outlet />
            </main>
          </div>
        </div>
      </NotesProvider>
    </CoursesProvider>
  );
}
