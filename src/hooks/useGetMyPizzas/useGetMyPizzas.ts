import { useEffect } from "react";
import { BaseUrl } from "../../constants/baseUrl";
import { fetchPizzas } from "../../redux/slices/pizzasSlice";
import { useDispatch } from "react-redux";

// Todo попробовать заменить any на более конкретный тип
export const useGetMyPizzas = (urlParams: string) => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    try {
      const url = `${BaseUrl}${urlParams}`;
      dispatch(fetchPizzas(url));
    } catch (error) {
      console.log("error in useGetMyPizzas hook", error);
    }
  }, [urlParams, dispatch]);
};
