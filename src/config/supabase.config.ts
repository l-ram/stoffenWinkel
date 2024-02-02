import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

// APP SETTINGS

export const supabase = createClient(
  import.meta.env.VITE_APP_SUPABASE_URL,
  import.meta.env.VITE_APP_SUPABASE_ANON_KEY
);

// AUTHENTICATION

// Register with email

// Login in with email

// Register with google

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

// Login with google
