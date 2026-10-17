import YoutubeIcon from "./YoutubeIcon";
import { toDuration, toViews, toPublishedDate } from "../utils/functions";
import { Link } from "react-router";

const SearchResultCard = ({ data, channelData }) => {
  const { thumbnails, title, channelTitle, publishedAt, description } =
    data.snippet;
  const { duration } = data?.contentDetails ?? { duration: "" };
  const { viewCount } = data?.statistics ?? { viewCount: "" };
  const { thumbnails: channelThumbnails } = channelData?.snippet ?? {};

  return (
    <li className="group sm:p-1 relative flex flex-col gap-4 sm:flex-row transition-button active:bg-grey-e8 active:border-grey-e8 rounded-2xl cursor-pointer">
      <div
        className={`bg-bg-primary flex-4 aspect-video relative overflow-hidden sm:rounded-2xl w-full min-w-50 sm:w-5/12`}
      >
        <img
          crossOrigin="anonymous"
          src={thumbnails?.standard?.url ?? thumbnails?.high?.url}
          className="w-full h-full object-cover"
          alt="video thumbnail"
        />
        {duration && (
          <span className="absolute right-4 bottom-4 text-xs bg-grey-31 text-bg-primary p-0.5 font-bold rounded-xs opacity-85">
            {toDuration(duration)}
          </span>
        )}
      </div>
      <div className="flex flex-6 flex-col gap-4 px-5 sm:px-0">
        <div className="w-full flex justify-between ">
          <div className="flex flex-col">
            <h3 className="font-bold line-clamp-2 text-lg" title={title}>
              {title}
            </h3>
            <div className="text-xs opacity-70 text-grey-31">
              <span>{toViews(viewCount)}</span> •{" "}
              <span>{toPublishedDate(publishedAt)}</span>
            </div>
          </div>
          <button className="p-2 rounded-full self-start cursor-pointer transition-button border-bg-primary active:bg-grey-e8  active:border-grey-e8">
            <YoutubeIcon icon="threeDots" />
          </button>
        </div>
        <Link
          to={`/channel/${channelData?.id?.videoId}`}
          className="flex gap-2 items-center self-start"
          title={channelTitle}
        >
          <div className="w-6 aspect-square rounded-full overflow-hidden bg-border-clr">
            <img src={channelThumbnails?.default?.url} alt="Avatar" />
          </div>
          <span className="opacity-70 hover:opacity-100 text-xs">
            {channelTitle}
          </span>
        </Link>
        <p className="text-xs opacity-70" title="From the video description">
          {description}
        </p>
      </div>
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
