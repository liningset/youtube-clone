import VideoCard, { VideoCardShimmer } from "./VideoCard";
import { useContext } from "react";
import PaginationContext from "../utils/PaginationContext";
import { useSelector } from "react-redux";
import Error from "./Error";

export const VideoCardsListShimmer = ({ count }) => {
  const page = useSelector((store) => store.app.currentPage);
  return (
    <ul
      className={`grid ${page === "watchpage" ? "grid-cols-1 gap-2 mt-2" : "px-5 sm:grid-cols-2 lg:grid-cols-3 gap-4"} items-start`}
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
    return (
      <Error message="This category does not have any videos at the moment" />
    );

  return pagination.nextPage === 0 ? (
    <VideoCardsListShimmer count={9} />
  ) : (
    <ul
      className={`grid items-start ${page === "watchpage" ? "grid-cols-1 gap-2 mt-2" : "sm:grid-cols-2 lg:grid-cols-3 px-5 gap-6 sm:gap-4"}`}
    >
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
