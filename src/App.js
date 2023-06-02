import "./scss/app.scss";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart/Cart";
import { NotFound } from "./pages/NotFound";
import React from "react";
import { FullPizza } from "./pages/FullPizza";
import { HeaderOutlet } from "./components/HeaderOutlet/HeaderOutlet";

function App() {
  return (
    <Routes>
      <Route element={<HeaderOutlet />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
