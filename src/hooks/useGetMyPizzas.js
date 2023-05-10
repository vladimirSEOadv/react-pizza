import { useEffect, useState } from "react";
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

  async function fetchData(url) {
    try {
      const response = await axios.get(url);
      const { status, statusText } = response;
      if (status !== 200) throw new Error(`${status} ${statusText}`);
      setPizzas(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    preparingForANewRequest();
    fetchData(BaseUrl + urlParams);
  }, [BaseUrl, urlParams]);

  return [pizzas, loading, error];
};
