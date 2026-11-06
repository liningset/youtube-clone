import VideoCard, { VideoCardShimmer } from "./VideoCard";
import { useContext } from "react";
import PaginationContext from "../../data/PaginationContext";
import Error from "../common/Error";

export const VideoCardsListShimmer = ({ count }) => {
  return (
    <ul className="grid px-5 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
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
    return (
      <Error message="This category does not have any videos at the moment" />
    );

  if (pagination.nextPage === 0) return <VideoCardsListShimmer count={9} />;

  return (
    <ul className="grid items-start sm:grid-cols-2 lg:grid-cols-3 px-5 gap-6 sm:gap-4">
      {videos.map((video) => {
        const channel = channels.find(
          (channel) => channel?.id === video?.snippet?.channelId,
        );

        return <VideoCard data={video} channelData={channel} key={video?.id} />;
      })}
    </ul>
  );
};
export default VideoCardsList;
