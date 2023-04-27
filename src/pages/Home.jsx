import React, { useEffect, useState } from "react";
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { useGetMyPizzas } from "../hooks/useGetMyPizzas";
import { BlockWrapper } from "../components/PizzaBlock/BlockWrapper";
import { PizzaList } from "../components/PizzaList/PizzaList";

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
  const [currentSortIndex, setCurrentSortIndex] = useState(0);
  // const [searchValue] = useContext(SearchContext);

  const makeUrlParams = () => {
    const category = `category=${currentCategoryIndex || "*"}`;
    const orderBy = `&orderBy=${SORTVALUES[currentSortIndex].sort}`;
    const order = `&order=${SORTVALUES[currentSortIndex].order}`;
    // const search = searchValue ? `search=${searchValue}` : "";
    return `?${category}${orderBy}${order}`;
    // return `?category="22"&orderBy=${orderBy}&order=${order}`;
  };

  const [pizzas, loading, error] = useGetMyPizzas(BASEURL + makeUrlParams());
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
      <h2 className="content__title">
        {Boolean(pizzas.length) && "Все пиццы"}
      </h2>
      <div className="content__items">
        <BlockWrapper error={error} loading={loading} data={pizzas} />
        <PizzaList error={error} arrOfPizza={pizzas} />
        {/*<Pagination itemsPerPage={6} />*/}
      </div>
    </div>
  );
};
