import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";
import { typesOfDough } from "../../constants/typesOfDough";
import { svgButtonAddToCart } from "./svgButtonAddToCart";
import { calculatePrice } from "./calculatePrice";

const PizzaBlock = ({ name, imageUrl, types, sizes, price, id }) => {
  const dispatch = useDispatch();

  const pizzaCount = useSelector((state) => {
    const idIsExistInCart = state.cart.items?.[id];
    if (idIsExistInCart) {
      return state.cart.items?.[id].variants.reduce((acc, variant) => {
        acc += variant.count;
        return acc;
      }, 0);
    } else {
      return 0;
    }
  });

  const initialState = {
    size: sizes[0],
    type: typesOfDough[types[0]],
    price: calculatePrice({
      currentType: typesOfDough[types[0]],
      currentSize: sizes[0],
      basePrice: price,
      sizes,
    }),
  };

  const [currentVariant, setCurrentVariant] = useState(initialState);

  function addToCartHandler(addedVariant) {
    dispatch(
      addItem({
        id,
        name,
        imageUrl,
        variant: addedVariant,
      })
    );
  }

  function pickTypeHandler(newType, basePrice) {
    setCurrentVariant((oldVariant) => {
      const newPrice = calculatePrice({
        currentType: newType,
        currentSize: oldVariant.size,
        basePrice,
        sizes,
      });
      return {
        ...oldVariant,
        type: newType,
        price: newPrice,
      };
    });
  }

  function pickSizeHandler(newSize, basePrice) {
    setCurrentVariant((oldVariant) => {
      const newPrice = calculatePrice({
        currentType: oldVariant.type,
        currentSize: newSize,
        basePrice,
        sizes,
      });
      return {
        ...oldVariant,
        size: newSize,
        price: newPrice,
      };
    });
  }

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt={name} />
      <h4 className="pizza-block__title">{name}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((typeId) => {
            return (
              <li
                key={typesOfDough[typeId]}
                className={
                  currentVariant.type === typesOfDough[typeId] ? "active" : ""
                }
                onClick={() => pickTypeHandler(typesOfDough[typeId], price)}
              >
                {typesOfDough[typeId]}
              </li>
            );
          })}
        </ul>
        <ul>
          {sizes.map((size, index) => {
            return (
              <li
                onClick={() => pickSizeHandler(size, price)}
                className={currentVariant.size === sizes[index] ? "active" : ""}
                key={sizes[index]}
              >
                {size} см.
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pizza-block__button">
        <div className="pizza-block__price">от {currentVariant.price} ₴</div>
        <button
          className="button button--outline button--add"
          onClick={() => addToCartHandler(currentVariant)}
        >
          {svgButtonAddToCart}
          <span>Добавить</span>
          <i>{pizzaCount}</i>
        </button>
      </div>
    </div>
  );
};

export default PizzaBlock;
