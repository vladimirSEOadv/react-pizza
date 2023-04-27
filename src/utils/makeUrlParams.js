import { SORTVALUES } from "../constants/sortvalues";
// const [searchValue] = useContext(SearchContext);

export const makeUrlParams = (currentCategoryIndex, currentSortIndex) => {
  const category = `category=${currentCategoryIndex || "*"}`;
  const orderBy = `&orderBy=${SORTVALUES[currentSortIndex].sort}`;
  const order = `&order=${SORTVALUES[currentSortIndex].order}`;
  // const search = searchValue ? `search=${searchValue}` : "";
  return `?${category}${orderBy}${order}`;
};
