import { useEffect, useState } from "react";

const useFetch = (type, params, trigger = 0) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const URLParams = new URLSearchParams(params);
        URLParams.append("key", import.meta.env.VITE_KEY);

        const res = await fetch(`${BASE_URL}${type}?${URLParams}`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          setIsLoading(false);
          setFailed(true);
          throw new Error("response.ok === false");
        }

        const data = await res.json();
        setIsLoading(false);
        setFailed(false);
        setData(data);
      } catch {
        setIsLoading(false);
        setFailed(true);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [trigger]);

  return { data, isLoading, failed };
};
export default useFetch;
