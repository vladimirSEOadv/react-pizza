import React from "react";
import { setSearchValue } from "../../../../redux/slices/filtersSlice";
import { setItemOffset } from "../../../../redux/slices/paginationSlice";
import styles from "./EmptySearchResult.module.scss";
import { useAppDispatch } from "../../../../redux/hooks/hooks";

export const EmptySearchResult: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Таких пицц нет</h2>
      </div>
      <button
        className={styles.resetButton}
        onClick={() => {
          dispatch(setSearchValue(""));
          dispatch(setItemOffset(0));
        }}
      >
        Сбросить поиск
      </button>
    </>
  );
};
