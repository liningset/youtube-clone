import VideoCard, { VideoCardShimmer } from "../home-feed/VideoCard";
import { useContext } from "react";
import SearchPageContext from "../../data/SearchPageContext";
import WatchPageContext from "../../data/WatchPageContext";

export const RelatedVideoCardsListShimmer = ({ count }) => {
  return (
    <ul
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-2 items-start`}
    >
      {Array.from({ length: count }, (_, i) => (
        <VideoCardShimmer key={i} />
      ))}
    </ul>
  );
};

const RelatedVideoCardsList = ({ videos }) => {
  const { pagination } = useContext(SearchPageContext);
  const { videos: videosExtra, channels } = pagination.data;
  const { watchVideo } = useContext(WatchPageContext);

  if (pagination.nextPage === 0)
    return <RelatedVideoCardsListShimmer count={9} />;

  return (
    <ul className="grid items-start grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 mb-4 lg:mb-0 w-full gap-4 lg:gap-2">
      {videos.map((video) => {
        const channel = channels.find(
          (channel) => channel?.id === video?.snippet?.channelId,
        );
        const videoExtra = videosExtra.find((v) => v?.id === video.id.videoId);

        //this prevents the main video from appearing again as a related video
        if (watchVideo.id === video.id.videoId) return null;

        return (
          <VideoCard
            key={video.id.videoId}
            data={{
              ...video,
              statistics: videoExtra?.statistics,
              contentDetails: videoExtra?.contentDetails,
              liveStreamingDetails: videoExtra?.liveStreamingDetails,
            }}
            channelData={channel}
          />
        );
      })}
    </ul>
  );
};

export default RelatedVideoCardsList;
