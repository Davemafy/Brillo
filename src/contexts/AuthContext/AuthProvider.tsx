import { useMemo, useState, type PropsWithChildren } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const providerValue = useMemo(
    () => ({
      message,
      loading,
      isSuccess,
      isVisible,
      setMessage,
      setIsSuccess,
      setLoading,
      setIsVisible,
    }),
    [],
  );

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};
