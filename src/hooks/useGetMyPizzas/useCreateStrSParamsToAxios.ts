import { sortValues } from "../../constants/sortValues";

export const useCreateStrSParamsToAxios = (
  sortIndex: number,
  categoryIndex: number | string,
  searchQuery: string
): string => {
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
