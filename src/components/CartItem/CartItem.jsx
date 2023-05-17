import React from "react";
import { SvgDecrementQuantityOfGoods } from "./SvgDecrementQuantityOfGoods";
import { SvgIncrementQuantityOfGoods } from "./SvgIncrementQuantityOfGoods";
import { SvgCrossOnDeleteButton } from "./SvgCrossOnDeleteButton";

export const CartItem = ({ name, price, count, size, type, imageUrl }) => {
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
      <div className="cart__item-count">
        <div className="button button--outline button--circle cart__item-count-minus">
          <SvgDecrementQuantityOfGoods />
        </div>
        <b>{count}</b>
        <div className="button button--outline button--circle cart__item-count-plus">
          <SvgIncrementQuantityOfGoods />
        </div>
      </div>
      <div className="cart__item-price">
        <b>{price} ₴</b>
      </div>
      <div className="cart__item-remove">
        <div className="button button--outline button--circle">
          <SvgCrossOnDeleteButton />
        </div>
      </div>
    </div>
  );
};
