import VideoCard, { VideoCardShimmer } from "./VideoCard";
import { useContext } from "react";
import PaginationContext from "../utils/PaginationContext";

export const VideoCardsListShimmer = ({ count }) => {
  return (
    <ul
      className={`grid sm:px-5 px-5 sm:grid-cols-2 lg:grid-cols-3 items-start  gap-4`}
    >
      {Array.from({ length: count }, (_, i) => (
        <VideoCardShimmer key={i} />
      ))}
    </ul>
  );
};

const VideoCardsList = () => {
  const { pagination } = useContext(PaginationContext);
  const { videos, channels } = pagination.data;

  if (/not (found|available|supported)/i.test(pagination.status.videos))
    return <div>this category is not available</div>;

  return pagination.nextPage === 0 ? (
    <VideoCardsListShimmer count={9} />
  ) : (
    <ul
      className={`grid items-start sm:px-5 px-5 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-4`}
    >
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
