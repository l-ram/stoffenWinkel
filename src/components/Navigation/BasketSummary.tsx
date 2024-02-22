import { ShoppingCart } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { useEffect, useState } from "react";
import { useBasket } from "../../context/BasketContext";

const BasketSummary = () => {
  const basket = useBasket();
  const [cartCount, setCartCount] = useState(0);
  const muiPink = "#ff7ed8";
  const muiGrey = "#979696";
  useEffect(() => {
    const newCartCount = basket ? basket.length : 0;
    setCartCount(newCartCount);
  }, [basket]);

  return (
    <div>
      <Badge color="error" badgeContent={cartCount}>
        <ShoppingCart
          sx={{
            color: "black",
          }}
        />{" "}
      </Badge>
    </div>
  );
};

export default BasketSummary;
