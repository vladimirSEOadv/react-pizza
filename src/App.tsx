import "./scss/app.scss";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/Home/HomePage";
import { Cart } from "./pages/Cart/Cart";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import React from "react";
import { HeaderOutlet } from "./components/HeaderOutlet/HeaderOutlet";
import { SinglePizza } from "./pages/SinglePizza/SinglePizza";

function App() {
  return (
    <Routes>
      <Route element={<HeaderOutlet />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizza/:id" element={<SinglePizza />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
