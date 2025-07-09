import { useCartItems } from "../db/db_apis.tsx";
import "../components/checkoutform.scss";
import { FormEvent, useState } from "react";
import { CheckoutData } from "../types/types.ts";
import { checkUser, createOrder } from "../db/db_apis.tsx";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material/";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

interface ICheckoutForm {
  checkoutData: CheckoutData
}

const CheckoutForm = ({ checkoutData }): ICheckoutForm => {

  

  const queryClient = useQueryClient();
  const { data: basketItems, isLoading, error } = useCartItems(userId);
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const postPayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin },
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message || "Payment failed");
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setMessage("Payment successful");

      console.log(setMessage)
    }
    setLoading(false);
  };

  const mutation = useMutation({
    mutationFn: createOrder,
    onMutate: () => { },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["basket"],
      });
    },
  });

  console.log("mutation:", mutation);

  const handleCheckoutFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log(checkoutData);
    const correctUserData = await checkUser(checkoutData);
    correctUserData
      ? alert("Please update your account details before making an order")
      : (await mutation.mutate(checkoutData), navigate("/orderConfirmation"));
  };

  const handleCheckoutChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCheckoutData((prevCheckoutData) => {
      const updatedTotal = basketItems?.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);

      return {
        ...prevCheckoutData,
        total: updatedTotal || 0,
        [event.target.name]: event.target.value,
      };
    });
  };

  return (
    <div className="checkout_form">
      <form onSubmit={postPayment}>
        <PaymentElement />
        <button type="submit" disabled={!stripe || loading}>
          {loading ? "Processing..." : "Pay now"}
        </button>
        {message && <div></div>}
      </form>

      <div className="basketSummary">
        {isLoading ? <CircularProgress /> : null}
        {error ? <p>{error.message}</p> : null}
        <h3>Order summary</h3>
        <ul>
          {basketItems?.map((b) => (
            <li key={b.product_id}>
              <div className="cartSection">
                <img
                  height="100"
                  src={b.image_url}
                  alt=""
                  className="itemImg"
                />
                <p className="itemNumber">{b.category_id}</p>
                <h3 className="cartSection__quantity">
                  {b.quantity.toString()} x {b.name}
                </h3>

                <div className="cartSection__cost">
                  <p>€ {(b.price * b.quantity).toFixed(2)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="checkoutContainer">
        <div className="checkout-container">
          <h3 className="heading-3">Credit card checkout</h3>
          <h1>Total: €{totalPrice?.toFixed(2)}</h1>
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
              <label> Payment type</label>
              <select
                name="paymentType"
                required={true}
                onChange={handleCheckoutChange}
              >
                <option>Card</option>
                <option>Paypal</option>
              </select>
              <br></br>

              <label> Card number </label>
              <input
                className="input input-field"
                name="cardNumber"
                type="number"
                required={true}
              />

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
              <br></br>
              <button className="checkout-btn" type="submit">
                {"Place order"}
              </button>

              {mutation.isPending ? (
                <div>
                  <p>Processing order</p>
                  <CircularProgress />
                </div>
              ) : null}
              {mutation.isError ? (
                <div>Sorry, something went wrong, try again!</div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
