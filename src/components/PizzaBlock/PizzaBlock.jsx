import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";
import { typesOfDough } from "../../constants/typesOfDough";
import { svgButtonAddToCart } from "./svgButtonAddToCart";

const PizzaBlock = ({ name, imageUrl, types, sizes, price, id }) => {
  const dispatch = useDispatch();

  const [pizzaCount, setPizzaCount] = useState(0);
  const [currentVariant, setCurrentVariant] = useState({
    size: sizes[0],
    type: typesOfDough[types[0]],
    price,
  });
  const calculatePrice = ({ type, size, basePrice }) => {
    let newPrice = basePrice;
    if (type !== "тонкое") {
      newPrice += basePrice * 0.2;
    }
    if (size !== sizes[0]) {
      const costOneSm = basePrice / sizes[0];
      const difference = size - sizes[0];
      newPrice += Math.round(costOneSm * difference);
    }
    return newPrice;
  };

  const addToCartHandler = () => {
    setPizzaCount((pizzaCount) => pizzaCount + 1);
    dispatch(
      addItem({
        id,
        name,
        imageUrl,
        variant: currentVariant,
      })
    );
  };

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt={name} />
      <h4 className="pizza-block__title">{name}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((typeId, index) => {
            return (
              <li
                key={typesOfDough[index]}
                className={
                  currentVariant.type === typesOfDough[types[index]]
                    ? "active"
                    : ""
                }
                onClick={() => {
                  setCurrentVariant((oldVariant) => {
                    const currentPrice = calculatePrice({
                      type: typesOfDough[typeId],
                      size: currentVariant.size,
                      basePrice: price,
                    });
                    return {
                      ...oldVariant,
                      type: typesOfDough[index],
                      price: currentPrice,
                    };
                  });
                }}
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
                onClick={() => {
                  setCurrentVariant((oldVariant) => {
                    const currentPrice = calculatePrice({
                      type: currentVariant.type,
                      size: sizes[index],
                      basePrice: price,
                    });
                    return {
                      ...oldVariant,
                      size: sizes[index],
                      price: currentPrice,
                    };
                  });
                }}
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
          onClick={addToCartHandler}
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
