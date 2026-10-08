import { useEffect, useState } from "react";

const useFetch = (type, config = null, extra = null) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const depenencies = config && config.polling ? [config.dependOn] : [];

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async (obj) => {
      try {
        setIsLoading(true);
        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const params = new URLSearchParams(obj);
        params.append("key", import.meta.env.VITE_KEY);

        const res = await fetch(`${BASE_URL}${type}?${params}`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          setIsLoading(false);
          setFailed(true);
        }
        const data = await res.json();
        setIsLoading(false);
        setData(data?.items);
        console.log(data?.items);
      } catch {
        setIsLoading(false);
        setFailed(true);
      }
    };

    if (type === "videos") {
      fetchData({
        regionCode: "US",
        chart: "mostPopular",
        part: "snippet,statistics,contentDetails",
        maxResults: 15,
      });
    }
    if (type === "videoCategories") {
      fetchData({ regionCode: "US", part: "snippet" });
    }
    if (type === "channels") {
      fetchData({ part: "snippet", id: extra });
    }

    return () => controller.abort();
  }, depenencies);

  return { data, isLoading, failed };
};
export default useFetch;
