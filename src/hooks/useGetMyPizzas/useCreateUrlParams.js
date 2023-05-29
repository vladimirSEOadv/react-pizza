import { sortValues } from "../../constants/sortValues";
import { useSelector } from "react-redux";
import { usePushParamsToUrl } from "./usePushParamsToUrl";

export const useCreateUrlParams = () => {
  const { sortIndex, categoryIndex, searchQuery } = useSelector(
    (state) => state.filters
  );

  usePushParamsToUrl(sortIndex, categoryIndex, searchQuery);

  const category = `category=${categoryIndex || "*"}`;
  const search = `&search=${searchQuery}`;
  const currentOrderBy = `&orderBy=${sortValues[sortIndex].orderBy}`;
  const currentOrder = `&order=${sortValues[sortIndex].order}`;
  if (searchQuery === "") {
    return `?${category}${currentOrderBy}${currentOrder}`;
  } else {
    return `?${search}*${currentOrderBy}${currentOrder}`;
  }
};
