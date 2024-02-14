import { useCartItems } from "../db/db_apis";
import "../pages/checkoutform.css";

const CheckoutForm = () => {
  const { data: basketItems } = useCartItems();

  let total: number = 0;

  basketItems?.forEach((t) => {
    total += t.price * t.quantity;
  });

  return (
    <div className="checkout_form">
      <div className="basket_summary">
        <h3>Order summary</h3>
        <ul>
          {basketItems?.map((b) => (
            <li key={b.product_id}>
              <div className="infoWrap">
                <div className="cartSection">
                  <img src={b.image_url} alt="" className="itemImg" />
                  <p className="itemNumber">{b.category_id}</p>
                  <h3>
                    {b.quantity.toString()} x {b.name}
                  </h3>
                </div>

                <div className="prodTotal cartSection">
                  <p>{`€${(b.price * b.quantity).toFixed(2)}`}</p>
                </div>
                <div className="cartSection removeWrap"></div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="checkout_container">
        <div className="checkout-container">
          <h3 className="heading-3">Credit card checkout</h3>
          <span>Total: €{total.toFixed(2)}</span>
          <div>
            <form action="">
              <input
                className="input"
                defaultValue="Cardholders name"
                name="Cardholders name"
                type="text"
              />
              <input
                className="input input-field"
                defaultValue="Card number"
                name="number"
                type="text"
              />
              <input
                className="input input-field"
                defaultValue="CRC code"
                name="code"
                type="text"
              />
              <input
                className="input input-field"
                defaultValue="Expiry date"
                name="expiry"
                type="text"
              />
              <button className="checkout-btn" type="button">
                {"Place order"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
