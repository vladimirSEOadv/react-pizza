import React, { useEffect } from "react";
import { Categories } from "../../components/Categories/Categories";
import { Sort } from "../../components/Sort/Sort";
import { useGetMyPizzas } from "../../hooks/useGetMyPizzas/useGetMyPizzas";
import { ProductCatalog } from "../../components/ProductCatalog/ProductCatalog";
import { usePushParamsToUrl } from "../../hooks/useGetMyPizzas/usePushParamsToUrl";
import { useCreateStrSParamsToAxios } from "../../hooks/useGetMyPizzas/useCreateStrSParamsToAxios";
import { useAppSelector } from "../../redux/hooks/hooks";

export const HomePage = () => {
  const items = useAppSelector((state) => state.pizzas.items);
  const { sortIndex, categoryIndex, searchQuery } = useAppSelector(
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
