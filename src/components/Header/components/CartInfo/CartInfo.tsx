import React from "react";
import { Link } from "react-router-dom";
import basketIcon from "../../../../assets/img/backet.svg";
import { useSelector } from "react-redux";
import {
  numberOfItemsInCart,
  totalPrice,
} from "../../../../redux/slices/cartSlice";
import styles from "./CartInfo.module.css";

export const CartInfo = () => {
  const currentTotalPrice = useSelector(totalPrice);
  const currentCountInCart = useSelector(numberOfItemsInCart);
  return (
    <div>
      <Link to={"/cart"} className="button button--cart" draggable="false">
        <span>{currentTotalPrice} ₴</span>
        <div className="button__delimiter" />
        <img src={basketIcon} alt="basket" />
        <div className={styles.totalInCart}>{currentCountInCart}</div>
      </Link>
    </div>
  );
};
