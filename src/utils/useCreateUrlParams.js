import { SortValues } from "../constants/sortValues";
import { useSelector } from "react-redux";

export const useCreateUrlParams = () => {
  const { sortIndex, categoryIndex } = useSelector((state) => state.filters);
  const category = `category=${categoryIndex || "*"}`;
  const orderBy = `&orderBy=${SortValues[sortIndex].sort}`;
  const order = `&order=${SortValues[sortIndex].order}`;
  return `?${category}${orderBy}${order}`;
};
