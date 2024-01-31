import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navigation/Navbar";
import Home from "./pages/Home";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar isSignedIn={false} />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
