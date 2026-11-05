import { useEffect, useState } from "react";
import CategoryKeywords from "../components/home-feed/CategoryKeywords";
import VideoCardsList from "../components/home-feed/VideoCardsList";
import LoadingWheel from "../components/common/LoadingWheel";
import PaginationContext from "../data/PaginationContext";
import usePaginatedVideos from "../hooks/usePaginatedVideos";
import { useDispatch } from "react-redux";
import { updateCurrentPage } from "../data/appSlice";

const params = {
  regionCode: "US",
  chart: "mostPopular",
  part: "snippet,statistics,contentDetails",
  maxResults: 15,
};

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState({
    id: "0",
    title: "All",
  });

  const { pagination, fetchNext, switchInState } = usePaginatedVideos(
    "videos",
    params,
    activeCategory,
  );

  const dispatch = useDispatch();

  const changeCategory = (newData) => {
    setActiveCategory(newData);
    switchInState();
  };

  useEffect(() => {
    document.title = "YouTube-clone";
    dispatch(updateCurrentPage());
  }, []);

  return (
    <PaginationContext.Provider value={{ pagination, fetchNext }}>
      <main className="w-full min-w-0 max-w-350 mx-auto flex flex-col gap-4 mb-10">
        <CategoryKeywords
          active={activeCategory}
          changeCategory={changeCategory}
        />
        <VideoCardsList />
        {pagination.nextPage !== 0 && pagination.nextPage !== null && (
          <LoadingWheel />
        )}
      </main>
    </PaginationContext.Provider>
  );
};
export default HomePage;
