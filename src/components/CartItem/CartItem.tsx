import React, { MouseEvent } from "react";
import { svgCrossOnDeleteButton } from "./assets/svgCrossOnDeleteButton";
import { deleteItemInCart } from "../../redux/slices/cartSlice";
import { CartItemCounter } from "./components/CartItemCounter/CartItemCounter";
import { useAppDispatch } from "../../redux/hooks/hooks";

type CartItemTypes = {
  id: string;
  name: string;
  price: number;
  count: number;
  size: number;
  type: string;
  imageUrl: string;
};

export const CartItem = ({
  id,
  name,
  price,
  count,
  size,
  type,
  imageUrl,
}: CartItemTypes) => {
  const dispatch = useAppDispatch();

  function removeItemOfCart(e: MouseEvent) {
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
