import { useSearchParams } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentPage } from "../data/appSlice";
import PaginationContext from "../data/PaginationContext";
import { changeType, closeSideBar } from "../data/sideBarSlice";
import CommentsSection from "../components/comments/CommentsSection";
import RelatedVideosSection from "../components/related-videos/RelatedVideosSection";
import WatchPageContextProvider from "../components/providers/WatchPageContextProvider";
import WatchSection from "../components/watch-video/WatchSection";
import usePaginatedVideos from "../hooks/usePaginatedVideos";

const params = {
  regionCode: "US",
  chart: "mostPopular",
  part: "snippet,statistics,contentDetails",
  maxResults: 50,
};

const WatchPage = ({ query }) => {
  const dispatch = useDispatch();

  const { pagination, fetchNext } = usePaginatedVideos("videos", params, {
    title: "All",
  });

  useEffect(() => {
    dispatch(updateCurrentPage());
    dispatch(changeType("modal"));
    dispatch(closeSideBar({ asUser: true }));
  }, []);

  return (
    <div className="w-full [overflow-anchor:none] max-w-350 pt-1 mb-4 mx-auto lg:px-4 grid gap-8 lg:gap-4 grid-rows-[auto_1fr] lg:grid-cols-[1fr_350px] [grid-template-areas:'video''related''comments'] lg:[grid-template-areas:'video_related''comments_related']">
      <WatchPageContextProvider query={query}>
        <WatchSection />
        <CommentsSection />
      </WatchPageContextProvider>

      <PaginationContext.Provider value={{ pagination, fetchNext }}>
        <RelatedVideosSection />
      </PaginationContext.Provider>
    </div>
  );
};

const WatchRoute = () => {
  const query = useSearchParams()[0].get("v");
  return <WatchPage query={query} key={query} />;
};

export default WatchRoute;
