import { useSession } from "../context/SessionContext";
import { Database } from "../types/db";
import { supabase } from "../config/supabase.config";
import "../pages/basket.scss";
import { useCartItems } from "../db/db_apis";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Delete,
  Remove,
  Add,
  Shop,
  Shop2,
  ShoppingCart,
} from "@mui/icons-material";
import { useState } from "react";
import { Button } from "@mui/material";

const Basket = () => {
  const session = useSession();
  const [basketError, setBasketError] = useState<string>();

  const {
    data: basketItems,
    isError,
    error,
    isLoading,
  } = useCartItems(session?.user.id as string);

  let basketTotal: number = 0;
  const navigate = useNavigate();

  basketItems?.forEach((x) => {
    basketTotal += x.price * x.quantity;
  });

  const handleRemoveItem = async (productId: number) => {
    const { error } = await supabase
      .from("basket")
      .delete()
      .eq("product_id", productId);
    if (error) {
      setBasketError(error.message);
    } else {
      const { data } = await supabase
        .from("basket")
        .select("*")
        .eq("user_id", session?.user.id as string)
        .returns<Database["public"]["Tables"]["basket"]["Row"][]>();
    }
  };

  const handleIncrement = async (productId: number) => {
    const { error } = await supabase.rpc("increment", {
      x: 1,
      id: productId,
    });

    if (error) {
      setBasketError(error.message);
    } else {
      const { data } = await supabase
        .from("basket")
        .select("*")
        .eq("user_id", session?.user.id as string)
        .returns<Database["public"]["Tables"]["basket"]["Row"][]>();
    }
  };

  const handleDecrement = async (productId: number) => {
    const { error } = await supabase.rpc("decrement", {
      x: 1,
      id: productId,
    });

    if (error) {
      setBasketError(error.message);
    } else {
      const { data } = await supabase
        .from("basket")
        .select("*")
        .eq("user_id", session?.user.id as string)
        .returns<Database["public"]["Tables"]["basket"]["Row"][]>();
    }
  };

  const handleGoToCheckout = () => {
    navigate("/checkout");
  };

  let shipping: number = 5;

  if (basketItems) {
    basketItems?.length < 1 ? (shipping = 0) : shipping;
  }

  return (
    <div className="wrap cf">
      <div className="heading cf">
        <h1>My basket</h1>
      </div>

      {isLoading && <CircularProgress />}
      {isError && <p>{error.message}</p>}
      {basketError && <h3>{basketError}</h3>}

      {basketItems && basketItems.length < 1 && <p>Basket is empty</p>}

      <div className="cart">
        <ul className="cartWrap">
          {basketItems?.map((b) => (
            <li className="items odd" key={b.product_id}>
              <div className="infoWrap">
                <div className="cartSection">
                  <img src={b.image_url} alt="" className="itemImg" />
                  <p className="itemNumber">{b.category_id}</p>
                  <h3>{b.name}</h3>

                  <p>
                    {" "}
                    <input
                      type="text"
                      className="qty"
                      placeholder={b.quantity.toString()}
                    />{" "}
                    x €{b.price}
                  </p>
                </div>

                <div className="prodTotal cartSection">
                  <p>{`€${(b.price * b.quantity).toFixed(2)}`}</p>
                </div>
                <div className="cartSection removeWrap">
                  <Add
                    className="increment"
                    onClick={() => handleIncrement(b.product_id)}
                  />
                  {b.quantity >= 2 ? (
                    <Remove
                      className="decrement"
                      onClick={() => handleDecrement(b.product_id)}
                    />
                  ) : null}
                  <Delete
                    className="remove"
                    onClick={() => handleRemoveItem(b.product_id)}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="promoCode">
        <label form="promo">Have A Promo Code?</label>
        <input type="text" name="promo" placeholder="Enter Code" />
        <a href="#" className="btn"></a>
      </div>

      <div className="subtotal cf">
        <ul>
          <li className="totalRow">
            <span className="label">Subtotal</span>
            <span className="value">€{basketTotal.toFixed(2)}</span>
          </li>

          <li className="totalRow">
            <span className="label">Shipping</span>
            <span className="value">{`€${shipping}`}</span>
          </li>

          <li className="totalRow final">
            <span className="label">Total</span>
            <span className="value">
              €{(basketTotal + shipping).toFixed(2)}
            </span>
          </li>

          <Button
            disabled={(basketItems?.length as number) > 0 ? false : true}
            onClick={handleGoToCheckout}
            variant="contained"
            color="success"
            startIcon={<ShoppingCart />}
          >
            Checkout
          </Button>
        </ul>
      </div>
    </div>
  );
};

export default Basket;
