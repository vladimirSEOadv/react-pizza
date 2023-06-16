import React, { useState } from "react";
import {
  AddedToCartVariantTypes,
  addItem,
  CartVariant,
} from "../../../../redux/slices/cartSlice";
import { typesOfDough } from "../../../../constants/typesOfDough";
import { svgButtonAddToCart } from "./svgButtonAddToCart";
import { calculatePrice, calculatePriceTypes } from "./calculatePrice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hooks";
import { Pizza } from "../../../../redux/slices/pizzasSlice";

type PizzaBlockProps = Pick<
  Pizza,
  "id" | "name" | "imageUrl" | "types" | "sizes" | "price"
>;

const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  name,
  imageUrl,
  types,
  sizes,
  price,
}) => {
  const dispatch = useAppDispatch();

  function useGetPizzaCount(id: number) {
    return useAppSelector((state) => {
      const idIsExistInCart = state.cart.items?.[id];
      if (idIsExistInCart) {
        return state.cart.items?.[id].variants.reduce(
          (acc: number, variant: CartVariant): number => {
            acc += variant.count;
            return acc;
          },
          0
        );
      } else {
        return 0;
      }
    });
  }

  const pizzaCount = useGetPizzaCount(id);

  const initialState: AddedToCartVariantTypes = {
    size: sizes[0],
    type: typesOfDough[types[0]],
    price: calculatePrice({
      currentType: typesOfDough[types[0]],
      currentSize: sizes[0],
      basePrice: price,
      sizes,
    } as calculatePriceTypes),
  };

  const [currentVariant, setCurrentVariant] = useState(initialState);

  function addToCartHandler(addedVariant: AddedToCartVariantTypes) {
    dispatch(
      addItem({
        id,
        name,
        imageUrl,
        variant: addedVariant,
      })
    );
  }

  function pickTypeHandler(newType: string, basePrice: number) {
    setCurrentVariant((oldVariant) => {
      const newPrice = calculatePrice({
        currentType: newType,
        currentSize: oldVariant.size,
        basePrice,
        sizes,
      } as calculatePriceTypes);
      return {
        ...oldVariant,
        type: newType,
        price: newPrice,
      };
    });
  }

  function pickSizeHandler(newSize: number, basePrice: number) {
    setCurrentVariant((oldVariant) => {
      const newPrice = calculatePrice({
        currentType: oldVariant.type,
        currentSize: newSize,
        basePrice,
        sizes,
      } as calculatePriceTypes);
      return {
        ...oldVariant,
        size: newSize,
        price: newPrice,
      };
    });
  }

  const navigate = useNavigate();
  return (
    <div className="pizza-block">
      <div
        className="pizza-block-wrapper"
        onClick={() => {
          navigate(`/pizza/${id}`);
        }}
      >
        <img
          className="pizza-block__image"
          src={imageUrl}
          alt={name}
          draggable="false"
        />
        <h4 className="pizza-block__title">{name}</h4>
      </div>
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
