import React from "react";
import { LogoSection } from "./LogoSection";
import { Search } from "../Search/Search";
import { CartInfo } from "./CartInfo";
import { useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  return (
    <div className="header">
      <div className="container">
        <LogoSection />
        {location.pathname !== "/cart" && (
          <>
            <Search />
            <CartInfo />
          </>
        )}
      </div>
    </div>
  );
};
