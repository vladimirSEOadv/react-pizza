import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { PizzaList } from "../PizzaList/PizzaList";
import { BlockWrapper } from "../PizzaBlock/BlockWrapper";
import styles from "./Pagination.module.scss";

export function Pagination({ itemsPerPage, pizzas, error, loading }) {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = pizzas.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(pizzas.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % pizzas.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="content__items">
        {error || loading || pizzas.length === 0 ? (
          <BlockWrapper error={error} loading={loading} data={pizzas} />
        ) : (
          <PizzaList arrOfPizza={currentItems} />
        )}
      </div>
      <ReactPaginate
        className={styles.pagination}
        breakLabel="..."
        nextLabel=" >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        previousLabel="< "
        renderOnZeroPageCount={null}
      />
    </>
  );
}
