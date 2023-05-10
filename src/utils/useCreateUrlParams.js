import { SortValues } from "../constants/sortValues";
import { useSelector } from "react-redux";
import { categoryIndex, sortIndex } from "../redux/slices/filtersSlice";

export const useCreateUrlParams = () => {
  const currentSortIndex = useSelector(sortIndex);
  const currentCategoryIndex = useSelector(categoryIndex);
  const category = `category=${currentCategoryIndex || "*"}`;
  const orderBy = `&orderBy=${SortValues[currentSortIndex].sort}`;
  const order = `&order=${SortValues[currentSortIndex].order}`;
  return `?${category}${orderBy}${order}`;
};
