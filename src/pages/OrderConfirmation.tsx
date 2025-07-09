import { useEffect, useState } from "react";
import { useSession } from "../context/SessionContext";
import { useGetOrders } from "../db/db_apis";
import { useNavigate } from "react-router-dom";
import ReactGA from "react-ga4";

const OrderConfirmation = () => {
  useEffect(() => {
    ReactGA.set({ page: window.location.href + window.location.search });
    console.log("ga ran");
  }, [window.location.href]);
  const session = useSession();
  const { data } = useGetOrders(session?.user.id as string);
  let [countDown, setCountDown] = useState(10);

  const currentOrder = data?.data?.slice(-1);
  const navigate = useNavigate();

  useEffect(() => {
    countDown > 0 && setTimeout(() => setCountDown(countDown - 1), 1000);
    if (countDown === 0) {
      navigate("/");
    }
  }, [countDown]);

  return (
    <div>
      <h1>OrderConfirmation</h1>
      <h3>Your order is confirmed!</h3>

      <div className="orderTable">
        {currentOrder?.map((o) => (
          <div className="orderTable_order" key={o.order_id}>
            <h3>{o.order_date}</h3>
            <h4>{o.order_id}</h4>
            <h5>{o.order_total}</h5>
          </div>
        ))}
      </div>

      <div>You will be redirected to the homepage in: {countDown}</div>
    </div>
  );
};

export default OrderConfirmation;
