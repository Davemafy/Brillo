import { createLazyFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { jwtDecode } from "jwt-decode";
import { flushSync } from "react-dom";
import { useUser } from "../hooks/useUser";
import { GoogleLogin } from "@react-oauth/google";

export const Route = createLazyFileRoute("/login")({
  component: Login,
});

function Login() {
  const [_, setUser] = useUser();

  const navigate = useNavigate();
  const router = useRouter();
  const { redirect } = Route.useSearch(); // Captured from the initial redirect

  const handleLoginSuccess = (response) => {
    const token = response.credential;
    const userData = jwtDecode(token);

    flushSync(() => {
      setUser({
        ...userData,
        isAuthenticated: true,
      });
    });

    router.invalidate();

    navigate({ to: redirect || "/dashboard" });
  };

  const handleLoginError = (error) => {
    console.log(error);
  };
  return (
    <>
      <title> Login | Brillo </title>
      <div className="h-screen flex flex-col  lg:flex-row gap-2">
        <div className="grow bg-[url(/assets/img/jive-shapes-top.svg)] lg:bg-[url(/assets/img/jive-shapes-left.svg)] flex min-h-0 lg:h-screen bg-no-repeat bg-cover bg-bottom lg:bg-top w-full"></div>
        <div className="p-6 md:py-8 w-full lg:w-auto px-6 mx-auto flex flex-col justify-center flex-none gap-6 items-center lg:min-w-125 max-w-160 md:mt-0 ">
          <div className="mb-4">
            <img src="/assets/img/brillo.svg" alt="logo.svg" />
          </div>
          <h1 className="pt-1.5 text-2xl text-center font-bold leading-tight tracking-tight text-gray-900 ">
            Welcome back
          </h1>
          <form className="flex flex-col w-full gap-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email-address"
                className="font-medium text-gray-900"
              >
                Email address
              </label>
              <input
                type="text"
                placeholder="Email address"
                className="bg-gray-50 border border-gray-200 text-gray-900 text-base md:text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-4 py-3  placeholder:text-gray-400"
              />
            </div>
            <button className="w-full text-white bg-dark hover:bg-jive-blue focus:ring-4 focus:outline-none focus:ring-[] font-medium rounded-full text-lg px-5 py-3 text-center  transition">
              Sign in
            </button>
          </form>
          <div className="mr-auto">
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginError}
            />
          </div>
          <p className="text-mediumgrey font-light">
            New here?{" "}
            <Link
              to="/signup"
              className="inline-block ml-1 font-normal text-dark"
            >
              Sign up
            </Link>
          </p>
          <p class="font-normal text-gray-700 text-center mb-2">
            ©2025{" "}
            <a href="https://www.letsjive.io/" class="text-700">
              Jive
            </a>
          </p>
        </div>
        <div className="grow bg-[url(/assets/img/jive-shapes-bottom.svg)] lg:bg-[url(/assets/img/jive-shapes-right.svg)] bg-shapes-top flex min-h-0 lg:h-screen bg-no-repeat bg-cover bg:bottom lg:bg-top w-full"></div>
      </div>
    </>
  );
}
