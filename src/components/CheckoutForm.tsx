import { useCartItems } from "../db/db_apis";
import "../components/checkoutform.css";
import { FormEvent, useState } from "react";
import { CheckoutData } from "../types/types";
import { createOrder } from "../db/db_apis";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "react-query";

const CheckoutForm = () => {
  const queryClient = useQueryClient();
  const { data: basketItems } = useCartItems();
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    total: 0,
    paymentType: "Card",
  });
  let total: number = 0;

  basketItems?.forEach((t) => {
    total += t.price * t.quantity;
  });

  const mutation = useMutation({
    mutationFn: createOrder,
    onMutate: () => {},
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["basket"],
      });
    },
  });

  const handleCheckoutFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    mutation.mutate(checkoutData);
  };

  const handleCheckoutChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCheckoutData((prevCheckoutData) => {
      return {
        ...prevCheckoutData,
        total: total,
        [event.target.name]: event.target.value,
      };
    });
  };

  return (
    <div className="checkout_form">
      <div className="basket_summary">
        <h3>Order summary</h3>
        <ul>
          {basketItems?.map((b) => (
            <li key={b.product_id}>
              <div className="infoWrap">
                <div className="cartSection">
                  <img src={b.image_url} alt="" className="itemImg" />
                  <p className="itemNumber">{b.category_id}</p>
                  <h3>
                    {b.quantity.toString()} x {b.name}
                  </h3>
                </div>

                <div className="prodTotal cartSection">
                  <p>{`€${(b.price * b.quantity).toFixed(2)}`}</p>
                </div>
                <div className="cartSection removeWrap"></div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="checkout_container">
        <div className="checkout-container">
          <h3 className="heading-3">Credit card checkout</h3>
          <span>Total: €{total.toFixed(2)}</span>
          <div>
            <form onSubmit={handleCheckoutFormSubmit}>
              <label>
                {" "}
                Cardholders name
                <input
                  className="input"
                  name="cardholdersName"
                  type="text"
                  required={true}
                />
              </label>
              <label>
                {" "}
                Payment type
                <select
                  name="paymentType"
                  required={true}
                  onChange={handleCheckoutChange}
                >
                  <option>Card</option>
                  <option>Paypal</option>
                </select>
              </label>
              <label>
                {" "}
                Card number
                <input
                  className="input input-field"
                  name="cardNumber"
                  type="number"
                  required={true}
                />
              </label>
              <label>
                {" "}
                Code
                <input
                  className="input input-field"
                  name="code"
                  type="number"
                  required={true}
                />
              </label>
              <label>
                {" "}
                Expiry date
                <input
                  className="input input-field"
                  name="expiry"
                  type="date"
                  required={true}
                />
              </label>
              <button className="checkout-btn" type="submit">
                {"Place order"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
