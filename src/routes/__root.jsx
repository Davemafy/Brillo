import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ThemeProvider } from "../contexts/ThemeContext";
import { UserProvider } from "../contexts/UserContext";

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
