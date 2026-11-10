import { useNavigate } from "react-router";
import CardDetails from "./CardDetails";
import Thumbnail from "./Thumbnail";

const SearchResultCard = ({ data, channelData }) => {
  const {
    thumbnails,
    title,
    channelTitle,
    publishedAt,
    description,
    liveBroadcastContent,
  } = data.snippet;
  const { duration } = data?.contentDetails ?? { duration: "" };
  const { viewCount } = data?.statistics ?? { viewCount: "" };
  const { thumbnails: channelThumbnails } = channelData?.snippet ?? {};
  const navigate = useNavigate();

  const onCardClick = (e) => {
    if (!e.target.classList.contains("more"))
      navigate("/watch?v=" + data.id.videoId);
  };

  return (
    <li
      onClick={onCardClick}
      className="group sm:p-1 relative flex flex-col gap-4 sm:flex-row transition-button active:not-has-[.more:active]:bg-grey-e8 active:not-has-[.more:active]:border-grey-e8 rounded-2xl cursor-pointer"
    >
      <Thumbnail
        thumbnails={thumbnails}
        duration={duration}
        liveStatus={liveBroadcastContent}
      />
      <CardDetails
        title={title}
        channelTitle={channelTitle}
        publishedAt={publishedAt}
        viewCount={viewCount}
        channelThumbnails={channelThumbnails}
        description={description}
        liveStatus={liveBroadcastContent}
        liveDetails={data?.liveStreamingDetails}
      />
    </li>
  );
};
export default SearchResultCard;

export const SearchResultCardShimmer = () => {
  return (
    <li
      className="relative flex flex-col sm:flex-row animate-pulse gap-4 sm:p-1"
      aria-hidden="true"
    >
      <div className="bg-grey-a8 flex-4 aspect-video relative sm:rounded-2xl w-full min-w-50 sm:w-5/12"></div>
      <div className="flex px-5 sm:px-0 flex-6 items-center w-full flex-col gap-4">
        <div className="w-full flex flex-col gap-2">
          <div className="h-6 w-9/12 rounded-sm bg-grey-a8"></div>
          <div className="flex w-2/12 gap-2">
            <div className="h-4 w-14 flex-1 rounded-sm bg-grey-a8"></div>
            <div className="h-4 w-14 flex-1 rounded-sm bg-grey-a8"></div>
          </div>
        </div>
        <div className="flex self-start gap-2 items-center ">
          <div className="w-8 aspect-square rounded-full bg-grey-a8"></div>
          <div className="h-4 w-14 flex-1 rounded-sm bg-grey-a8"></div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="w-full h-4 bg-grey-a8 rounded-sm"></div>
          <div className="w-10/12 h-4 bg-grey-a8 rounded-sm"></div>
        </div>
      </div>
    </li>
  );
};
