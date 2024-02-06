import { FormEvent, useEffect, useState } from "react";
import { useSession } from "../context/SessionContext";
import { supabase } from "../config/supabase.config";
import { useNavigate } from "react-router-dom";

interface OrderTable {
  order_id: number;
  user_id: string;
  product: string;
  quantity: number;
  shipping_address: string;
}

const TestOrder = () => {
  const session = useSession();

  const [orderData, setOrderData] = useState<{
    product: string;
    shipping_address: string;
    quantity: number;
  }>({
    product: "",
    shipping_address: "",
    quantity: 0,
  });

  console.log(orderData);
  const navigate = useNavigate();

  const handleOrderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrderData((prevOrderData) => {
      return {
        ...prevOrderData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleOrderSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const { data, error } = await supabase
      .from("testOrder")
      .insert({
        // user_id: session?.user.id,
        // shipping_address: orderData.shipping_address,
        // payment_state: "accepted",
        shipping_address: orderData.shipping_address,
        product: orderData.product,
        quantity: orderData.quantity,
        // order_date: `(to_timestamp(${Date.now()} /1000 ))`,
      })
      .select();
    console.log(data);
    if (error) {
      alert(error.message);
      navigate("/orders");
    }
  };

  const [orderHistory, setOrderHistory] = useState<OrderTable[]>([]);

  useEffect(() => {
    const getOrderHistory = async () => {
      const { data, error } = await supabase
        .from("testOrder")
        .select("*")
        .returns<OrderTable[]>();
      console.log(data);
      if (data === null || error) {
        alert(error.message);
      } else {
        setOrderHistory(data);
      }
    };
    getOrderHistory();
  }, []);

  console.log("Order history:", orderHistory);

  return (
    <div>
      {session && (
        <form onSubmit={handleOrderSubmit}>
          <input
            placeholder="Product"
            type="text"
            name="product"
            onChange={handleOrderChange}
          />

          <input
            placeholder="quantity"
            type="number"
            name="quantity"
            onChange={handleOrderChange}
          />

          <input
            placeholder="address"
            type="text"
            name="shipping_address"
            onChange={handleOrderChange}
          />

          <button>Order!</button>

          <br />

          <h1>Order History</h1>

          {orderHistory.map((x) => (
            <div style={{ backgroundColor: "lightcyan" }}>
              <h5>Order Id: {x.order_id}</h5>
              <h2 style={{ color: "purple" }}>{x.product}</h2>
              <h3>Amount: {x.quantity}</h3>
              <h4>Address: {x.shipping_address}</h4>
            </div>
          ))}
        </form>
      )}

      {!session && <h1>Please login to place an order</h1>}
    </div>
  );
};

export default TestOrder;
