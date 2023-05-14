import React, { useState } from "react";
import SortSvg from "./SortSvg";
import { useDispatch, useSelector } from "react-redux";
import { setSortIndex, sortIndex } from "../../redux/slices/filtersSlice";
import { sortValues } from "../../constants/sortValues";
import { setItemOffset } from "../../redux/slices/paginationSlice";

export const Sort = () => {
  const dispatch = useDispatch();
  const currentSortIndex = useSelector(sortIndex);
  const sortVariants = sortValues.map((obj) => obj.name);
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
                onClick={() => {
                  dispatch(setSortIndex(index));
                  dispatch(setItemOffset(0));
                }}
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
