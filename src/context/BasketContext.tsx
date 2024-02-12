import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "../config/supabase.config";
import { Database } from "../types/db";
import { useSession } from "./SessionContext";

const BasketContext = createContext<number>(0);

type BasketProviderProps = { children: ReactNode };

export const BasketProvider = (props: BasketProviderProps) => {
  const session = useSession();
  const [basket, setBasket] = useState<number>(0);

  useEffect(() => {
    const getCartCount = async (user_id: string) => {
      const { data, error } = await supabase
        .from("basket")
        .select("*")
        .eq("user_id", user_id)
        .returns<Database["public"]["Tables"]["basket"]["Row"][]>();
      if (error) {
        alert(error.message);
      } else {
        setBasket(data?.length as number);
      }
    };
    getCartCount(session?.user.id as string);
  }, []);

  return <BasketContext.Provider value={basket} {...props} />;
};

export const useBasket = () => {
  return useContext(BasketContext);
};
