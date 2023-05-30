import React, { useEffect } from "react";
import { Categories } from "../components/Categories/Categories";
import { Sort } from "../components/Sort/Sort";
import { useGetMyPizzas } from "../hooks/useGetMyPizzas/useGetMyPizzas";
import { ProductCatalog } from "../components/ProductCatalog/ProductCatalog";
import { useSelector } from "react-redux";
import { usePushParamsToUrl } from "../hooks/useGetMyPizzas/usePushParamsToUrl";
import { useCreateStrSParamsToAxios } from "../hooks/useGetMyPizzas/useCreateStrSParamsToAxios";

export const Home = () => {
  const items = useSelector((state) => state.pizzas.items);
  const { sortIndex, categoryIndex, searchQuery } = useSelector(
    (state) => state.filters
  );

  usePushParamsToUrl(sortIndex, categoryIndex, searchQuery);

  const urlParams = useCreateStrSParamsToAxios(
    sortIndex,
    categoryIndex,
    searchQuery
  );

  useGetMyPizzas(urlParams);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [items]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        {!!items.length && <Sort />}
      </div>
      {!!items.length && <h2 className="content__title">Все пиццы</h2>}
      <div>
        <ProductCatalog />
      </div>
    </div>
  );
};
