import { Link, RouterProvider, createRouter } from "@tanstack/react-router";
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
    <div className="h-screen grid place-content-center">
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
    <div className="h-screen flex place-items-center ">
      <div className="grow opacity-40 blur-3xl bg-[url(/assets/img/jive-shapes-top.svg)] lg:bg-[url(/assets/img/jive-shapes-left.svg)] flex min-h-0 lg:h-screen bg-no-repeat bg-cover bg-bottom lg:bg-top w-full"></div>
      <div className="absolute z-100 w-full h-full text-xl flex flex-col gap-10 justify-center text-center text-[#201f1f]">
        <h1 className="text-[9rem] font-extralight leading-[8rem] tracking-[-15px] text-[#201f1f]">
          404
        </h1>
        <div>
          <h2 className="text-3xl font-bold mb-3">Page not found</h2>
          <p className="text-sm font-medium">
            The page you are looking for does not exist. It might have been
            moved or delete
          </p>
        </div>
        <p className="">
          <Link
            to="/"
            className="block text-sm w-fit mx-auto px-6 py-4 border border-[#201f1f] text-[#201f1f] rounded-2xl"
          >
            Back to home
          </Link>
        </p>
      </div>
      <div className="grow opacity-40 blur-3xl bg-[url(/assets/img/jive-shapes-bottom.svg)] lg:bg-[url(/assets/img/jive-shapes-right.svg)] bg-shapes-top flex min-h-0 lg:h-screen bg-no-repeat bg-cover bg:bottom lg:bg-top w-full"></div>
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
