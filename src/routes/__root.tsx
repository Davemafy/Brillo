import {
  createRootRouteWithContext,
  Outlet,
  HeadContent,
} from "@tanstack/react-router";
import { ThemeProvider } from "../contexts/ThemeContext";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => {
    return (
      <>
        <ThemeProvider>
          <HeadContent />
          <Outlet />
        </ThemeProvider>
      </>
    );
  },
});
