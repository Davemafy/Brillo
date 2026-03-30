import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/app/_auth/_signup")({
   validateSearch: (search: Record<string, unknown>): SearchParams => {
    return {
      redirect: (search.redirect as string) || undefined,
    }
  },
  component: Layout,
});

function Layout() {
  return <Outlet />;
}
