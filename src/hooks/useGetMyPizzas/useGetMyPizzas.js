import { useEffect } from "react";
import { BaseUrl } from "../../constants/baseUrl";
import { useCreateUrlParams } from "./useCreateUrlParams";
import { fetchPizzas } from "../../redux/slices/pizzasSlice";
import { useDispatch } from "react-redux";

export const useGetMyPizzas = () => {
  const dispatch = useDispatch();

  const urlParams = useCreateUrlParams();

  useEffect(() => {
    try {
      dispatch(fetchPizzas(BaseUrl + urlParams));
    } catch (error) {
      console.log("error in useGetMyPizzas hook", error);
    }
  }, [urlParams, dispatch]);
};
