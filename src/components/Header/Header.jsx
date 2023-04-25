import React from "react";
import logo from "../../assets/img/pizza-logo.svg";
import { Link } from "react-router-dom";
import { Search } from "../Search/Search";
import basketIcon from "../../assets/img/backet.svg";

export const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <Link to={"/"}>
          <div className="header__logo">
            <img width="38" src={logo} alt="Pizza logo" />
            <div className="header__logo__title">
              <h1>React Pizza v2</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>
        <Search />
        <div className="header__cart">
          <Link to={"/cart"} className="button button--cart">
            <span>520 ₴</span>
            <div className="button__delimiter" />
            <img src={basketIcon} alt="basket" />
          </Link>
        </div>
      </div>
    </div>
  );
};