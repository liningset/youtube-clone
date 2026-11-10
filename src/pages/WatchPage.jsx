import { useSearchParams } from "react-router";
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentPage } from "../data/appSlice";
import PaginationContextProvider from "../components/providers/PaginationContextProvider";
import { changeType, closeSideBar } from "../data/sideBarSlice";
import CommentsSection from "../components/comments/CommentsSection";
import RelatedVideosSection from "../components/related-videos/RelatedVideosSection";
import WatchPageContextProvider from "../components/providers/WatchPageContextProvider";
import WatchPageContext from "../data/WatchPageContext";
import LiveChatPanel from "../components/live-chat/LiveChatPanel";
import VideoPlayer from "../components/watch-video/VideoPlayer";
import VideoDetails from "../components/watch-video/VideoDetails";
import LiveChatContextProvider from "../components/providers/LiveChatContextProvider";

const params = {
  regionCode: "US",
  chart: "mostPopular",
  part: "snippet,statistics,contentDetails",
  maxResults: 50,
};

const WatchPage = () => {
  const dispatch = useDispatch();
  const { isLive, dataExists } = useContext(WatchPageContext);

  useEffect(() => {
    dispatch(updateCurrentPage());
    dispatch(changeType("modal"));
    dispatch(closeSideBar({ asUser: true }));
  }, [dispatch]);

  return (
    <main
      className={`mx-auto mb-4 grid h-full w-full max-w-350 grid-cols-1 grid-rows-[auto_auto_1fr] gap-8 pt-1 ${isLive ? "[grid-template-areas:'video''livechat''videodetails''related'] lg:grid-cols-[1fr_375px] lg:[grid-template-areas:'video_livechat''videodetails_livechat''videodetails_related']" : "[grid-template-areas:'video''videodetails''related''comments'] lg:grid-cols-[1fr_350px] lg:[grid-template-areas:'video_related''videodetails_related''comments_related']"} [overflow-anchor:none] lg:gap-4 lg:px-4`}
    >
      <VideoPlayer />
      {dataExists && <VideoDetails />}

      {isLive ? (
        <LiveChatContextProvider>
          <LiveChatPanel />
        </LiveChatContextProvider>
      ) : (
        <CommentsSection />
      )}

      <PaginationContextProvider params={params}>
        <RelatedVideosSection />
      </PaginationContextProvider>
    </main>
  );
};

const WatchRoute = () => {
  const query = useSearchParams()[0].get("v");
  return (
    <WatchPageContextProvider query={query} key={query}>
      <WatchPage />
    </WatchPageContextProvider>
  );
};

export default WatchRoute;
