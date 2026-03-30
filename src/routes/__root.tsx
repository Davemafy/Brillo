import { createRootRoute, createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ThemeProvider } from "../contexts/ThemeContext";

export const Route = createRootRouteWithContext<RouterContext>()({
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
  