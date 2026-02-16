import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AuthProvider } from "../../contexts/AuthContext";
import { useAuth } from "../../hooks/useAuth";
import { Check, XCircle } from "lucide-react";

export const Route = createFileRoute("/app")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthProvider>
      <PopUp />
      <Outlet></Outlet>
    </AuthProvider>
  );
}

function PopUp() {

  const { message, isVisible, isSuccess, setMessage, setIsVisible } = useAuth();
  console.log(message, isSuccess);
  return (
    <div
      className={` ${isVisible ? ` scale-100 ${isSuccess ? "text-green-900 border-neutral-800" : "text-neutral-900 border-red-800"} translate-x-0 opacity-100 shadow-2xl   duration-300` : "scale-0 opacity-0 translate-x-100"} fixed z-100 top-10 right-20 flex gap-1.5 items-center bg-white border-t-0 outline font-medium rounded-xl transform  p-4  transition  `}
    >
      {message}
      <button
        onClick={() => {
          setIsVisible(false);
          setMessage("");
        }}
        className={`${isVisible ? "" : "scale-0"} absolute scale-100  transform transition duration-75 -top-3 -right-3 bg-inherit rounded-full`}
      >
        {isSuccess ? (
          <Check
            className="border-2 border-green-500 rounded-2xl p-0.5"
            size={25}
          />
        ) : (
          <XCircle size={25} />
        )}
      </button>
    </div>
  );
}
