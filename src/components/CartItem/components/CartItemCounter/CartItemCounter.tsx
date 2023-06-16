import React from "react";
import { svgDecrementQuantityOfGoods } from "../../assets/svgDecrementQuantityOfGoods";
import { svgIncrementQuantityOfGoods } from "../../assets/svgIncrementQuantityOfGoods";
import { changeCountOfItemInCart } from "../../../../redux/slices/cartSlice";
import { useAppDispatch } from "../../../../redux/hooks/hooks";

interface CartItemCounterProps {
  id: string;
  size: number;
  type: string;
  count: number;
}

export const CartItemCounter: React.FC<CartItemCounterProps> = ({
  id,
  size,
  type,
  count,
}) => {
  const dispatch = useAppDispatch();

  function incrementItemOfCart() {
    const objChanges = {
      id,
      size,
      type,
      changeType: "increment",
    };

    dispatch(changeCountOfItemInCart(objChanges));
  }

  function decrementItemOfCart() {
    const objChanges = {
      id,
      size,
      type,
      changeType: "decrement",
    };
    dispatch(changeCountOfItemInCart(objChanges));
  }

  return (
    <div className="cart__item-count">
      <button
        disabled={count === 1}
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
