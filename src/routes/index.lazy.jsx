import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      Landing Page
      <Link to="/dashboard">
        <p className="block text-blue-400 underline">Dashboard</p>
      </Link>
      <Link to="/notes">
        <p className="block text-blue-400 underline">Notes</p>
      </Link>
    </div>
  );
}
