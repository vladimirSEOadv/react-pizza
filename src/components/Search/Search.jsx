import React, { useCallback, useState } from "react";
import styles from "./Search.module.scss";
import closeSvg from "../../assets/img/close-svg-icon.svg";
import searchSvg from "../../assets/img/search-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  currentSearchValue,
  setSearchValue,
} from "../../redux/slices/filtersSlice";
import debounce from "lodash.debounce";

export const Search = () => {
  const mySearchValue = useSelector(currentSearchValue);
  const [localSearchValue, setLocalSearchValue] = useState(mySearchValue);
  const dispatch = useDispatch();

  const onclickHandler = () => {
    setLocalSearchValue("");
    dispatch(setSearchValue(""));
  };

  const testDebounce = useCallback(
    debounce((value) => {
      dispatch(setSearchValue(value));
    }, 700),
    []
  );

  const inputHandler = (e) => {
    setLocalSearchValue(e.target.value);
    testDebounce(e.target.value);
  };

  return (
    <div className={styles.root}>
      <div className={styles.searchWidthContainer}>
        <label htmlFor="search-input">
          <img className={styles.search} src={searchSvg} alt="search" />
          {localSearchValue && (
            <img
              className={styles.closeSvg}
              src={closeSvg}
              onClick={onclickHandler}
              alt="close"
            />
          )}
        </label>
        <input
          value={localSearchValue}
          onChange={inputHandler}
          id="search-input"
          className={styles.input}
          placeholder="Поиск пиццы"
          type="text"
        />
      </div>
    </div>
  );
};
