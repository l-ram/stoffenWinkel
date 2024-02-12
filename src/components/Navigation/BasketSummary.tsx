import { ShoppingCart } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { useSession } from "../../context/SessionContext";
import { supabase } from "../../config/supabase.config";
import { Database } from "../../types/db";

const BasketSummary = () => {
  const session = useSession();
  const [cartCount, setCartCount] = useState(0);

  useCallback(() => {
    const getCartCount = async (user_id: string) => {
      const { data, error } = await supabase
        .from("basket")
        .select("*")
        .eq("user_id", user_id)
        .returns<Database["public"]["Tables"]["basket"]["Row"][]>();
      if (error) {
        alert(error.message);
      } else {
        setCartCount(data?.length as number);
      }
    };
    getCartCount(session?.user.id as string);
  }, []);

  console.log(cartCount);

  return (
    <div>
      <Badge color="error" badgeContent={cartCount}>
        <ShoppingCart />{" "}
      </Badge>
    </div>
  );
};

export default BasketSummary;
