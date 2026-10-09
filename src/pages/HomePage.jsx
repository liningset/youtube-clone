import CategoryKeywords from "../components/CategoryKeywords";
import VideoCardsList from "../components/VideoCardsList";
import LoadingWheel from "../components/LoadingWheel";
import usePagination from "../hooks/usePagination";
import PaginationContext from "../utils/PaginationContext";

const HomePage = () => {
  const { data, nextPage, fetchNextPage } = usePagination();

  return (
    <PaginationContext.Provider value={{ data, nextPage, fetchNextPage }}>
      <main className="w-full min-w-0 max-w-350 mx-auto flex flex-col gap-4 mb-10">
        <CategoryKeywords />
        <VideoCardsList />
        {nextPage && <LoadingWheel />}
      </main>
    </PaginationContext.Provider>
  );
};
export default HomePage;
