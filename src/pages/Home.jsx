import React, { useEffect, useState } from "react";
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { Loader } from "../components/Loader";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import { useGetMyPizzas } from "../hooks/useGetMyPizzas";
const BASEURL = "https://6436dc673e4d2b4a12dda417.mockapi.io/items";
const SORTPARAMS = ["rating", "price", "name"];

export const Home = () => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentSortIndex, setCurrentCortIndex] = useState(0);

  const urlParams = `?category=${currentCategoryIndex || "*"}&orderBy=${
    SORTPARAMS[currentSortIndex]
  }&order=desc`;

  const [pizzas, loading, error] = useGetMyPizzas(BASEURL + urlParams);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pizzas]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          currentCategoryIndex={currentCategoryIndex}
          setCurrentCategoryIndex={setCurrentCategoryIndex}
        />
        <Sort
          currentSortIndex={currentSortIndex}
          setCurrentCortIndex={setCurrentCortIndex}
        />
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
    </div>
  );
};
