import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useUser } from "./hooks/useUser";
import { UserProvider } from "./contexts/UserContext";

import { Squircle } from "ldrs/react";
import "ldrs/react/Squircle.css";

const router = createRouter({
  routeTree,
  context: {
    auth: undefined,
  },
  defaultPendingComponent: () => (
    <div className="h-full grid place-content-center">
      <Squircle
        size="37"
        stroke="5"
        strokeLength="0.15"
        bgOpacity="0.1"
        speed="0.9"
        color="black"
      />
    </div>
  ),
  defaultPendingMinMs: 0,
  defaultPendingMs: 0,
  defaultNotFoundComponent: () => (
    <div>
      <p>Oops, not found! Haha..🤷‍♂️ 👨🏻‍💻</p>
    </div>
  ),
});

function App() {
  return (
    <>
      <UserProvider>
        <RouterApp />
      </UserProvider>
    </>
  );
}

function RouterApp() {
  const { user } = useUser();
  const auth = {
    isAuthenticated: user.isAuthenticated,
    user: user,
  };

  return (
    <>
      <RouterProvider router={router} context={{ auth }} />
    </>
  );
}

export default App;
