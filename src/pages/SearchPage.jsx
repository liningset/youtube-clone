import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router";
import { updateCurrentPage } from "../utils/appSlice";
import usePaginatedList from "../hooks/usePaginatedList";
import PaginationContext from "../utils/PaginationContext";
import VideoCardsList from "../components/VideoCardsList";
import usePaginatedSearch from "../hooks/usePaginatedSearch";

const SearchPage = () => {
  const query = useSearchParams()[0].get("q");
  const dispatch = useDispatch();

  const { searchState } = usePaginatedSearch({
    q: query,
    type: "video",
    part: "snippet",
    maxResults: 50,
  });
  // const { pagination, fetchNext } = usePaginatedList(
  //   "videos",
  //   {
  //     regionCode: "US",
  //     chart: "mostPopular",
  //     part: "snippet,statistics,contentDetails",
  //     maxResults: 15,
  //   },
  //   { title: "All" },
  // );

  useEffect(() => {
    document.title = query + " - YouTube-clone";
    dispatch(updateCurrentPage());
  }, []);

  // useEffect(() => {
  //   fetchNext();
  // }, searchState.videos);

  return (
    <PaginationContext.Provider value={{ searchState }}>
      <main className="w-full min-w-0 max-w-350 mx-auto flex flex-col gap-4 mb-10">
        <VideoCardsList />
      </main>
    </PaginationContext.Provider>
  );
};

export default SearchPage;
