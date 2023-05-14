import { SortValues } from "../constants/sortValues";
import { useSelector } from "react-redux";

export const useCreateUrlParams = () => {
  const { sortIndex, categoryIndex, searchQuery } = useSelector(
    (state) => state.filters
  );
  const category = `category=${categoryIndex || "*"}`;
  const search = `&search=${searchQuery}*`;
  const orderBy = `&orderBy=${SortValues[sortIndex].sort}`;
  const order = `&order=${SortValues[sortIndex].order}`;
  if (searchQuery === "") {
    return `?${category}${orderBy}${order}`;
  } else {
    return `?${search}${orderBy}${order}`;
  }
};
