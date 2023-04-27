import React, { useState } from "react";
import SortSvg from "./SortSvg";

export const Sort = ({
  currentSortIndex,
  setCurrentSortIndex,
  sortVariants,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="sort" onClick={() => setOpen(!open)}>
      <div className="sort__label">
        <SortSvg open={open} />
        <b>Сортировка по:</b>
        <span>{sortVariants[currentSortIndex]}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortVariants.map((variant, index) => (
              <li
                key={variant}
                onClick={() => setCurrentSortIndex(index)}
                className={
                  sortVariants.indexOf(variant) === currentSortIndex
                    ? "active"
                    : ""
                }
              >
                {variant}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
