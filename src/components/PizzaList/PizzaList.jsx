import React from "react";
import PizzaBlock from "../PizzaBlock/PizzaBlock";
import styles from "./PizzaList.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { resetSearchValue, searchValue } from "../../redux/slices/searchSlice";

export const PizzaList = ({ arrOfPizza, error }) => {
  const mySearchValue = useSelector(searchValue);
  const dispatch = useDispatch();

  const searchedPizzas = arrOfPizza.filter(
    (pizza) =>
      pizza.name.toLowerCase().indexOf(mySearchValue.toLowerCase()) >= 0
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
