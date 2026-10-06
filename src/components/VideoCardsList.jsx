import VideoCard, { VideoCardShimmer } from "./VideoCard";
import useFeed from "../hooks/useFeed";
import useChannelAvatars from "../hooks/useChannelAvatars";

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
  const { videos, isLoading } = useFeed();
  const { channels } = useChannelAvatars(videos);

  return isLoading ? (
    <VideoCardsListShimmer count={9} />
  ) : (
    <ul className="grid px-5 items-start sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {videos.map((video) => {
        const channel = channels.find(
          (channel) => channel?.id === video?.snippet?.channelId,
        );

        return <VideoCard key={video?.id} data={video} channelData={channel} />;
      })}
    </ul>
  );
};
export default VideoCardsList;
