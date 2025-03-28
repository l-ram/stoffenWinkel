import CheckoutForm from "../components/CheckoutForm";
import ReactGA from "react-ga4";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

console.log("key", stripePromise);

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    fetch(
      "https://igfmaugvvetikklloxpe.supabase.co/functions/v1/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_APP_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ amount: 1000, currency: "eur" }),
      }
    )
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => console.log("Error fetching clientSecret:", error));
  }, []);

  useEffect(() => {
    ReactGA.set({ page: window.location.href + window.location.search });
    console.log("ga ran");
  }, [window.location.href]);

  if (!clientSecret) {
    return <p>Loading payment details...</p>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
