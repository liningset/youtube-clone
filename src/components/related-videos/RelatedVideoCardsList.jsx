import VideoCard, { VideoCardShimmer } from "../home-feed/VideoCard";
import { useContext } from "react";
import PaginationContext from "../../data/PaginationContext";

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
  const { pagination } = useContext(PaginationContext);
  const { channels } = pagination.data;

  if (/not (found|available|supported)/i.test(pagination.status.videos))
    return <div>this category is not available</div>;

  return pagination.nextPage === 0 ? (
    <RelatedVideoCardsListShimmer count={9} />
  ) : (
    <ul className="grid items-start grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 mb-4 lg:mb-0 w-full gap-4 lg:gap-2">
      {videos.map((video) => {
        const channel = channels.find(
          (channel) => channel?.id === video?.snippet?.channelId,
        );
        return <VideoCard data={video} channelData={channel} key={video?.id} />;
      })}
    </ul>
  );
};

export default RelatedVideoCardsList;
