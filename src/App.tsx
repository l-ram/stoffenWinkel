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
import Favourites from "./pages/Favourites";
import ProductPageCutting from "./pages/ProductPageCutting";
import ReactGA from "react-ga4";
import { useEffect } from "react";
import ProductPage from "./pages/ProductPage";
ReactGA.initialize("G-C75192SJDV");

function CheckDom(str: string) {
  const openingTags = str.match(/<\w+>/g);
  const closingTags = str.match(/(<\/\w+>)/g);

  const strMap = {
    "<div>": "</div>",
    "<p>": "</p>",
    "<i>": "</i>",
    "<em>": "</em>",
    "<b>": "</b>",
  };

  if (!openingTags || !closingTags) {
    return "false";
  }

  for (let i = 0; i < openingTags.length; i++) {
    const openingTag: string = openingTags[i];
    const closingTag: string = strMap[openingTag as keyof typeof strMap];
    if (closingTag) {
      const closingTagIndex = closingTags.indexOf(closingTag);
      if (closingTagIndex > -1) {
        closingTags.splice(closingTagIndex, 1);
      } else return openingTags[i].replace(/<|>/g, "");
    }
  }
  return "true";
}

console.log("Odoo test", CheckDom(""));

const App = () => {
  useEffect(() => {
    ReactGA.set({ page: window.location.href + window.location.search });
    console.log("ga ran");
  }, [window.location.href]);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/productPage/:productId" element={<ProductPage />} />
          <Route path="/cuttingPage" element={<ProductPageCutting />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/loginRegister" element={<LoginRegister />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/account/" element={<Account />}>
            <Route index element={<Profile />} />
            <Route path="/account/orders" element={<Orders />} />
            <Route path="/account/favourites" element={<Favourites />} />
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
