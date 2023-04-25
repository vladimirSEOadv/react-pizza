import React, { useContext } from "react";
import styles from "./Search.module.scss";
import closeSvg from "../../assets/img/close-svg-icon.svg";
import searchSvg from "../../assets/img/search-icon.svg";
import { SearchContext } from "../../context/searchContext";

export const Search = () => {
  const [searchValue, setSearchValue] = useContext(SearchContext);
  return (
    <div className={styles.root}>
      <div className={styles.searchWidthContainer}>
        <label htmlFor="search-input">
          <img className={styles.search} src={searchSvg} alt="search" />
          {searchValue && (
            <img
              className={styles.closeSvg}
              src={closeSvg}
              onClick={() => setSearchValue("")}
              alt="close"
            />
          )}
        </label>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          id="search-input"
          className={styles.input}
          placeholder="Поиск пиццы"
          type="text"
        />
      </div>
    </div>
  );
};
