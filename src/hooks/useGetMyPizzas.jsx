import { useEffect, useState } from "react";

export const useGetMyPizzas = (link) => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(link)
      .then((data) => {
        const { ok, status, statusText } = data;
        if (!ok) throw new Error(`${status} ${statusText}`);
        return data.json();
      })
      .then((json) => {
        setPizzas(json);
      })
      .catch((err) => {
        console.log(err, "in useGetMyPizzas hook");
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [link]);

  return [pizzas, loading, error];
};
