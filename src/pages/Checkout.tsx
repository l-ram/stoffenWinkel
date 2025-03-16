import CheckoutForm from "../components/CheckoutForm";
import ReactGA from "react-ga4";
import { useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Stripe
const stripePromise = loadStripe(import.meta.env.STRIPE_PUBLIC_KEY);

console.log("key", stripePromise);

const Checkout = () => {
  useEffect(() => {
    ReactGA.set({ page: window.location.href + window.location.search });
    console.log("ga ran");
  }, [window.location.href]);

  return (
    <div>
      Checkout page!
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: 50,
          currency: "euro",
        }}
      >
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Checkout;
