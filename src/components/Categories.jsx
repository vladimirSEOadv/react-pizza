import React from "react";
import { CATEGORIES } from "../constants/categories";
import { categoryIndex, setCategoryIndex } from "../redux/slices/filtersSlice";
import { useDispatch, useSelector } from "react-redux";

export const Categories = () => {
  const dispatch = useDispatch();
  const currentCategoryIndex = useSelector(categoryIndex);
  return (
    <div className="categories">
      <ul>
        {CATEGORIES.map((nameCategory, index) => {
          return (
            <li
              key={nameCategory}
              className={currentCategoryIndex === index ? "active" : ""}
              onClick={() => dispatch(setCategoryIndex(index))}
            >
              {nameCategory}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
