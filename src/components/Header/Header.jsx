import React from "react";
import { LogoSection } from "./LogoSection";
import { Search } from "../Search/Search";
import { CartInfo } from "./CartInfo";
import { useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();

  const getCurrentElement = () => {
    if (location.pathname.includes("/pizza/")) {
      return <CartInfo />;
    } else if (location.pathname !== "/cart") {
      return (
        <>
          <Search />
          <CartInfo />
        </>
      );
    }
  };

  return (
    <div className="header">
      <div className="container">
        <LogoSection />
        {getCurrentElement()}
      </div>
    </div>
  );
};
