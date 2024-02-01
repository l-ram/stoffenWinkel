import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./pages/Navigation/Navbar";
import Home from "./pages/Home";
import LoginRegister from "./pages/LoginRegister";
import "./App.css";
import { supabase } from "./config/supabase.config";

const App = () => {
  return (
    <>
      <Navbar isSignedIn={false} />
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<Home />} />
          <Route path="/loginRegister" element={<LoginRegister />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
