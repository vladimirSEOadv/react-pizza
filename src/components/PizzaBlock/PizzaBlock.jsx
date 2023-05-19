import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";
import { typesOfDough } from "../../constants/typesOfDough";
import { svgButtonAddToCart } from "./svgButtonAddToCart";
import { calculatePrice } from "./calculatePrice";

const PizzaBlock = ({ name, imageUrl, types, sizes, price, id }) => {
  const dispatch = useDispatch();

  const [pizzaCount, setPizzaCount] = useState(0);

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
    setPizzaCount((pizzaCount) => pizzaCount + 1);
    dispatch(
      addItem({
        id,
        name,
        imageUrl,
        variant: addedVariant,
      })
    );
  }

  function pickTypeHandler(newType) {
    setCurrentVariant((oldVariant) => {
      const newPrice = calculatePrice({
        currentType: newType,
        currentSize: oldVariant.size,
        basePrice: price,
        sizes,
      });
      return {
        ...oldVariant,
        type: newType,
        price: newPrice,
      };
    });
  }

  function pickSizeHandler(newSize) {
    setCurrentVariant((oldVariant) => {
      const newPrice = calculatePrice({
        currentType: oldVariant.type,
        currentSize: newSize,
        basePrice: price,
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
                onClick={() => pickTypeHandler(typesOfDough[typeId])}
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
                onClick={() => pickSizeHandler(size)}
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
