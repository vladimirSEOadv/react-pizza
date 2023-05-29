import React, { useCallback, useEffect, useState } from "react";
import styles from "./Search.module.scss";
import closeSvg from "../../assets/img/close-svg-icon.svg";
import searchSvg from "../../assets/img/search-icon.svg";
import { batch, useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../../redux/slices/filtersSlice";
import debounce from "lodash.debounce";
import { setItemOffset } from "../../redux/slices/paginationSlice";

export const Search = () => {
  const stateSearchValue = useSelector((state) => state.filters.searchQuery);
  const [localSearchValue, setLocalSearchValue] = useState(stateSearchValue);
  useEffect(() => {
    setLocalSearchValue(stateSearchValue);
  }, [stateSearchValue]);
  const dispatch = useDispatch();

  const onclickHandler = () => {
    const emptyStr = "";
    setLocalSearchValue(emptyStr);
    batch(() => {
      dispatch(setSearchValue(emptyStr));
      dispatch(setItemOffset(0));
    });
  };

  const debounceFunc = useCallback(
    debounce((value) => {
      batch(() => {
        dispatch(setSearchValue(value.trim()));
        dispatch(setItemOffset(0));
      });
    }, 700),
    []
  );

  const inputHandler = (e) => {
    setLocalSearchValue(e.target.value);
    debounceFunc(e.target.value);
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
