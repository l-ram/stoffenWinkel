import CheckoutForm from "../components/CheckoutForm.tsx";
import ReactGA from "react-ga4";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutData } from "../types/types.ts";
import { useCartItems } from "../db/db_apis.tsx";
import { useSession } from "../context/SessionContext.tsx";

// Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

console.log("key", stripePromise);

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState<string | undefined>(
    undefined
  );

  const session = useSession();
  let userId: string = "";

  if (session) {
    userId = session.user.id;
  }

  const { data: basketItems, isLoading, error } = useCartItems(userId);

  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    total: 0,
    paymentType: "Card",
    user: "",
  });

  const totalPrice =
    basketItems?.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

  const formattedTotal = Number((totalPrice ?? 0).toFixed(2));

  console.log(formattedTotal)


  useEffect(() => {
    setCheckoutData({
      total: Math.round(formattedTotal),
      paymentType: "Card",
      user: userId,
    });
  }, [session]);

  console.log(checkoutData);

  useEffect(() => {
    fetch(
      "https://igfmaugvvetikklloxpe.supabase.co/functions/v1/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_APP_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ amount: checkoutData.total, currency: "eur" }),
      }
    )
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => console.log("Error fetching clientSecret:", error));
    console.log(checkoutData.total);
  }, []);

  const stuff = [];

  fetch("url").then(res => res.json).then(data => stuff.push(data));

  useEffect(() => {
    ReactGA.set({ page: window.location.href + window.location.search });
    console.log("ga ran");
  }, [window.location.href]);

  if (!clientSecret) {
    return <p>Loading payment details...</p>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm checkoutData={checkoutData} />
    </Elements>
  );
};

export default Checkout;
