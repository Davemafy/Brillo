import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ThemeProvider } from "../contexts/ThemeContext";
import ErrorBoundary from "../components/ErrorBoundary";

export const Route = createRootRoute({
  component: () => {
    return (
      <>
          <ThemeProvider>
            <Outlet />
          </ThemeProvider>
      </>
    );
  },
});
  