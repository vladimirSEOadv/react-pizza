import React from "react";
import { svgDecrementQuantityOfGoods } from "../../assets/svgDecrementQuantityOfGoods";
import { svgIncrementQuantityOfGoods } from "../../assets/svgIncrementQuantityOfGoods";
import { changeCountOfItemInCart } from "../../../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";

export const CartItemCounter = ({ id, size, type, count }) => {
  const dispatch = useDispatch();
  function incrementItemOfCart() {
    dispatch(
      changeCountOfItemInCart({
        id,
        size,
        type,
        changeType: "increment",
      })
    );
  }

  function decrementItemOfCart() {
    if (count === 1) return;
    dispatch(
      changeCountOfItemInCart({ id, size, type, changeType: "decrement" })
    );
  }

  return (
    <div className="cart__item-count">
      <button
        className="button button--outline button--circle cart__item-count-minus minus"
        onClick={decrementItemOfCart}
      >
        {svgDecrementQuantityOfGoods}
      </button>
      <b>{count}</b>
      <button
        className="button button--outline button--circle cart__item-count-plus plus"
        onClick={incrementItemOfCart}
      >
        {svgIncrementQuantityOfGoods}
      </button>
    </div>
  );
};
