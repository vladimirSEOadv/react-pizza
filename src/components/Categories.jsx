import React from "react";

const CATEGORIES = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

export const Categories = ({
  currentCategoryIndex,
  setCurrentCategoryIndex,
}) => {
  return (
    <div className="categories">
      <ul>
        {CATEGORIES.map((nameCategory, index) => {
          return (
            <li
              key={nameCategory}
              className={currentCategoryIndex === index ? "active" : ""}
              onClick={() => setCurrentCategoryIndex(index)}
            >
              {nameCategory}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
