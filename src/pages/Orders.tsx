import { useSession } from "../context/SessionContext";
import { useGetOrders } from "../db/db_apis";
import { CircularProgress } from "@mui/material/";
import "./orders.scss";

const Orders = () => {
  const session = useSession();
  const { data, error, isLoading, isError } = useGetOrders(
    session?.user.id as string
  );

  return (
    <div className="orders">
      {session && (
        <>
          <h1 className="orders__title">Order History</h1>

          {isError && <p className="orders__error">{error.message}</p>}
          {isLoading && <CircularProgress />}

          {data?.data?.map((x) => (
            <div className="orders__table">
              <div className="orders__row">
                <h4>Order Id: {x.order_id}</h4>
                <h2>{x.order_date}</h2>
                <h3>Amount: {x.shipping_address}</h3>
                <h4>Address: {x.order_total}</h4>
              </div>
            </div>
          ))}
        </>
      )}

      {!session && <h1>Please login to place an order</h1>}
    </div>
  );
};

export default Orders;
