import {
  createLazyFileRoute,
  Link,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { GoogleLogin } from "@react-oauth/google";
import { useUser } from "../../../hooks/useUser";
import { jwtDecode } from "jwt-decode";
import { flushSync } from "react-dom";

export const Route = createLazyFileRoute("/auth/_signup/signup")({
  component: Signup,
});

function Signup() {
  const { setUser } = useUser();

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

  const handleSignup = (formdata) => {
    alert(formdata.get("name"));
    setUser();
  };

  return (
    <>
      <title> Signup | Brillo </title>
      <div className="h-screen  flex flex-col  lg:flex-row gap-2">
        <div className="grow bg-[url(/assets/img/jive-shapes-top.svg)] lg:bg-[url(/assets/img/jive-shapes-left.svg)] flex min-h-0 lg:h-screen bg-no-repeat bg-cover bg-bottom lg:bg-top w-full"></div>
        <div className="p-6 md:py-8 w-full lg:w-auto px-6 mx-auto flex flex-col flex-none gap-4 items-center lg:min-w-125 max-w-160 md:mt-0 ">
          <div className="mb-2">
            <img src="/assets/img/brillo.svg" alt="logo.svg" />
          </div>
          <h1 className=" text-2xl text-center font-bold leading-tight tracking-tight text-gray-900 ">
            Create your account
          </h1>
          <form action={handleSignup} className="flex flex-col w-full gap-4">
            <div className="flex flex-col  gap-2">
              <label htmlFor="first-name" className="font-medium text-gray-900">
                Name
              </label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                className="bg-gray-50 border border-gray-200 text-gray-900 text-base md:text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-4 py-3  placeholder:text-gray-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-medium text-gray-900">
                Email address
              </label>
              <input
                type="email"
                placeholder="Email address"
                name="email"
                className="bg-gray-50 border border-gray-200 text-gray-900 text-base md:text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-4 py-3  placeholder:text-gray-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-medium text-gray-900">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="bg-gray-50 border border-gray-200 text-gray-900 text-base md:text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-4 py-3  placeholder:text-gray-400"
              />
            </div>
            <div className="flex gap-3 items-center">
              <input
                type="checkbox"
                name="accept-terms"
                className="w-5 h-5 border-gray-200  rounded checked:border-0  focus:ring-2 focus:ring-[#b0b0b0] "
              />
              <label
                htmlFor="accept-terms"
                className="font-light text-sm md:text-base text-gray-500"
              >
                I accept the
                <a
                  href="./"
                  className="font-medium inline-block ml-1 text-mediumgrey"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
            <button className="w-full text-white bg-dark hover:bg-jive-blue focus:ring-4 focus:outline-none focus:ring-[] font-medium rounded-full text-lg px-5 py-3 text-center  transition">
              Create an account
            </button>
          </form>
          <div className="mr-auto">
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginError}
            />
          </div>
          <p className="text-[#6b7280] font-light">
            Already have an account?{" "}
            <Link to="/auth/login" className="font-medium text-dark">
              Login
            </Link>
          </p>
        </div>
        <div className="grow bg-[url(/assets/img/jive-shapes-bottom.svg)] lg:bg-[url(/assets/img/jive-shapes-right.svg)] bg-shapes-top flex min-h-0 lg:h-screen bg-no-repeat bg-cover bg:bottom lg:bg-top w-full"></div>
      </div>
    </>
  );
}
