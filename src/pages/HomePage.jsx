import { useState } from "react";
import CategoryKeywords from "../components/CategoryKeywords";
import VideoCardsList from "../components/VideoCardsList";
import LoadingWheel from "../components/LoadingWheel";
import usePagination from "../hooks/usePagination";
import PaginationContext from "../utils/PaginationContext";

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState({
    id: "0",
    title: "All",
  });
  const { data, nextPage, fetchNextPage } = usePagination(activeCategory);

  return (
    <PaginationContext.Provider value={{ data, nextPage, fetchNextPage }}>
      <main className="w-full min-w-0 max-w-350 mx-auto flex flex-col gap-4 mb-10">
        <CategoryKeywords
          active={activeCategory}
          changeCategory={setActiveCategory}
        />
        <VideoCardsList />
        {nextPage && <LoadingWheel />}
      </main>
    </PaginationContext.Provider>
  );
};
export default HomePage;
