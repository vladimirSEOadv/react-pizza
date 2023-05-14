import React from "react";
import { CATEGORIES } from "../../constants/categories";
import { setCategoryIndex } from "../../redux/slices/filtersSlice";
import { useDispatch, useSelector } from "react-redux";
import { setItemOffset } from "../../redux/slices/paginationSlice";

export const Categories = () => {
  const dispatch = useDispatch();
  const { categoryIndex } = useSelector((state) => state.filters);
  return (
    <div className="categories">
      <ul>
        {CATEGORIES.map((nameCategory, index) => {
          return (
            <li
              key={nameCategory}
              className={categoryIndex === index ? "active-category" : ""}
              onClick={() => {
                dispatch(setCategoryIndex(index));
                dispatch(setItemOffset(0));
              }}
            >
              {nameCategory}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
