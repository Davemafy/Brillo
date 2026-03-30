import type { User } from "@supabase/supabase-js";
import { createContext, type Dispatch, type SetStateAction } from "react";

interface UserContextType {
  user: AppUser | null;
  setUser: Dispatch<SetStateAction<AppUser | null>>;
  logOut:  () => Promise<void>;
  loading: boolean;
}

export const UserContext = createContext<UserContextType | null>(null);

