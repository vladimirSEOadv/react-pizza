import React from "react";
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { Loader } from "../components/Loader";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import { useGetMyPizzas } from "../hooks/useGetMyPizzas";

export const Home = () => {
  const [pizzas, loading, error] = useGetMyPizzas(
    "https://6436dc673e4d2b4a12dda417.mockapi.io/items"
  );
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {error && <Loader error={error} />}
        {loading &&
          [...new Array(6)].map((_, index) => {
            return <Skeleton key={index} />;
          })}
        {pizzas.length > 0 &&
          pizzas.map((pizza) => {
            return <PizzaBlock {...pizza} key={pizza.id} />;
          })}
      </div>
    </>
  );
};
