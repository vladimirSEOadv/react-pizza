import React, { useEffect } from "react";
import { Categories } from "../components/Categories/Categories";
import { Sort } from "../components/Sort/Sort";
import { useGetMyPizzas } from "../hooks/useGetMyPizzas";
import { ProductCatalog } from "../components/ProductCatalog/ProductCatalog";

export const Home = () => {
  const [pizzas, loading, error] = useGetMyPizzas();
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
