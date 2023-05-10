import React, { useEffect } from "react";
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort/Sort";
import { useGetMyPizzas } from "../hooks/useGetMyPizzas";
import { BASEURL } from "../constants/baseurl";
import { useCreateUrlParams } from "../utils/useCreateUrlParams";
import { Pagination } from "../components/Pagination/Pagination";

export const Home = () => {
  const urlParams = useCreateUrlParams();

  const [pizzas, loading, error] = useGetMyPizzas(BASEURL + urlParams);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pizzas]);

  // TODO content__title displayed even if there are no pizzas to display after the filter. After adding the store, the problem will disappear.
  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div>
        <Pagination
          error={error}
          loading={loading}
          pizzas={pizzas}
          itemsPerPage={6}
        />
      </div>
    </div>
  );
};
