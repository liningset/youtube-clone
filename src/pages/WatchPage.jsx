import { useSearchParams } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentPage } from "../utils/appSlice";
import useFetch from "../hooks/useFetch";
import usePaginatedList from "../hooks/usePaginatedList";
import PaginationContext from "../utils/PaginationContext";
import { changeType, closeSideBar } from "../utils/sideBarSlice";
import VideoDescription from "../components/VideoDescription";
import CommentsSection from "../components/CommentsSection";
import RelatedVideosSection from "../components/RelatedVideosSection";
import WatchPageContext from "../utils/WatchPageContext";

const params = {
  regionCode: "US",
  chart: "mostPopular",
  part: "snippet,statistics,contentDetails",
  maxResults: 50,
};

const WatchPage = ({ query }) => {
  const dispatch = useDispatch();

  const { data } = useFetch("videos", {
    id: query,
    part: "snippet,contentDetails,statistics",
  });

  const { pagination, fetchNext } = usePaginatedList("videos", params, {
    title: "All",
  });

  useEffect(() => {
    if (!data) return;
    document.title = data?.items[0]?.snippet?.title + " - YouTube-clone";
  }, [data]);

  useEffect(() => {
    dispatch(updateCurrentPage());
    dispatch(changeType("modal"));
    dispatch(closeSideBar({ asUser: true }));
  }, []);

  return (
    <div className="w-full [overflow-anchor:none] max-w-350 pt-1 mb-4 mx-auto lg:px-4 grid gap-8 lg:gap-4 grid-rows-[auto_1fr] lg:grid-cols-[1fr_350px] [grid-template-areas:'video''related''comments'] lg:[grid-template-areas:'video_related''comments_related']">
      <section className="[grid-area:video] w-full">
        <div className="aspect-video w-full lg:rounded-xl lg:overflow-hidden bg-grey-a8 relative">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${query}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        {data?.items && <VideoDescription video={data.items[0]} />}
      </section>
      <WatchPageContext.Provider value={query}>
        <CommentsSection count={data?.items[0]?.statistics?.commentCount} />
      </WatchPageContext.Provider>

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
