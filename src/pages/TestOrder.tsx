import { FormEvent, useState } from "react";
import { useSession } from "../context/SessionContext";
import { supabase } from "../config/supabase.config";
import { useNavigate } from "react-router-dom";
import { timeStamp } from "console";

const TestOrder = () => {
  const session = useSession();
  const [orderData, setOrderData] = useState({
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
      .from("orders")
      .insert({
        user_id: session?.user.id,
        shipping_address: orderData.shipping_address,
        payment_state: "accepted",
        number_of_items: orderData.quantity,
        order_date: `(to_timestamp(${Date.now()} /1000 ))`,
        order_total: () => orderData.quantity * 7.25,
      })
      .select();
    console.log(data);
    if (error) {
      alert(error.message);
      navigate("/orders");
    }
  };

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
        </form>
      )}

      {!session && <h1>Please login to place an order</h1>}
    </div>
  );
};

export default TestOrder;
