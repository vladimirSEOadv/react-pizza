import { sortValues } from "../../constants/sortValues";
import { useSelector } from "react-redux";
import qs from "qs";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const useCreateUrlParams = () => {
  const navigate = useNavigate();
  const isMounted = useRef(false);
  const { sortIndex, categoryIndex, searchQuery } = useSelector(
    (state) => state.filters
  );

  useEffect(() => {
    if (isMounted.current) {
      const queryString =
        searchQuery === "" || searchQuery === undefined
          ? qs.stringify({
              category: categoryIndex || "*",
              orderBy: sortValues[sortIndex].orderBy,
              order: sortValues[sortIndex].order,
            })
          : qs.stringify({
              search: `${searchQuery}`,
              orderBy: sortValues[sortIndex].orderBy,
              order: sortValues[sortIndex].order,
            });
      navigate(`?${queryString}`);
    } else {
      isMounted.current = true;
    }
  }, [sortIndex, categoryIndex, searchQuery, navigate]);

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
