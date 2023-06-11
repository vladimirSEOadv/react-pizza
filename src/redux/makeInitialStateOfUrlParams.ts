import qs from "qs";
import { sortValues } from "../constants/sortValues";
import { FiltersSliceTypes } from "./slices/filtersSlice";

type SortVariantType = {
  id: number;
  name: string;
  orderBy: string;
  order: string;
};

const createSortIdx = (
  sortVariants: SortVariantType[],
  order: string,
  orderBy: string
): number => {
  const findSort = sortVariants.filter((sortValue) => {
    return !!(sortValue["order"] === order && sortValue["orderBy"] === orderBy);
  });
  console.log("findSort", findSort);
  return findSort[0]?.id || 0;
};

export const makeInitialStateOfUrlParams = (location: string) => {
  const params = qs.parse(location.substring(1));
  console.log("params", params);
  const { category, orderBy, order, search } = params;

  const currentCategory = category === "*" || undefined ? 0 : Number(category);
  const currentSortIdx = createSortIdx(
    sortValues,
    order as string,
    orderBy as string
  );
  const currentSearch = search || "";

  return {
    categoryIndex: currentCategory,
    sortIndex: currentSortIdx,
    searchQuery: currentSearch,
  } as FiltersSliceTypes;
};
