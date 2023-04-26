import React, { useContext } from "react";
import PizzaBlock from "../PizzaBlock";
import { SearchContext } from "../../context/searchContext";
import styles from "./PizzaList.module.scss";

export const PizzaList = ({ arrOfPizza }) => {
  const [searchValue, setSearchValue] = useContext(SearchContext);

  const searchedPizzas = arrOfPizza.filter(
    (pizza) => pizza.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
  );

  return (
    <>
      {searchedPizzas.length ? (
        searchedPizzas.map((item) => <PizzaBlock {...item} key={item.id} />)
      ) : (
        <>
          <div style={{ width: "100%" }}>
            <h2 className={styles.title}>Таких пицц нет</h2>
          </div>
          <button
            className={styles.resetButton}
            onClick={() => setSearchValue("")}
          >
            Сбросить поиск
          </button>
        </>
      )}
    </>
  );
};
