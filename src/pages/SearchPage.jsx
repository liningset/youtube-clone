import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router";
import { updateCurrentPage } from "../data/appSlice";
import SearchResultsList, {
  SearchResultsListShimmer,
} from "../components/search-results/SearchResultsList";
import YoutubeIcon from "../components/common/YoutubeIcon";
import { closeSideBar } from "../data/sideBarSlice";
import Error from "../components/common/Error";
import SearchPageContext from "../data/SearchPageContext";
import SearchPageContextProvider from "../components/providers/SearchPageContextProvider";

const SearchPage = () => {
  const { searchState, fetchNextSearch, query } = useContext(SearchPageContext);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = query + " - YouTube-clone";
    dispatch(updateCurrentPage());
    dispatch(closeSideBar({ asUser: true }));
  }, []);

  if (searchState.nextPage == null && searchState.videos.length === 0)
    return <Error message={`No results for:\n${query}`} />;

  return (
    <main className="w-full min-w-0 max-w-350 mx-auto flex flex-col gap-4 mb-10">
      <SearchResultsList />
      {searchState.status === "pending" && (
        <SearchResultsListShimmer count={6} />
      )}
      {searchState.nextPage && (
        <button
          onClick={() => fetchNextSearch()}
          className="mx-auto p-2 rounded-full border-bg-primary hover:bg-grey-d8 hover:border-grey-d8 active:bg-grey-a8 active:border-grey-a8 transition-button cursor-pointer"
        >
          <YoutubeIcon icon="showMore" />
        </button>
      )}
    </main>
  );
};

const SearchRoute = () => {
  const query = useSearchParams()[0].get("q");
  return (
    <SearchPageContextProvider key={query} query={query}>
      <SearchPage />
    </SearchPageContextProvider>
  );
};

export default SearchRoute;
