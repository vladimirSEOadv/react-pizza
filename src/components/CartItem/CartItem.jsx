import React from "react";
import { svgCrossOnDeleteButton } from "./svgCrossOnDeleteButton";
import { useDispatch } from "react-redux";
import { deleteItemInCart } from "../../redux/slices/cartSlice";
import { CartItemCounter } from "./CartItemCounter";

export const CartItem = ({ id, name, price, count, size, type, imageUrl }) => {
  const dispatch = useDispatch();

  function removeItemOfCart(e) {
    if (e.currentTarget.classList.contains("remove")) {
      dispatch(deleteItemInCart({ id, size, type }));
    }
  }

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{name}</h3>
        <p>
          {type} тесто, {size} см.
        </p>
      </div>
      <CartItemCounter type={type} count={count} size={size} id={id} />
      <div className="cart__item-price">
        <b>{price} ₴</b>
      </div>
      <div className="cart__item-remove">
        <button
          className="button button--outline button--circle remove"
          onClick={removeItemOfCart}
        >
          {svgCrossOnDeleteButton}
        </button>
      </div>
    </div>
  );
};
