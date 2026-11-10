import { useEffect, useMemo } from "react";
import SearchPageContext from "../../data/SearchPageContext";
import usePaginatedSearch from "../../hooks/usePaginatedSearch";
import usePaginatedVideos from "../../hooks/usePaginatedVideos";

const SearchPageContextProvider = ({ children, query }) => {
  const { searchState, fetchNextSearch } = usePaginatedSearch({
    q: query,
    type: "video",
    part: "snippet",
    maxResults: 50,
  });

  //this is to make sure that the identity of params stays the same unless only one paramater changes
  const params = useMemo(() => {
    const searchResultIds = searchState.videos.map((v) => v?.id?.videoId);
    const sliced = searchResultIds.slice(-50);
    return {
      id: sliced.join(","),
      part: "snippet,statistics,contentDetails,liveStreamingDetails",
      maxResults: 50,
    };
  }, [searchState.videos]);

  const { pagination, fetchNext } = usePaginatedVideos(params);

  useEffect(() => {
    if (searchState.videos.length === 0) return;
    fetchNext();
  }, [searchState.videos]);

  const values = useMemo(
    () => ({
      searchState,
      fetchNextSearch,
      pagination,
      query,
    }),
    [searchState, fetchNextSearch, pagination, query],
  );

  return (
    <SearchPageContext.Provider value={values}>
      {children}
    </SearchPageContext.Provider>
  );
};

export default SearchPageContextProvider;
