import { useState } from "react";
import YoutubeIcon from "../common/YoutubeIcon";
import {
  formatToDuration,
  formatToViewsSummary,
  formatToTimeAgo,
} from "../../utils/formatting";
import extractColor from "../../utils/extract-color";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const VideoCard = ({ data, channelData }) => {
  const { thumbnails, title, channelTitle, publishedAt } = data.snippet;
  const { duration } = data.contentDetails;
  const { viewCount } = data.statistics;
  const { thumbnails: channelThumbnails } = channelData?.snippet ?? {};
  const [color, setColor] = useState(null);
  const page = useSelector((store) => store.app.currentPage);
  const navigate = useNavigate();

  const onLoad = async (e) => {
    const prominentColor = extractColor(e.target);

    setColor({
      "--prominent": prominentColor,
    });
  };

  const onCardClick = (e) => {
    if (!e.target.classList.contains("more")) navigate("/watch?v=" + data.id);
  };

  return (
    <li
      onClick={onCardClick}
      className={`group relative cursor-pointer ${page === "watchpage" ? "flex flex-col lg:flex-row w-full gap-2 items-start" : ""}`}
    >
      <div
        style={color}
        className={`absolute pointer-events-none inset-3 opacity-0 transition-all duration-300 ease group-hover:opacity-100 group-hover:bg-(--prominent) ${page === "watchpage" ? "group-hover:-inset-1 rounded-lg" : "group-hover:-inset-3 rounded-2xl"} ${color != null ? "" : " border border-grey-a8"}`}
      ></div>
      <div
        className={`bg-bg-primary aspect-video relative overflow-hidden ${page === "watchpage" ? " rounded-lg flex-2 w-full shrink-0" : "rounded-2xl"}`}
      >
        <img
          crossOrigin="anonymous"
          src={thumbnails.high.url}
          className="w-full h-full object-cover"
          alt="video thumbnail"
          onLoad={(e) => onLoad(e)}
        />
        {duration && (
          <span className="absolute right-4 bottom-4 text-xs bg-grey-31 text-bg-primary font-bold p-0.5 rounded-xs opacity-85">
            {formatToDuration(duration)}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 mt-2 flex-1 min-w-0">
        {page !== "watchpage" && (
          <div className="w-16 aspect-square rounded-full overflow-hidden bg-border-clr">
            <img src={channelThumbnails?.default?.url} alt="channel profile" />
          </div>
        )}
        <div className="w-full">
          <div className="flex w-full justify-between items-center">
            <h3
              className={`font-bold line-clamp-2 ${page === "watchpage" ? "text-sm" : "text-lg"}`}
            >
              {title}
            </h3>
            <button
              className={`more p-2 rounded-full self-start cursor-pointer ${page === "watchpage" ? "absolute bottom-0 right-0 hidden group-hover:block" : ""} transition-button border-bg-primary active:bg-grey-e8  active:border-grey-e8`}
            >
              <YoutubeIcon icon="threeDots" />
            </button>
          </div>
          <div
            className={`text-grey-31 ${page === "watchpage" ? "text-xs" : "text-sm flex gap-1"}`}
          >
            <span className="line-clamp-1">{channelTitle}</span>
            <div className="flex gap-2">
              <span>{formatToViewsSummary(viewCount)}</span> •{" "}
              <span>{formatToTimeAgo(publishedAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
export default VideoCard;

export const VideoCardShimmer = () => {
  const page = useSelector((store) => store.app.currentPage);

  return (
    <li
      className={`relative animate-pulse ${page === "watchpage" && "flex flex-col w-full lg:flex-row gap-2 items-start"}`}
      aria-hidden="true"
    >
      <div
        className={`bg-grey-a8 aspect-video relative ${page === "watchpage" ? "rounded-lg w-full lg:w-175" : "rounded-2xl flex-1"}`}
      ></div>
      <div
        className={`flex w-full items-center gap-2 ${page !== "watchpage" && "mt-2"}`}
      >
        {page !== "watchpage" && (
          <div className="w-16 aspect-square rounded-full bg-grey-a8"></div>
        )}
        <div className="w-full flex flex-col gap-2">
          <div className="h-6 w-9/12 mt-2 rounded-sm bg-grey-a8"></div>

          {page === "watchpage" && (
            <div className="h-4 w-[60%] mt-2 rounded-sm bg-grey-a8"></div>
          )}
          <div className="flex w-7/12 gap-2">
            <div className="h-4 w-14 flex-1 rounded-sm bg-grey-a8"></div>
            <div className="h-4 w-14 flex-1 rounded-sm bg-grey-a8"></div>
            {page !== "watchpage" && (
              <div className="h-4 w-14 flex-1 rounded-sm bg-grey-a8"></div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};
