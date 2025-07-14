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

const CheckoutForm = ({ checkoutData }: ICheckoutForm) => {

  const queryClient = useQueryClient();
  const { data: basketItems, isLoading, error } = useCartItems(checkoutData.user);
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: createOrder,
    onMutate: () => { },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["basket"],
      });
    },
  });

  const postPayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: globalThis.location.origin },
      redirect: "if_required",
    });

    if (stripeError) {
      setMessage(stripeError.message || "Payment failed");
      setLoading(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      const needsUpdate = await checkUser(checkoutData);
      if (needsUpdate) {
        alert("Please update your account details before making an order");
        setLoading(false);
        return;
      }

      mutation.mutate(checkoutData, {
        onSuccess: () => {
          navigate("/orderConfirmation", {
            state: {
              orderId: paymentIntent.id, // Optional: pass ID to page
            },
          });
        },
        onError: () => {
          setMessage("Order creation failed after payment succeeded.");
        },
        onSettled: () => {
          setLoading(false);
        },
      });
    } else {
      setMessage("Payment not completed");
      setLoading(false);
    }
  };

  return (
    <div className="checkout_form">
      <h1>Total: €{checkoutData.total.toFixed(2)}</h1>
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
    </div>
  );
};

export default CheckoutForm;
