import React, { useEffect, useState } from "react";
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort/Sort";
import { useGetMyPizzas } from "../hooks/useGetMyPizzas";
import { BlockWrapper } from "../components/PizzaBlock/BlockWrapper";
import { PizzaList } from "../components/PizzaList/PizzaList";
import { BASEURL } from "../constants/baseurl";
import { SORTVALUES } from "../constants/sortvalues";
import { makeUrlParams } from "../utils/makeUrlParams";

export const Home = () => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentSortIndex, setCurrentSortIndex] = useState(0);

  const urlParams = makeUrlParams(currentCategoryIndex, currentSortIndex);

  const [pizzas, loading, error] = useGetMyPizzas(BASEURL + urlParams);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pizzas]);

  // TODO content__title displayed even if there are no pizzas to display after the filter. After adding the store, the problem will disappear.
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          currentCategoryIndex={currentCategoryIndex}
          setCurrentCategoryIndex={setCurrentCategoryIndex}
        />
        <Sort
          sortVariants={SORTVALUES.map((obj) => obj.name)}
          currentSortIndex={currentSortIndex}
          setCurrentSortIndex={setCurrentSortIndex}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div>
        <div className="content__items">
          <BlockWrapper error={error} loading={loading} data={pizzas} />
          <PizzaList error={error} arrOfPizza={pizzas} />
          {/*<Pagination itemsPerPage={6} />*/}
        </div>
      </div>
    </div>
  );
};
