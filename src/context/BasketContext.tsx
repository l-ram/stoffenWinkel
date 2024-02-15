import { createContext, useContext, type ReactNode, useEffect } from "react";
import { supabase } from "../config/supabase.config";
import { Database } from "../types/db";
import { useSession } from "./SessionContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { subscribe } from "diagnostics_channel";

const BasketContext = createContext<
  Database["public"]["Tables"]["basket"]["Row"][] | undefined
>(undefined);

type BasketProviderProps = { children: ReactNode };

export const BasketProvider = (props: BasketProviderProps) => {
  const session = useSession();
  const queryClient = useQueryClient();

  const getCartItems = () => {
    return useQuery({
      queryKey: ["basket"],
      queryFn: async () => {
        const { data, error } = await supabase
          .from("basket")
          .select("*")
          .eq("user_id", session?.user.id as string);
        if (error) {
          alert(error.message);
        }
        return data as unknown as Database["public"]["Tables"]["basket"]["Row"][];
      },
      enabled: Boolean(session),
    });
  };

  const { data: basket } = getCartItems();

  useEffect(() => {
    const subscription = supabase
      .channel("table_db_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "basket" },
        () => {
          queryClient.invalidateQueries({ queryKey: ["basket"] });
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [queryClient, session]);

  return <BasketContext.Provider value={basket} {...props} />;
};

export const useBasket = () => {
  return useContext(BasketContext);
};
