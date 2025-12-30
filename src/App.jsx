import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useUser } from "./hooks/useUser";
import { UserProvider } from "./contexts/UserContext";

const router = createRouter({
  routeTree,
  context: {
    auth: undefined,
  },
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
  const [user] = useUser();
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
