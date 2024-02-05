import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./pages/Navigation/Navbar";
import Home from "./pages/Home";
import LoginRegister from "./pages/LoginRegister";
import "./App.css";
import Products from "./pages/Products";
import Basket from "./pages/Basket";
import TestOrder from "./pages/TestOrder";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/order" element={<TestOrder />} />
          <Route path="/loginRegister" element={<LoginRegister />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
