import React, { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import PizzaBlock from "./PizzaBlock/PizzaBlock";
import {
  setItemOffset,
  setPageCount,
} from "../../redux/slices/paginationSlice";
import styles from "./ProductCatalog.module.scss";
import { ErrorDisplayPanel } from "./ErrorDisplayPanel/ErrorDisplayPanel";
import Skeleton from "./Skeleton/Skeleton";
import { EmptySearchResult } from "./EmptySearchResult/EmptySearchResult";
import { setStatus } from "../../redux/slices/pizzasSlice";

export function ProductCatalog() {
  const dispatch = useDispatch();
  const { items: pizzas, status, error } = useSelector((state) => state.pizzas);

  const currentCategory = useSelector((state) => state.filters.categoryIndex);
  const currentSearchQuery = useSelector((state) => state.filters.searchQuery);

  // Технически можно убрать, так как фильтрация вшита в запросы,
  // но бекенд mockapi.io не умеет применять query параметры по поисковому запросу и категории одновременно.
  const pizzasFilteredByCategory =
    currentCategory === 0
      ? pizzas
      : pizzas.filter((pizza) => pizza.category === currentCategory);

  if (currentSearchQuery !== "" && pizzasFilteredByCategory.length === 0) {
    dispatch(setStatus("no results after filtering"));
  }

  const { itemsPerPage, pageCount, itemOffset } = useSelector(
    (state) => state.pagination
  );

  const endOffset = itemOffset + itemsPerPage;
  const paginateSlice = pizzasFilteredByCategory.slice(itemOffset, endOffset);

  useEffect(() => {
    const newPageCount = Math.ceil(
      pizzasFilteredByCategory.length / itemsPerPage
    );
    dispatch(setPageCount(newPageCount));
  }, [pizzasFilteredByCategory, itemsPerPage, dispatch]);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % pizzasFilteredByCategory.length;
    dispatch(setItemOffset(newOffset));
    window.scrollTo(0, 0);
  };

  const getCurrentBlock = (status) => {
    switch (status) {
      case "error":
        return <ErrorDisplayPanel error={error} />;
      case "loading":
        return <Skeleton />;
      case "empty data in response":
        return <h1 className={styles.center}>Данных нет</h1>;
      case "no results after filtering":
        return <EmptySearchResult />;
      case "success":
        return paginateSlice.map((item) => {
          return <PizzaBlock {...item} key={item.id} />;
        });
      default:
        console.log("Unknown status in getCurrentBlock ProductCatalog.jsx");
        return (
          <>
            <h1 className={styles.center}>Данных нет</h1>
            <p>Unknown status in ProductCatalog.jsx</p>
          </>
        );
    }
  };

  return (
    <>
      <div className="content__items">{getCurrentBlock(status)}</div>
      {pageCount > 1 && (
        <ReactPaginate
          className={styles.pagination}
          breakLabel="..."
          nextLabel=" >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={pageCount}
          previousLabel="< "
          renderOnZeroPageCount={null}
        />
      )}
    </>
  );
}
