import "./scss/app.scss";
import { Header } from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart";
import { NotFound } from "./pages/NotFound";
import React, { useState } from "react";
import { SearchContext } from "./context/searchContext";

function App() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <SearchContext.Provider value={[searchValue, setSearchValue]}>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </SearchContext.Provider>
  );
}

export default App;
