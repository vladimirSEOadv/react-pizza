import React, { useState } from "react";
import SortSvg from "./components/SortSvg";
import { selectSortIndex, setSortIndex } from "../../redux/slices/filtersSlice";
import { sortValues } from "../../constants/sortValues";
import { setItemOffset } from "../../redux/slices/paginationSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";

export const Sort = () => {
  const dispatch = useAppDispatch();
  const currentSortIndex = useAppSelector(selectSortIndex);
  const sortVariants = sortValues.map((obj) => obj.name);
  const [open, setOpen] = useState<boolean>(false);
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
