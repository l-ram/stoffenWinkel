import { useSession } from "../context/SessionContext";
import { useGetOrders } from "../db/db_apis";

const OrderConfirmation = () => {
  const session = useSession();

  useGetOrders(session?.user.id as string);

  return (
    <div>
      <h1>OrderConfirmation</h1>
      <h3>Your order is confirmed!</h3>
    </div>
  );
};

export default OrderConfirmation;
