import { useEffect } from "react";
import { BaseUrl } from "../../constants/baseUrl";
import { fetchPizzas } from "../../redux/slices/pizzasSlice";
import { useDispatch } from "react-redux";

export const useGetMyPizzas = (urlParams) => {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(fetchPizzas(BaseUrl + urlParams));
    } catch (error) {
      console.log("error in useGetMyPizzas hook", error);
    }
  }, [urlParams, dispatch]);
};
