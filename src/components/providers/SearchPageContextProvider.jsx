import { useEffect, useMemo } from "react";
import SearchPageContext from "../../data/SearchPageContext";
import usePaginatedSearch from "../../hooks/usePaginatedSearch";
import usePaginatedVideos from "../../hooks/usePaginatedVideos";

const SearchPageContextProvider = ({ children, params }) => {
  const { searchState, fetchNextSearch } = usePaginatedSearch(params);

  //this is to make sure that the identity of videosParams stays the same unless only one paramater changes
  const videosParams = useMemo(() => {
    const searchResultIds = searchState.videos.map((v) => v?.id?.videoId);
    const sliced = searchResultIds.slice(-50);
    return {
      id: sliced.join(","),
      part: "snippet,statistics,contentDetails,liveStreamingDetails",
      maxResults: 50,
    };
  }, [searchState.videos]);

  const { pagination, fetchNext } = usePaginatedVideos(videosParams);

  useEffect(() => {
    if (searchState.videos.length === 0) return;
    fetchNext();
  }, [searchState.videos]);

  const values = useMemo(
    () => ({
      searchState,
      fetchNextSearch,
      pagination,
    }),
    [searchState, fetchNextSearch, pagination],
  );

  return (
    <SearchPageContext.Provider value={values}>
      {children}
    </SearchPageContext.Provider>
  );
};

export default SearchPageContextProvider;
