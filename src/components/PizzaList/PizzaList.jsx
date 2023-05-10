import React from "react";
import PizzaBlock from "../PizzaBlock/PizzaBlock";
import styles from "./PizzaList.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  currentSearchValue,
  resetSearchValue,
} from "../../redux/slices/filtersSlice";

export const PizzaList = ({ arrOfPizza, error }) => {
  const searchValue = useSelector(currentSearchValue);
  const dispatch = useDispatch();

  const searchedPizzas = arrOfPizza.filter(
    (pizza) => pizza.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
  );

  return (
    <>
      {searchedPizzas.length
        ? searchedPizzas.map((item) => <PizzaBlock {...item} key={item.id} />)
        : !error &&
          arrOfPizza.length > searchedPizzas && (
            <>
              <div style={{ width: "100%" }}>
                <h2 className={styles.title}>Таких пицц нет</h2>
              </div>
              <button
                className={styles.resetButton}
                onClick={() => {
                  dispatch(resetSearchValue());
                }}
              >
                Сбросить поиск
              </button>
            </>
          )}
    </>
  );
};
