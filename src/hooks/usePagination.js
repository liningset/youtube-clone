import { useState, useEffect } from "react";

const usePagination = () => {
  const [nextPage, setNextPage] = useState(null);
  const [inProgress, setInProgress] = useState(false);
  const [list, setList] = useState([]);

  const { data, isLoading, failed } = useFetch(
    "videos",
    {
      polling: true,
      dependOn: inProgress,
    },
    null,
    setNextPage,
  );

  useEffect(() => {
    setList((prev) => [...prev, ...data]);
    setInProgress(false);
  }, [data]);

  return { data: list, nextPage, inProgress, status: { isLoading, failed } };
};
export default usePagination;
