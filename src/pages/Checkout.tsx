import CheckoutForm from "../components/CheckoutForm";
import ReactGA from "react-ga4";
import { useEffect } from "react";
const Checkout = () => {
  useEffect(() => {
    ReactGA.set({ page: window.location.href + window.location.search });
    console.log("ga ran");
  }, [window.location.href]);

  return (
    <div>
      Checkout page!
      <CheckoutForm />
    </div>
  );
};

export default Checkout;
