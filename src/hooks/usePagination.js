import { useState, useEffect } from "react";
import useFetch from "./useFetch";

const usePagination = () => {
  const [nextPage, setNextPage] = useState(0);
  const [trigger, setTrigger] = useState(0);
  const [list, setList] = useState([]);

  const params = {
    regionCode: "US",
    chart: "mostPopular",
    part: "snippet,statistics,contentDetails",
    maxResults: 15,
  };
  if (nextPage) params.pageToken = nextPage;

  const { data } = useFetch("videos", params, trigger);

  useEffect(() => {
    if (!data) return;

    const updateList = () => {
      setList((prev) => [...prev, ...data.items]);
      setNextPage(data?.nextPageToken ?? null);
    };

    updateList();
  }, [data]);

  return {
    data: list,
    nextPage,
    fetchNextPage: () => setTrigger((prev) => prev + 1),
  };
};
export default usePagination;
