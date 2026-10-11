import { useState } from "react";
import CategoryKeywords from "../components/CategoryKeywords";
import VideoCardsList from "../components/VideoCardsList";
import LoadingWheel from "../components/LoadingWheel";
import PaginationContext from "../utils/PaginationContext";
import usePaginatedList from "../hooks/usePaginatedList";

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState({
    id: "0",
    title: "All",
  });
  const { pagination, fetchNext, switchInState } = usePaginatedList(
    "videos",
    activeCategory,
  );

  const changeCategory = (newData) => {
    setActiveCategory(newData);
    switchInState();
  };

  return (
    <PaginationContext.Provider value={{ pagination, fetchNext }}>
      <main className="w-full min-w-0 max-w-350 mx-auto flex flex-col gap-4 mb-10">
        <CategoryKeywords
          active={activeCategory}
          changeCategory={changeCategory}
        />
        <VideoCardsList />
        {pagination.nextPage && <LoadingWheel />}
      </main>
    </PaginationContext.Provider>
  );
};
export default HomePage;
