import React, { useEffect } from "react";
import { Categories } from "../components/Categories/Categories";
import { Sort } from "../components/Sort/Sort";
import { useGetMyPizzas } from "../hooks/useGetMyPizzas";
import { BaseUrl } from "../constants/baseUrl";
import { useCreateUrlParams } from "../utils/useCreateUrlParams";
import { ProductCatalog } from "../components/Pagination/ProductCatalog";

export const Home = () => {
  const urlParams = useCreateUrlParams();

  const [pizzas, loading, error] = useGetMyPizzas(BaseUrl + urlParams);
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
        <ProductCatalog error={error} loading={loading} pizzas={pizzas} />
      </div>
    </div>
  );
};
