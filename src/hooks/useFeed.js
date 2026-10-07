import { useEffect, useState, useContext } from "react";
import PaginationContext from "../utils/PaginationContext";

const useFeed = () => {
  const { paginatedCount } = useContext(PaginationContext);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const params = new URLSearchParams({
          key: import.meta.env.VITE_KEY,
          regionCode: "US",
          chart: "mostPopular",
          part: "snippet,statistics,contentDetails",
          maxResults: 15,
        });
        if (paginatedCount > 0) {
          const nextPageToken = sessionStorage.getItem("nextPageToken") || "";
          params.append("pageToken", nextPageToken);
        }
        const res = await fetch(`${BASE_URL}videos?${params}`);
        const data = await res.json();
        sessionStorage.setItem("nextPageToken", data?.nextPageToken ?? "done");
        console.log(data?.items[0]);

        setIsLoading(false);
        setVideos(data?.items);
      } catch {
        setIsLoading(false);
        setFailed(true);
      }
    };

    fetchVideos();

    return new AbortController().abort();
  }, [paginatedCount]);

  return { videos, isLoading, failed };
};
export default useFeed;
