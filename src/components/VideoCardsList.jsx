import VideoCard, { VideoCardShimmer } from "./VideoCard";
import { useContext } from "react";
import PaginationContext from "../utils/PaginationContext";
import { useSelector } from "react-redux";
import SearchedVideoCard from "./SearchedVideoCard";

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
  const { pagination } = useContext(PaginationContext);
  const { videos, channels } = pagination.data;
  const currentPage = useSelector((store) => store.app.currentPage);

  if (/not (found|available|supported)/i.test(pagination.status))
    return <div>this category is not available</div>;

  return pagination.nextPage === 0 ? (
    <VideoCardsListShimmer count={9} />
  ) : (
    <ul
      className={`grid items-start sm:px-5 ${currentPage === "homepage" ? "px-5 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6 sm:gap-4`}
    >
      {videos.map((video) => {
        const channel = channels.find(
          (channel) => channel?.id === video?.snippet?.channelId,
        );

        return currentPage === "searchpage" ? (
          <SearchedVideoCard
            key={video?.id?.videoId}
            data={video}
            channelData={channel}
          />
        ) : (
          <VideoCard key={video?.id} data={video} channelData={channel} />
        );
      })}
    </ul>
  );
};
export default VideoCardsList;
