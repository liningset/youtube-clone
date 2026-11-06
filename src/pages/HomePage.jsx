import { useEffect } from "react";
import CategoryKeywords from "../components/home-feed/CategoryKeywords";
import VideoCardsList from "../components/home-feed/VideoCardsList";
import LoadingWheel from "../components/common/LoadingWheel";
import { useDispatch } from "react-redux";
import { updateCurrentPage } from "../data/appSlice";
import PaginationContextProvider from "../components/providers/PaginationContextProvider";

const params = {
  regionCode: "US",
  chart: "mostPopular",
  part: "snippet,statistics,contentDetails",
  maxResults: 15,
};

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "YouTube-clone";
    dispatch(updateCurrentPage());
  }, []);

  return (
    <PaginationContextProvider params={params}>
      <main className="w-full min-w-0 max-w-350 mx-auto flex flex-col gap-4 mb-10">
        <CategoryKeywords />
        <VideoCardsList />
        <LoadingWheel />
      </main>
    </PaginationContextProvider>
  );
};
export default HomePage;

//condition for LoadingWheel:
//pagination.nextPage !== 0 && pagination.nextPage !== null
