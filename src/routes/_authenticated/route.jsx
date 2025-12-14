import { createFileRoute, Outlet } from "@tanstack/react-router";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { RecordProvider } from "../../contexts/RecordContext";

export const Route = createFileRoute("/_authenticated")({
  component: () => {
    return (
      <>
        <Header />
        <main className="flex h-full overflow-auto">
          <RecordProvider>
            <Sidebar />
            <Outlet />
          </RecordProvider>
        </main>
      </>
    );
  },
});
