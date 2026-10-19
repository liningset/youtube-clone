import { useContext } from "react";
import PaginationContext from "../utils/PaginationContext";
import SearchResultCard, { SearchResultCardShimmer } from "./SearchResultCard";
import { Link } from "react-router";

export const SearchResultsListShimmer = ({ count }) => {
  return (
    <ul className={`grid sm:px-5 items-start  gap-4`}>
      {Array.from({ length: count }, (_, i) => (
        <SearchResultCardShimmer key={i} />
      ))}
    </ul>
  );
};

const SearchResultsList = () => {
  const { pagination, searchState } = useContext(PaginationContext);
  const { videos: videosExtra, channels } = pagination.data;
  const videos = searchState.videos;

  return searchState.nextPage === 0 ? (
    <SearchResultsListShimmer count={9} />
  ) : (
    <ul className={`grid items-start sm:px-5 grid-cols-1 gap-6 sm:gap-4`}>
      {videos.map((video) => {
        const channel = channels.find(
          (channel) => channel?.id === video?.snippet?.channelId,
        );
        const videoExtra = videosExtra.find(
          (v) => v?.id === video?.id?.videoId,
        );

        return (
          <Link to={`/watch?v=${video?.id?.videoId}`} key={video?.id?.videoId}>
            <SearchResultCard
              data={{
                ...video,
                statistics: videoExtra?.statistics,
                contentDetails: videoExtra?.contentDetails,
              }}
              channelData={channel}
            />
          </Link>
        );
      })}
    </ul>
  );
};
export default SearchResultsList;
