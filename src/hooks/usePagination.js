import { useState, useEffect } from "react";

const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(null);
  const [inProgress, setInProgress] = useState(false);
  const [list, setList] = useState([]);

  const { data, isLoading, failed } = useFetch("videos", {
    polling: true,
    dependOn: currentPage,
  });

  useEffect(() => {
    setList((prev) => [...prev, ...data]);
  }, [data]);

  return { data: list, currentPage, inProgress, status: { isLoading, failed } };
};
export default usePagination;
