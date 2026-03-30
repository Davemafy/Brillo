import type { User } from "@supabase/supabase-js";

export const normalizeUser = (user: User) => {
  return {
    // Google uses 'full_name' or 'name', Email uses what you saved
    name:
      user?.user_metadata?.full_name || user?.user_metadata?.name || "New User",

    // Google provides this automatically
    avatar_url: user?.user_metadata?.avatar_url || "",

    email: user?.email,
    uid: user?.id,
  };
};

