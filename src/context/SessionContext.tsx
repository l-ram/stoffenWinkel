import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "../config/supabase.config";
import { Session } from "@supabase/supabase-js";

const SessionContext = createContext<Session | null | undefined>(null);

type SessionProviderProps = { children: ReactNode };

export const SessionProvider = (props: SessionProviderProps) => {
  const [session, setSession] = useState<Session | null>();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event);
      setSession(session);
      sessionStorage.setItem("user_token", JSON.stringify(session));
      console.log("session storage updated");
      if (session === null) {
        sessionStorage.removeItem("user_token");
        console.log("session storage removed");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return <SessionContext.Provider value={session} {...props} />;
};

export const useSession = () => {
  return useContext(SessionContext);
};
