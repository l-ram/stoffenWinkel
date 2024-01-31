import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL as string,
  process.env.REACT_APP_SUPABASE_ANON_KEY as string
);

// AUTHENTICATION

// Login with google

export const googleLogin = () => {
  supabase.auth.signInWithOAuth({
    provider: "google",
  });
};

// Register with email
