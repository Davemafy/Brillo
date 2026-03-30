import { useEffect, useMemo, type PropsWithChildren } from "react";
import { UserContext } from "./UserContext";
import { googleLogout } from "@react-oauth/google";
import { useState } from "react";
import { supabase } from "../../superbaseClient";
import type { User } from "@supabase/supabase-js";
import { mapUser } from "$/utils/mapUser";

const logOut = async () => {
  await supabase.auth.signOut(); // Clean up Supabase session
  googleLogout(); // Clean up Google client
};

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setUser((user) => mapUser(session.user));
      }
      setLoading(false);
    };

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser((user) => mapUser(session.user));
      } else {
        setUser((user) => null);
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
