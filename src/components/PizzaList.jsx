import React from "react";
import PizzaBlock from "./PizzaBlock";

export const PizzaList = ({ arrOfPizza }) => {
  return (
    <>
      {arrOfPizza.map((item) => {
        return <PizzaBlock {...item} key={item.id} />;
      })}
    </>
  );
};
