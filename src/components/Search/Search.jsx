import React from "react";
import styles from "./Search.module.scss";
import closeSvg from "../../assets/img/close-svg-icon.svg";
import searchSvg from "../../assets/img/search-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  resetSearchValue,
  searchValue,
  setSearchValue,
} from "../../redux/slices/searchSlice";

export const Search = () => {
  const mySearchValue = useSelector(searchValue);
  const dispatch = useDispatch();
  return (
    <div className={styles.root}>
      <div className={styles.searchWidthContainer}>
        <label htmlFor="search-input">
          <img className={styles.search} src={searchSvg} alt="search" />
          {mySearchValue && (
            <img
              className={styles.closeSvg}
              src={closeSvg}
              onClick={() => {
                dispatch(resetSearchValue());
              }}
              alt="close"
            />
          )}
        </label>
        <input
          value={mySearchValue}
          onChange={(e) => {
            dispatch(setSearchValue(e.target.value));
          }}
          id="search-input"
          className={styles.input}
          placeholder="Поиск пиццы"
          type="text"
        />
      </div>
    </div>
  );
};
