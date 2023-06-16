import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import qs from "qs";
import { sortValues } from "../../constants/sortValues";

type usePushParamsToUrlTypes = (
  sortIndex: number,
  categoryIndex: number,
  searchQuery: string | undefined
) => void;

export const usePushParamsToUrl: usePushParamsToUrlTypes = (
  sortIndex,
  categoryIndex,
  searchQuery
) => {
  const navigate = useNavigate();
  const isMounted = useRef(false);

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
};
