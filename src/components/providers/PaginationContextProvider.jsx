import { useMemo } from "react";
import PaginationContext from "../../data/PaginationContext";
import usePaginatedVideos from "../../hooks/usePaginatedVideos";

const PaginationContextProvider = ({ children, params }) => {
  const { pagination, fetchNext, changeCategory } = usePaginatedVideos(params);

  const values = useMemo(
    () => ({
      pagination,
      fetchNext,
      changeCategory,
    }),
    [pagination, fetchNext, changeCategory],
  );

  return (
    <PaginationContext.Provider value={values}>
      {children}
    </PaginationContext.Provider>
  );
};

export default PaginationContextProvider;
