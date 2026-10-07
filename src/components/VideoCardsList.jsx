import VideoCard, { VideoCardShimmer } from "./VideoCard";
import useFeed from "../hooks/useFeed";
import useChannelAvatars from "../hooks/useChannelAvatars";
import { useEffect, useState, useContext } from "react";
import PaginationContext from "../utils/PaginationContext";

export const VideoCardsListShimmer = ({ count }) => {
  return (
    <ul className="grid px-5 items-start sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }, (_, i) => (
        <VideoCardShimmer key={i} />
      ))}
    </ul>
  );
};

const VideoCardsList = () => {
  const { paginatedCount, paginationInProgress, setPaginationInProgress } =
    useContext(PaginationContext);

  const { videos, isLoading } = useFeed();
  const [homeFeed, setHomeFeed] = useState(videos);
  const { channels } = useChannelAvatars(videos);

  useEffect(() => {
    if (paginationInProgress) {
      setHomeFeed((prev) => [...prev, ...videos]);
      setPaginationInProgress(false);
    }
  }, [videos]);

  // if (paginatedCount === 0) return <VideoCardsListShimmer count={9} />;

  return isLoading && paginatedCount === 0 ? (
    <VideoCardsListShimmer count={9} />
  ) : (
    <ul className="grid px-5 items-start sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {homeFeed.map((video) => {
        const channel = channels.find(
          (channel) => channel?.id === video?.snippet?.channelId,
        );

        return <VideoCard key={video?.id} data={video} channelData={channel} />;
      })}
    </ul>
  );
};
export default VideoCardsList;
