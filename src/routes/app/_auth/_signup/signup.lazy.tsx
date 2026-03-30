import {
  createLazyFileRoute,
  Link,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { supabase } from "../../../../superbaseClient";
import { useUser } from "../../../../hooks/useUser";
import { flushSync } from "react-dom";
import { useEffect, useState, type SubmitEventHandler } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import type { Session } from "@supabase/supabase-js";
import { mapUser } from "$/utils/mapUser";

export const Route = createLazyFileRoute("/app/_auth/_signup/signup")({
  component: Signup,
});

let timer1: string | number | NodeJS.Timeout | undefined = undefined;
let timer2: string | number | NodeJS.Timeout | undefined = undefined;

function Signup() {
  const [session, setSession] = useState<Session | null>(null);
  const {
    loading,
    setLoading,
    setIsSuccess,
    message,
    setMessage,
    setIsVisible,
  } = useAuth();

  const { setUser } = useUser();

  const navigate = useNavigate();
  const router = useRouter();
  const search = Route.useSearch(); // Captured from the initial redirect

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLoginSuccess = async (response: CredentialResponse) => {
    const idToken = response.credential;
    if (!idToken) {
      console.log("An Error Occured From Google Oauth");
      return;
    }

    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: "google",
      token: idToken,
    });

    if (error) {
      console.error("Supabase Auth Error:", error.message);
      setIsSuccess(false);
      setMessage("Google login failed on server");
      setIsVisible(true);
      return;
    }

    if (data.user) {
      setUser((user) => mapUser(data.user));

      router.invalidate();

      const destination = search.redirect || "/app/dashboard";

      navigate({ to: destination });

      setIsSuccess(true);
      setMessage("Sigup Successful!");
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => setMessage(""), 1000);
      }, 2000);
    }
  };

  const handleLoginError = () => {
    setIsSuccess(false);
    setIsVisible(true);
    setMessage("An Error Occured From Google Oauth");

    setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => setMessage(""), 500);
    }, 1000);

    setLoading(false);
  };

  const handleSignup: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formdata = new FormData(e.currentTarget);

    const userEmail = formdata.get("email")?.toString();
    const userName = formdata.get("name")?.toString();
    const userPassword = formdata.get("password")?.toString();

    if (!(userEmail && userName && userPassword)) {
      setIsSuccess(false);
      setMessage("Email or Password not found");
      setIsVisible(true);
      setLoading(false);
      return;
    }
    // 1. Sign up user with email & password
    const { data, error } = await supabase.auth.signUp({
      email: userEmail,
      password: userPassword,
      options: {
        data: {
          name: userName,
          given_name: userName.split(" ")[0],
        },
      },
    });

    if (error) {
      if (timer1 || timer2) {
        clearTimeout(timer1);
        clearTimeout(timer2);
      }

      setIsSuccess(false);
      setIsVisible(true);
      setMessage(error.message);
      timer1 = setTimeout(() => {
        setIsVisible(false);
      }, 2000);
      timer2 = setTimeout(() => {
        setMessage("");
      }, 3000);

      setLoading(false);
      return;
    }

    if (data.user) {
      setUser((user) => mapUser(data.user));

      router.invalidate();
      navigate({ to: search.redirect || "/app/dashboard" });

      setIsSuccess(true);
      setIsVisible(true);
      setMessage("Sigup Successful!");

      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => setMessage(""), 1000);
      }, 2000);
    }

    setLoading(false);
  };

  return (
    <>
      <title> Signup | Brillo </title>
      <div className="h-screen  flex flex-col  lg:flex-row gap-2">
        <div className="grow bg-[url(/assets/img/jive-shapes-top.svg)] lg:bg-[url(/assets/img/jive-shapes-left.svg)] flex min-h-0 lg:h-screen bg-no-repeat bg-cover bg-bottom lg:bg-top w-full"></div>
        <div className="p-6 md:py-8 w-full lg:w-auto px-6 mx-auto flex flex-col flex-none gap-4 items-center lg:min-w-125 max-w-160 md:mt-0 ">
          <Link to="/" className="mb-2">
            <img src="/assets/img/brillo.svg" alt="logo.svg" />
          </Link>
          <h1 className=" text-2xl text-center font-bold leading-tight tracking-tight text-gray-900 ">
            Create your account
          </h1>
          <form onSubmit={handleSignup} className="flex flex-col w-full gap-4">
            <div className="flex flex-col  gap-2">
              <label htmlFor="first-name" className="font-medium text-gray-900">
                Name
              </label>
              <input
                type="text"
                placeholder="Name"
                autoFocus
                minLength={3}
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
                autoComplete="username"
                required
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
                autoComplete="new-password"
                minLength={6}
                required
                className="bg-gray-50 border border-gray-200 text-gray-900 text-base md:text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-4 py-3  placeholder:text-gray-400"
              />
            </div>
            <div className="flex gap-3 items-center">
              <input
                type="checkbox"
                name="accept-terms"
                required
                className="w-5 h-5 border-gray-200  rounded checked:border-0  focus:ring-2 focus:ring-[#b0b0b0] "
              />
              <label
                htmlFor="accept-terms"
                className="font-light text-sm md:text-base text-gray-500"
              >
                I accept the
                <a
                  href="./"
                  className="font-medium inline-block ml-1 text-mediumgrey hover:text-golden focus:text-golden"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
            <button
              disabled={loading}
              className={`disabled:cursor-not-allowed w-full text-white bg-dark  focus:bg-turq focus:ring-4 focus:ring-[] font-medium rounded-full text-lg px-5 py-3 text-center  transition hover:bg-turq`}
            >
              {!loading ? "Create an account" : "Creating your account..."}
            </button>
          </form>
          <div className="mr-auto">
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginError}
            />
          </div>
          <p className="text-[#6b7280] font-light">
            Already have an account?
            <Link
              to="/app/login"
              className="font-medium text-dark hover:text-[#8f81ff]"
            >
              Login
            </Link>
          </p>
        </div>
        <div className="grow bg-[url(/assets/img/jive-shapes-bottom.svg)] lg:bg-[url(/assets/img/jive-shapes-right.svg)] bg-shapes-top flex min-h-0 lg:h-screen bg-no-repeat bg-cover bg:bottom lg:bg-top w-full"></div>
      </div>
    </>
  );
}
