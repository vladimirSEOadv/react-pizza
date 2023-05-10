import React, { useState } from "react";
import SortSvg from "./SortSvg";
import { useDispatch, useSelector } from "react-redux";
import { setSortIndex, sortIndex } from "../../redux/slices/filtersSlice";

export const Sort = ({ sortVariants }) => {
  const dispatch = useDispatch();
  const currentSortIndex = useSelector(sortIndex);

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
                onClick={() => dispatch(setSortIndex(index))}
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
