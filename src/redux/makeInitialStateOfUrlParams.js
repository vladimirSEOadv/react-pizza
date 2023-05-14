import qs from "qs";
import { sortValues } from "../constants/sortValues";

const createSortIdx = (SortValues, order, orderBy) => {
  const findSort = SortValues.filter((sortValue) => {
    return !!(sortValue["order"] === order && sortValue["orderBy"] === orderBy);
  });
  return findSort[0]?.id || 0;
};

export const makeInitialStateOfUrlParams = (location) => {
  const params = qs.parse(location.substring(1));
  const { category, orderBy, order, search } = params;
  const currentSearch = search || "";
  const currentCategory = category === "*" || undefined ? 0 : Number(category);
  const currentSortIdx = createSortIdx(sortValues, order, orderBy);

  return {
    categoryIndex: currentCategory,
    sortIndex: currentSortIdx,
    searchQuery: currentSearch,
  };
};
