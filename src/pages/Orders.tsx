import { useSession } from "../context/SessionContext";
import { useGetOrders } from "../db/db_apis";
import { CircularProgress } from "@mui/material/";
import "./orders.scss";
import ReactGA from "react-ga4";
import { useEffect } from "react";

const Orders = () => {
  useEffect(() => {
    ReactGA.set({ page: window.location.href + window.location.search });
    console.log("ga ran");
  }, [window.location.href]);
  const session = useSession();
  const { data, error, isLoading, isError } = useGetOrders(
    session?.user.id as string
  );

  // Date formatting

  const formateDate = (date: string) => {
    const dateMethod = new Date(date);

    const options: {
      weekday?: "narrow" | "short" | "long";
      era?: "narrow" | "short" | "long";
      year?: "numeric" | "2-digit";
      month?: "numeric" | "2-digit" | "narrow" | "short" | "long";
      day?: "numeric" | "2-digit";
      hour?: "numeric" | "2-digit";
      minute?: "numeric" | "2-digit";
      second?: "numeric" | "2-digit";
      timeZoneName?: "short" | "long";

      // Time zone to express it in
      timeZone?: "Asia/Shanghai";
      // Force 12-hour or 24-hour
      hour12?: true | false;

      // Rarely-used options
      hourCycle?: "h11" | "h12" | "h23" | "h24";
      formatMatcher?: "basic" | "best fit";
    } = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    return dateMethod.toLocaleDateString("nl-BE", options);
  };

  return (
    <div className="orders">
      <h2>Order History</h2>

      {session && (
        <>
          {isError && <p className="orders__error">{error.message}</p>}
          {isLoading && <CircularProgress />}

          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Date</th>
                <th>Shipping Address</th>
                <th>Order total</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((row) => (
                <tr key={row.order_id}>
                  <td>{row.order_id}</td>
                  <td>{formateDate(row.order_date as string)}</td>
                  <td>{row.shipping_address}</td>
                  <td>€{row.order_total.toFixed(2)}</td>
                  <td>Despathched</td>
                  <td>
                    <button color="var(--tealTheme)">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* {data?.data?.map((x) => (
            <div className="orders__table">
              <div className="orders__row">
                <h4>Order Id: {x.order_id}</h4>
                <h2>{x.order_date}</h2>
                <h3>Amount: {x.shipping_address}</h3>
                <h4>Address: {x.order_total}</h4>
              </div>
            </div>
          ))} */}
        </>
      )}

      {!session && <h1>Please login to place an order</h1>}
    </div>
  );
};

export default Orders;
