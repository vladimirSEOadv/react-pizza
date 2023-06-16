import React from "react";
import { CATEGORIES } from "../../constants/categories";
import { setCategoryIndex } from "../../redux/slices/filtersSlice";
import { setItemOffset } from "../../redux/slices/paginationSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";

export const Categories = () => {
  const dispatch = useAppDispatch();
  const { categoryIndex } = useAppSelector((state) => state.filters);
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
