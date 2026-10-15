import VideoCard, { VideoCardShimmer } from "./VideoCard";
import { useContext } from "react";
import PaginationContext from "../utils/PaginationContext";
import { useSelector } from "react-redux";
import SearchedVideoCard, {
  SearchedVideoCardShimmer,
} from "./SearchedVideoCard";

export const VideoCardsListShimmer = ({ count }) => {
  const currentPage = useSelector((store) => store.app.currentPage);
  return (
    <ul
      className={`grid sm:px-5 ${currentPage === "searchpage" ? "" : "px-5 sm:grid-cols-2 lg:grid-cols-3"} items-start  gap-4`}
    >
      {Array.from({ length: count }, (_, i) =>
        currentPage === "searchpage" ? (
          <SearchedVideoCardShimmer key={i} />
        ) : (
          <VideoCardShimmer key={i} />
        ),
      )}
    </ul>
  );
};

const VideoCardsList = () => {
  const { searchState } = useContext(PaginationContext);
  const videos = searchState.videos;
  const currentPage = useSelector((store) => store.app.currentPage);

  if (/not (found|available|supported)/i.test(searchState.status))
    return <div>this category is not available</div>;

  return searchState.nextPage === 0 ? (
    <VideoCardsListShimmer count={9} />
  ) : (
    <ul
      className={`grid items-start sm:px-5 ${currentPage === "homepage" ? "px-5 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6 sm:gap-4`}
    >
      {videos.map((video) => {
        // const channel = channels.find(
        //   (channel) => channel?.id === video?.snippet?.channelId,
        // );

        return currentPage === "searchpage" ? (
          <SearchedVideoCard
            key={video?.id?.videoId}
            data={video}
            channelData={[]}
          />
        ) : (
          <VideoCard key={video?.id} data={video} channelData={[]} />
        );
      })}
      <SearchedVideoCardShimmer />
    </ul>
  );
};
export default VideoCardsList;
