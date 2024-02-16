import { useSession } from "../context/SessionContext";
import { Database } from "../types/db";
import { useEffect, useState } from "react";
import { supabase } from "../config/supabase.config";
import "../pages/basket.scss";
import { useCartItems } from "../db/db_apis";
import { useNavigate } from "react-router-dom";

const Basket = () => {
  const session = useSession();
  const {
    data: basketItems,
    isError,
    error,
    isLoading,
  } = useCartItems(session?.user.id as string);

  const [basket, setBasket] = useState<
    Database["public"]["Tables"]["basket"]["Row"][] | null
  >();
  let basketTotal: number = 0;
  const navigate = useNavigate();

  useEffect(() => {
    setBasket(basketItems);
  }, []);

  basket?.forEach((x) => {
    basketTotal += x.price * x.quantity;
  });

  const handleRemoveItem = async (productId: number) => {
    const { error } = await supabase
      .from("basket")
      .delete()
      .eq("product_id", productId);
    if (error) {
      alert(error.message);
    } else {
      console.log("Item removed!");
      const { data } = await supabase
        .from("basket")
        .select("*")
        .eq("user_id", session?.user.id as string)
        .returns<Database["public"]["Tables"]["basket"]["Row"][]>();
      console.log("where is my basket?:", data);
      setBasket(data);
    }
  };

  const handleIncrement = async (productId: number) => {
    const { error } = await supabase.rpc("increment", {
      x: 1,
      id: productId,
    });

    if (error) {
      alert(error.message);
    } else {
      const { data } = await supabase
        .from("basket")
        .select("*")
        .eq("user_id", session?.user.id as string)
        .returns<Database["public"]["Tables"]["basket"]["Row"][]>();
      setBasket(data);
    }
  };

  const handleDecrement = async (productId: number) => {
    const { error } = await supabase.rpc("decrement", {
      x: 1,
      id: productId,
    });

    if (error) {
      alert(error.message);
    } else {
      const { data } = await supabase
        .from("basket")
        .select("*")
        .eq("user_id", session?.user.id as string)
        .returns<Database["public"]["Tables"]["basket"]["Row"][]>();
      setBasket(data);
    }
  };

  const handleGoToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="wrap cf">
      {basketItems?.length < 1 && <p>Basket is empty</p>}
      <div className="heading cf">
        <h1>My basket</h1>
        <a href="#" className="continue">
          Continue Shopping
        </a>
      </div>

      <div className="cart">
        <ul className="cartWrap">
          {basket?.map((b) => (
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
                  <button
                    className="increment"
                    onClick={() => handleIncrement(b.product_id)}
                  >
                    <h1>+</h1>
                  </button>
                  {b.quantity >= 2 ? (
                    <button
                      className="increment"
                      onClick={() => handleDecrement(b.product_id)}
                    >
                      <h1>-</h1>
                    </button>
                  ) : null}
                  <a
                    href="#"
                    className="remove"
                    onClick={() => handleRemoveItem(b.product_id)}
                  >
                    x
                  </a>
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
            <span className="value">€5.00</span>
          </li>

          <li className="totalRow final">
            <span className="label">Total</span>
            <span className="value">€{(basketTotal + 5).toFixed(2)}</span>
          </li>

          <button
            disabled={(basket?.length as number) > 1 ? false : true}
            className="btn"
            onClick={handleGoToCheckout}
          >
            Checkout
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Basket;
