import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router";
import { updateCurrentPage } from "../utils/appSlice";
import usePaginatedList from "../hooks/usePaginatedList";
import PaginationContext from "../utils/PaginationContext";
import VideoCardsList from "../components/VideoCardsList";

const SearchPage = () => {
  const query = useSearchParams()[0].get("q");
  const dispatch = useDispatch();

  const { pagination } = usePaginatedList(
    "search",
    { q: query, part: "snippet" },
    { title: "All" },
  );

  useEffect(() => {
    document.title = query + " - YouTube-clone";
    dispatch(updateCurrentPage());
  }, []);

  return (
    <PaginationContext.Provider value={{ pagination }}>
      <main className="w-full min-w-0 max-w-350 mx-auto flex flex-col gap-4 mb-10">
        <VideoCardsList />
      </main>
    </PaginationContext.Provider>
  );
};

export default SearchPage;
