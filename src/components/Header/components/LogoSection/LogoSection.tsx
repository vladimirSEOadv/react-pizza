import { Link } from "react-router-dom";
import logo from "../../../../assets/img/pizza-logo.svg";
import React from "react";

export const LogoSection: React.FC = () => {
  return (
    <Link to={"/"} draggable="false">
      <div className="header__logo">
        <img width="38" src={logo} alt="Pizza logo" />
        <div className="header__logo__title">
          <h1>React Pizza v2</h1>
          <p>самая вкусная пицца во вселенной</p>
        </div>
      </div>
    </Link>
  );
};
