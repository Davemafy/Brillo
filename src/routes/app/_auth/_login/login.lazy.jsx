import {
  createLazyFileRoute,
  Link,
  useNavigate,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { jwtDecode } from "jwt-decode";
import { flushSync } from "react-dom";
import { useUser } from "../../../../hooks/useUser";
import { GoogleLogin } from "@react-oauth/google";
import { supabase } from "../../../../superbaseClient";
import { set } from "zod";
import { useAuth } from "../../../../hooks/useAuth";

export const Route = createLazyFileRoute("/app/_auth/_login/login")({
  component: Login,
});

function Login() {
  const { setUser } = useUser();
  const { loading, setLoading, setIsSuccess, setMessage, setIsVisible } =
    useAuth();

  const navigate = useNavigate();
  const state = useRouterState({ select: (s) => s.location.state });
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

    const destination = state?.returnTo || "/app/dashboard";

    navigate({ to: destination });

    setIsSuccess(true);
    setMessage("Login Successful!");
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => setMessage(""), 1000);
    }, 2000);
  };

  const handleLoginError = (error) => {
    console.log(error);
  };

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true);
    const formdata =  new FormData(e.currentTarget)

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formdata.get("email"),
      password: formdata.get("password"),
    });

    if (error) {
      setIsSuccess(false);
      setMessage(error);
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => setMessage(""), 1000);
      }, 2000);

      setLoading(false);

      return;
    }

    if (data.user) {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (profileError) {
        console.error("Error fetching profile:", profileError.message);
      } else {
        flushSync(() => {
          setUser({
            ...profileData,
            isAuthenticated: true,
          });
        });

        router.invalidate();

        navigate({ to: redirect || "/app/dashboard" });

        setIsSuccess(true);
        setMessage("Login Successful!");
        setIsVisible(true);

        setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => setMessage(""), 1000);
        }, 2000);
      }
    }
    setLoading(false);
  };
  return (
    <>
      <title> Login | Brillo </title>
      <div className="h-screen  flex flex-col  lg:flex-row gap-2">
        <div className="grow bg-[url(/assets/img/jive-shapes-top.svg)]  lg:bg-[url(/assets/img/jive-shapes-left.svg)] flex min-h-0 lg:h-screen bg-no-repeat bg-cover bg-bottom lg:bg-top-right w-full"></div>
        <div className="grow md:py-8 w-full md:mt-0 sm:max-w-md xl:p-0 lg:w-auto px-6 mx-auto flex flex-col justify-center flex-none gap-6 items-center lg:min-w-125 max-w-160 ">
          <Link to="/" className="mb-4">
            <img src="/assets/img/brillo.svg" alt="logo.svg" />
          </Link>
          <h1 className="pt-1.5 text-2xl text-center font-bold leading-tight tracking-tight text-gray-900 ">
            Welcome back
          </h1>
          <form
            onSubmit={handleLogin}
            className="flex flex-col w-full gap-6 sm:max-w-md"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-medium text-gray-900">
                Email address
              </label>
              <input
                type="text"
                placeholder="Email address"
                id="email"
                name="email"
                className="bg-gray-50 border border-gray-200 text-gray-900 text-base md:text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-4 py-3  placeholder:text-gray-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-medium text-gray-900">
                Password
              </label>
              <input
                type="text"
                placeholder="Password"
                id="password"
                name="password"
                className="bg-gray-50 border border-gray-200 text-gray-900 text-base md:text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-4 py-3  placeholder:text-gray-400"
              />
            </div>
            <button disabled={loading} className="disabled:cursor-not-allowed w-full text-white bg-dark hover:bg-jive-blue focus:ring-4 focus:outline-none font-medium rounded-full text-lg px-5 py-3 text-center  transition hover:bg-teal">
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
          <div className="mr-auto">
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginError}
            />
          </div>
          <p className="text-mediumgrey font-light">
            New here?
            <Link
              to="/app/signup"
              className="inline-block ml-1 font-normal text-dark hover:text-[#ffc7c7]"
            >
              Sign up
            </Link>
          </p>
          <p class="font-normal text-gray-700 text-center mb-2">
            ©2025
            <Link to="/" class="inline-block ml-1 text-700">
              Brillo
            </Link>
          </p>
        </div>
        <div className="grow bg-[url(/assets/img/jive-shapes-bottom.svg)] lg:bg-[url(/assets/img/jive-shapes-right.svg)] flex min-h-0 lg:h-screen bg-no-repeat bg-cover bg-top lg:bg-top-left w-full"></div>
      </div>
    </>
  );
}
