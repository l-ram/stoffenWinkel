import { ShoppingCart } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { useEffect, useState } from "react";
import { supabase } from "../../config/supabase.config";
import { useBasket } from "../../context/BasketContext";

const BasketSummary = () => {
  const basket = useBasket();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = basket ? basket.length : 0;
    setCartCount(newCartCount);
  }, [basket]);

  return (
    <div>
      <Badge color="error" badgeContent={cartCount}>
        <ShoppingCart />{" "}
      </Badge>
    </div>
  );
};

export default BasketSummary;
