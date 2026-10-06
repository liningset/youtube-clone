import { useEffect, useState } from "react";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const params = new URLSearchParams({
          part: "snippet",
          key: import.meta.env.VITE_KEY,
          regionCode: "US",
        });
        const res = await fetch(BASE_URL + "videoCategories?" + params);
        const data = await res.json();
        setCategories(
          data.items.map((obj) => ({
            id: obj?.id,
            title: obj?.snippet?.title,
          })),
        );
        setIsLoading(false);
      } catch {
        setFailed(true);
      }
    };
    fetchKeywords();
    return new AbortController().abort();
  }, []);
  return { categories, isLoading, failed };
};
export default useCategories;
