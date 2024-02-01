import { createClient } from "@supabase/supabase-js";

// APP SETTINGS

export const supabase = createClient(
  import.meta.env.VITE_APP_SUPABASE_URL,
  import.meta.env.VITE_APP_SUPABASE_ANON_KEY
);

console.log(supabase);

// AUTHENTICATION

// Register with email

// Login with google

export const googleLogin = () => {
  console.log("button clicked");
  try {
    supabase.auth.signInWithOAuth({
      provider: "google",
    });
    console.log("login worked");
  } catch (error) {
    console.error("login error:", error);
  }
};

// Register with email
