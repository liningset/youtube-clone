import { useEffect, useState } from "react";

const useFeed = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const params = new URLSearchParams({
          key: import.meta.env.VITE_KEY,
          regionCode: "US",
          chart: "mostPopular",
          part: "snippet,statistics,contentDetails",
          maxResults: 15,
        });
        const res = await fetch(`${BASE_URL}videos?${params}`);
        const data = await res.json();

        console.log(data?.items[0]);
        setIsLoading(false);
        setVideos(data?.items);
      } catch {
        setFailed(true);
      }
    };

    fetchVideos();

    return new AbortController().abort();
  }, []);

  return { videos, isLoading, failed };
};
export default useFeed;
