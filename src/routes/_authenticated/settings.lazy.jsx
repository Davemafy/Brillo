import { createLazyFileRoute } from "@tanstack/react-router";
import Sidebar from "../../components/Sidebar";

export const Route = createLazyFileRoute("/_authenticated/settings")({
  component: Settings,
});

function Settings() {
  return (
    <div className="w-full h-full overflow-auto">
      <div className="p-8.25 border-b border-grey">
        <h2 className="text-[1.75rem] font-bold leading-6">Settings</h2>
      </div>
    </div>
  );
}
