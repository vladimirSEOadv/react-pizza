import React, { useEffect, useState } from "react";
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { useGetMyPizzas } from "../hooks/useGetMyPizzas";
import { BlockWrapper } from "../components/PizzaBlock/BlockWrapper";
import { PizzaList } from "../components/PizzaList";

const BASEURL = "https://6436dc673e4d2b4a12dda417.mockapi.io/items";

const SORTVALUES = [
  { name: "популярности (По возрастанию)", sort: "rating", order: "desc" },
  { name: "популярности (По убыванию)", sort: "rating", order: "asc" },
  { name: "цене (По возрастанию)", sort: "price", order: "desc" },
  { name: "цене (По убыванию)", sort: "price", order: "asc" },
  { name: "алфавиту (По возрастанию)", sort: "name", order: "desc" },
  { name: "алфавиту (По убыванию)", sort: "name", order: "asc" },
];

export const Home = () => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentSortIndex, setCurrentCortIndex] = useState(0);

  const makeUrlParams = () => {
    const category = currentCategoryIndex || "*";
    const orderBy = SORTVALUES[currentSortIndex].sort;
    const order = SORTVALUES[currentSortIndex].order;
    return `?category=${category}&orderBy=${orderBy}&order=${order}`;
    // return `?category="22"&orderBy=${orderBy}&order=${order}`;
  };

  const [pizzas, loading, error] = useGetMyPizzas(BASEURL + makeUrlParams());
  console.log("pizzas", pizzas);
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
          sortVariants={SORTVALUES.map((obj) => obj.name)}
          currentSortIndex={currentSortIndex}
          setCurrentCortIndex={setCurrentCortIndex}
        />
      </div>
      <h2 className="content__title">
        {Boolean(pizzas.length) && "Все пиццы"}
      </h2>
      <div className="content__items">
        <BlockWrapper error={error} loading={loading} data={pizzas}>
          <PizzaList arrOfPizza={pizzas} />
        </BlockWrapper>
      </div>
    </div>
  );
};
