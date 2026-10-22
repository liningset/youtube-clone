import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router";
import { updateCurrentPage } from "../utils/appSlice";
import usePaginatedList from "../hooks/usePaginatedList";
import PaginationContext from "../utils/PaginationContext";
import SearchResultsList, {
  SearchResultsListShimmer,
} from "../components/SearchResultsList";
import usePaginatedSearch from "../hooks/usePaginatedSearch";
import YoutubeIcon from "../components/YoutubeIcon";

const SearchPage = ({ query }) => {
  const dispatch = useDispatch();

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
      part: "snippet,statistics,contentDetails",
      maxResults: 50,
    };
  }, [searchState.videos]);

  const { pagination, fetchNext } = usePaginatedList("videos", params, {
    title: "All",
  });

  useEffect(() => {
    document.title = query + " - YouTube-clone";
    dispatch(updateCurrentPage());
  }, []);

  useEffect(() => {
    if (searchState.videos.length === 0) return;
    fetchNext();
  }, [searchState.videos]);

  return (
    <PaginationContext.Provider value={{ pagination, searchState }}>
      <main className="w-full min-w-0 max-w-350 mx-auto flex flex-col gap-4 mb-10">
        <SearchResultsList />
        {searchState.status === "pending" && (
          <SearchResultsListShimmer count={6} />
        )}
        <button
          onClick={() => fetchNextSearch()}
          className="mx-auto p-2 rounded-full border-bg-primary hover:bg-grey-d8 hover:border-grey-d8 active:bg-grey-a8 active:border-grey-a8 transition-button cursor-pointer"
        >
          <YoutubeIcon icon="showMore" />
        </button>
      </main>
    </PaginationContext.Provider>
  );
};

const SearchRoute = () => {
  const query = useSearchParams()[0].get("q");
  return <SearchPage query={query} key={query} />;
};

export default SearchRoute;
