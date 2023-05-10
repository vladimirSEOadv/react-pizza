import React, { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { BlockWrapper } from "../PizzaBlock/BlockWrapper";
import styles from "./Pagination.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  currentSearchValue,
  setItemOffset,
  setPageCount,
  setSearchValue,
} from "../../redux/slices/filtersSlice";
import PizzaBlock from "../PizzaBlock/PizzaBlock";

export function ProductCatalog({ pizzas, error, loading }) {
  const dispatch = useDispatch();

  const searchValue = useSelector(currentSearchValue);
  const searchedPizzas = pizzas.filter(
    (pizza) => pizza.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
  );

  const { itemsPerPage, pageCount, itemOffset } = useSelector(
    (state) => state.filters.pagination
  );

  const endOffset = itemOffset + itemsPerPage;
  const paginateSlice = searchedPizzas.slice(itemOffset, endOffset);

  useEffect(() => {
    const newPageCount = Math.ceil(searchedPizzas.length / itemsPerPage);
    dispatch(setPageCount(newPageCount));
  }, [searchedPizzas, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % searchedPizzas.length;
    dispatch(setItemOffset(newOffset));
    window.scrollTo(0, 0);
  };

  const currentBlock = () => {
    if (error || loading || pizzas.length === 0) {
      return (
        <BlockWrapper error={error} loading={loading} data={searchedPizzas} />
      );
    } else if (searchedPizzas === 0) {
      return (
        <>
          <div style={{ width: "100%" }}>
            <h2 className={styles.title}>Таких пицц нет</h2>
          </div>
          <button
            className={styles.resetButton}
            onClick={() => {
              dispatch(setSearchValue(""));
            }}
          >
            Сбросить поиск
          </button>
        </>
      );
    } else {
      return paginateSlice.map((item) => {
        return <PizzaBlock {...item} key={item.id} />;
      });
    }
  };

  return (
    <>
      <div className="content__items">{currentBlock()}</div>
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
