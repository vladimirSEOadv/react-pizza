import React, { useState } from "react";

const CATEGORIES = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

export const Categories = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="categories">
      <ul>
        {CATEGORIES.map((nameCategory, index) => {
          return (
            <li
              key={index}
              className={activeIndex === index ? "active" : ""}
              onClick={() => setActiveIndex(index)}
            >
              {nameCategory}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
