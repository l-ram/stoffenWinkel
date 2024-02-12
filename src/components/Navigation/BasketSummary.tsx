import { useState } from "react";
import { ShoppingCart } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { supabase } from "../../config/supabase.config";
import { Database } from "../../types/db";
import { useSession } from "../../context/SessionContext";

const BasketSummary = () => {
  const session = useSession();
  const [cartCount, setCartCount] = useState<number>(1);

  const getCartCount = async (user_id: string) => {
    const { data, error } = await supabase
      .from("basket")
      .select("*")
      .eq("user_id", user_id)
      .returns<Database["public"]["Tables"]["basket"]["Row"][]>();
    setCartCount(data?.length as number);
  };
  getCartCount(session?.user.id as string);
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
