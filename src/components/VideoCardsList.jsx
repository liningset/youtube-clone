import VideoCard, { VideoCardShimmer } from "./VideoCard";
import { useContext } from "react";
import PaginationContext from "../utils/PaginationContext";
import { Link } from "react-router";
import { useSelector } from "react-redux";

export const VideoCardsListShimmer = ({ count }) => {
  const page = useSelector((store) => store.app.currentPage);
  return (
    <ul
      className={`grid ${page === "watchpage" ? "grid-cols-1" : "px-5 sm:grid-cols-2 lg:grid-cols-3"} items-start  gap-4`}
    >
      {Array.from({ length: count }, (_, i) => (
        <VideoCardShimmer key={i} />
      ))}
    </ul>
  );
};

const VideoCardsList = () => {
  const page = useSelector((store) => store.app.currentPage);
  const { pagination } = useContext(PaginationContext);
  const { videos, channels } = pagination.data;

  if (/not (found|available|supported)/i.test(pagination.status.videos))
    return <div>this category is not available</div>;

  return pagination.nextPage === 0 ? (
    <VideoCardsListShimmer count={9} />
  ) : (
    <ul
      className={`grid items-start ${page === "watchpage" ? "grid-cols-1" : "sm:grid-cols-2 lg:grid-cols-3 px-5"} gap-6 sm:gap-4`}
    >
      {videos.map((video) => {
        const channel = channels.find(
          (channel) => channel?.id === video?.snippet?.channelId,
        );

        return (
          <Link to={`/watch?v=${video?.id}`} key={video?.id}>
            <VideoCard data={video} channelData={channel} />
          </Link>
        );
      })}
    </ul>
  );
};
export default VideoCardsList;
