import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "../constants/baseUrl";
import { useCreateUrlParams } from "../utils/useCreateUrlParams";

export const useGetMyPizzas = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlParams = useCreateUrlParams();

  function preparingForANewRequest() {
    setPizzas([]);
    setError(null);
    setLoading(true);
  }

  function checkResponseStatus(res) {
    const { status, statusText } = res;
    if (status !== 200) throw new Error(`${status} ${statusText}`);
  }

  const fetchData = useCallback(async (url) => {
    try {
      const response = await axios.get(url);
      checkResponseStatus(response);
      setPizzas(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    preparingForANewRequest();
    fetchData(BaseUrl + urlParams).catch((error) =>
      console.log("error in useGetMyPizzas hook", error)
    );
  }, [urlParams, fetchData]);

  return [pizzas, loading, error];
};
