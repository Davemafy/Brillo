import { useEffect, useMemo } from "react";
import { UserContext } from "./UserContext";
import { googleLogout } from "@react-oauth/google";
import { useState } from "react";
import { supabase } from "../../superbaseClient";

const logOut = async () => {
  await supabase.auth.signOut(); // Clean up Supabase session
  googleLogout(); // Clean up Google client
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ isAuthenticated: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setUser({ ...session.user, isAuthenticated: true });
      }
      setLoading(false);
    };

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser({ ...session.user, isAuthenticated: true });
      } else {
        setUser((user) => ({ isAuthenticated: false }));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const providerValue = { user, setUser, logOut, loading };

  return (
    <UserContext.Provider value={providerValue}>
      {!loading && children}
    </UserContext.Provider>
  );
};
