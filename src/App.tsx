import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./pages/Navigation/Navbar";
import Home from "./pages/Home";
import LoginRegister from "./pages/LoginRegister";
import "./App.css";
import { useEffect, useState } from "react";
import { AuthTokenResponsePassword } from "@supabase/supabase-js";
import Products from "./pages/Products";
import Basket from "./pages/Basket";

const App = () => {
  // Auth Token
  const [token, setToken] = useState<boolean>(false);

  if (token) {
    sessionStorage.setItem("user_token", JSON.stringify(token));
  }

  useEffect(() => {
    if (sessionStorage.getItem("user_token")) {
      let data = JSON.parse(sessionStorage.getItem("user_token") as string);
      setToken(data);
    }
  }, []);

  console.log("Session", token);

  return (
    <>
      <Navbar token={token} />
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/basket" element={<Basket />} />
          <Route
            path="/loginRegister"
            element={<LoginRegister setToken={setToken} />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
