import { useContext, useEffect } from "react";
import CategoryKeywords from "../components/home-feed/CategoryKeywords";
import VideoCardsList from "../components/home-feed/VideoCardsList";
import { useDispatch } from "react-redux";
import { updateCurrentPage } from "../data/appSlice";
import PaginationContextProvider from "../components/providers/PaginationContextProvider";
import LoadingMoreVideos from "../components/home-feed/LoadingMoreVideos";
import PaginationContext from "../data/PaginationContext";
import renderErrors from "../utils/renderErrors";

const params = {
  regionCode: "US",
  chart: "mostPopular",
  part: "snippet,statistics,contentDetails,liveStreamingDetails",
  maxResults: 15,
};

const HomePage = () => {
  const dispatch = useDispatch();
  const { pagination } = useContext(PaginationContext);
  const hasNextPage = Boolean(pagination.nextPage);

  useEffect(() => {
    document.title = "YouTube-clone";
    dispatch(updateCurrentPage());
  }, []);

  return (
    <main className="w-full min-w-0 max-w-350 mx-auto flex flex-col gap-4 mb-10">
      <CategoryKeywords />
      {pagination.status.videos.includes("error") ? (
        renderErrors(pagination.status.videos)
      ) : (
        <>
          <VideoCardsList />
          {hasNextPage && <LoadingMoreVideos />}
        </>
      )}
    </main>
  );
};

const HomeRoute = () => {
  return (
    <PaginationContextProvider params={params}>
      <HomePage />
    </PaginationContextProvider>
  );
};
export default HomeRoute;
