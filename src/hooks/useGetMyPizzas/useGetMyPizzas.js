import { useCallback, useEffect } from "react";
import { BaseUrl } from "../../constants/baseUrl";
import { useCreateUrlParams } from "./useCreateUrlParams";
import { fetchPizzas } from "../../redux/slices/pizzasSlice";
import { useDispatch } from "react-redux";

export const useGetMyPizzas = () => {
  const dispatch = useDispatch();

  const urlParams = useCreateUrlParams();

  const fetchData = useCallback(
    async (url) => {
      dispatch(fetchPizzas(url));
    },
    [dispatch]
  );

  useEffect(() => {
    fetchData(BaseUrl + urlParams).catch((error) =>
      console.log("error in useGetMyPizzas hook", error)
    );
  }, [urlParams, fetchData]);
};
