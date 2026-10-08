import VideoCard, { VideoCardShimmer } from "./VideoCard";
import useChannelAvatars from "../hooks/useChannelAvatars";
import { useContext } from "react";
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
  const { feed, nextPage } = useContext(PaginationContext);
  const { channels } = useChannelAvatars(feed);

  return nextPage === 0 ? (
    <VideoCardsListShimmer count={9} />
  ) : (
    <ul className="grid px-5 items-start sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {feed.map((video) => {
        const channel = channels.find(
          (channel) => channel?.id === video?.snippet?.channelId,
        );

        return <VideoCard key={video?.id} data={video} channelData={channel} />;
      })}
      {nextPage &&
        Array.from({ length: 6 }, (_, i) => <VideoCardShimmer key={i} />)}
    </ul>
  );
};
export default VideoCardsList;
