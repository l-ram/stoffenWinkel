import { useSession } from "../context/SessionContext";
import { useGetOrders } from "../db/db_apis";
import { CircularProgress } from "@mui/material/";

const Orders = () => {
  const session = useSession();
  const { data, error, isLoading, isError } = useGetOrders(
    session?.user.id as string
  );

  return (
    <div>
      {session && (
        <div>
          <h1>Order History</h1>

          {isError && <p>{error.message}</p>}
          {isLoading && <CircularProgress />}

          {data?.data?.map((x) => (
            <div style={{ backgroundColor: "lightcyan" }}>
              <h4>Order Id: {x.order_id}</h4>
              <h2 style={{ color: "purple" }}>{x.order_date}</h2>
              <h3>Amount: {x.shipping_address}</h3>
              <h4>Address: {x.order_total}</h4>
            </div>
          ))}
        </div>
      )}

      {!session && <h1>Please login to place an order</h1>}
    </div>
  );
};

export default Orders;
