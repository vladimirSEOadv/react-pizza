import React from "react";
import { Link } from "react-router-dom";
import backSvg from "../../assets/img/go-back.svg";
import { useDispatch, useSelector } from "react-redux";
import { CartItem } from "../../components/CartItem/CartItem";
import { SvgCartClear } from "./assets/SvgCartClear";
import { SvgCartIcon } from "./assets/SvgCartIcon";
import {
  cartItems,
  clearCart,
  numberOfItemsInCart,
  totalPrice,
} from "../../redux/slices/cartSlice";
import { EmptyCart } from "../../components/CartItem/components/EmptyCart/EmptyCart";

export const Cart = () => {
  const dispatch = useDispatch();
  const price = useSelector(totalPrice);
  const items = useSelector(cartItems);
  const itemCount = useSelector(numberOfItemsInCart);

  const clearCartHandler = () => {
    dispatch(clearCart());
  };

  const makeArrOfPizza = (cart) => {
    if (Object.keys(cart).length === 0) {
      return [];
    } else {
      const result = [];
      for (let pizzaId in cart) {
        const { name, imageUrl } = cart[pizzaId];
        for (let variant of cart[pizzaId].variants) {
          result.push({
            id: pizzaId,
            name,
            imageUrl,
            size: variant.size,
            type: variant.type,
            price: variant.price * variant.count,
            count: variant.count,
          });
        }
      }
      return result;
    }
  };
  const arrOfPizza = makeArrOfPizza(items);

  return (
    <>
      <div className="container container--cart">
        {arrOfPizza.length !== 0 ? (
          <div className="cart">
            <div className="cart__top">
              <h2 className="content__title">
                {SvgCartIcon}
                Корзина
              </h2>
              <div className="cart__clear">
                {SvgCartClear}
                <span onClick={clearCartHandler}>Очистить корзину</span>
              </div>
            </div>
            <div className="content__items">
              {arrOfPizza.map((pizza) => {
                return (
                  <CartItem
                    key={pizza.id}
                    id={pizza.id}
                    name={pizza.name}
                    price={pizza.price}
                    count={pizza.count}
                    size={pizza.size}
                    type={pizza.type}
                    imageUrl={pizza.imageUrl}
                  />
                );
              })}
            </div>
            <div className="cart__bottom">
              <div className="cart__bottom-details">
                <span>
                  {" "}
                  Всего пицц: <b>{itemCount} шт.</b>{" "}
                </span>
                <span>
                  {" "}
                  Сумма заказа: <b>{price} ₴</b>{" "}
                </span>
              </div>
              <div className="cart__bottom-buttons">
                <Link
                  to="/"
                  className="button button--outline button--add go-back-btn"
                >
                  <img src={backSvg} alt="backSvg" />
                  <span>Вернуться назад</span>
                </Link>
                <div className="button pay-btn">
                  <span>Оплатить сейчас</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <EmptyCart />
        )}
      </div>
    </>
  );
};
