import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./pages/Navigation/Navbar";
import Home from "./pages/Home";
import LoginRegister from "./pages/LoginRegister";
import "./App.css";
import Products from "./pages/Products";
import Basket from "./pages/Basket";
import Orders from "./pages/Orders";
import Account from "./pages/Account";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Footer from "./pages/Navigation/Footer";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/loginRegister" element={<LoginRegister />} />
          <Route path="/account/" element={<Account />}>
            <Route index element={<Profile />} />
            <Route path="/account/orders" element={<Orders />} />
          </Route>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orderConfirmation" element={<OrderConfirmation />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
