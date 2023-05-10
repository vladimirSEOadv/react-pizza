import { SORTVALUES } from "../constants/sortvalues";
import { useSelector } from "react-redux";
import { categoryIndex, sortIndex } from "../redux/slices/filtersSlice";

export const useCreateUrlParams = () => {
  const currentSortIndex = useSelector(sortIndex);
  const currentCategoryIndex = useSelector(categoryIndex);
  const category = `category=${currentCategoryIndex || "*"}`;
  const orderBy = `&orderBy=${SORTVALUES[currentSortIndex].sort}`;
  const order = `&order=${SORTVALUES[currentSortIndex].order}`;
  return `?${category}${orderBy}${order}`;
};
