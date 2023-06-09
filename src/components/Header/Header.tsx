import React from "react";
import { LogoSection } from "./components/LogoSection/LogoSection";
import { Search } from "../Search/Search";
import { CartInfo } from "./components/CartInfo/CartInfo";
import { useLocation } from "react-router-dom";

export const Header: React.FC = () => {
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
