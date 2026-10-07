import { useState } from "react";
import YoutubeIcon from "./YoutubeIcon";
// import { extractColorsFromImage } from "extract-colors";
import { toDuration, toViews, toPublishedDate } from "../utils/functions";
import extractColor from "../utils/extract-color";

const VideoCard = ({ data, channelData }) => {
  console.log(data);

  const { thumbnails, title, channelTitle, publishedAt } = data.snippet;
  const { duration } = data.contentDetails;
  const { viewCount } = data.statistics;
  const { thumbnails: channelThumbnails } = channelData?.snippet ?? {};
  const [color, setColor] = useState(null);

  const onLoad = async (e) => {
    const prominentColor = extractColor(e.target);

    setColor({
      "--prominent": prominentColor,
    });
  };

  return (
    <li className="group relative">
      <div
        style={color}
        className={`absolute pointer-events-none inset-10 opacity-0 transition-all duration-300 ease rounded-2xl group-hover:opacity-100 group-hover:bg-(--prominent) group-hover:-inset-2 ${color != null ? "" : " border-2 border-grey-a8"}`}
      ></div>
      <div
        className={`bg-bg-primary aspect-video relative overflow-hidden rounded-2xl`}
      >
        <img
          crossOrigin="anonymous"
          src={thumbnails.high.url}
          className="w-full h-full object-cover"
          alt="video thumbnail"
          onLoad={(e) => onLoad(e)}
        />
        {duration && (
          <span className="absolute right-4 bottom-4 text-xs bg-grey-31 text-bg-primary p-0.5 rounded-xs opacity-75">
            {toDuration(duration)}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 mt-2">
        <div className="w-16 aspect-square rounded-full overflow-hidden bg-border-clr">
          <img src={channelThumbnails?.default?.url} alt="channel profile" />
        </div>
        <div className="w-full">
          <div className="flex w-full justify-between items-center">
            <h3 className="font-bold line-clamp-2 text-lg">{title}</h3>
            <button className="p-2 rounded-full self-start cursor-pointer transition-button border-bg-primary active:bg-grey-e8  active:border-grey-e8">
              <YoutubeIcon icon="threeDots" />
            </button>
          </div>
          <div className="text-sm text-grey-31">
            <span>{channelTitle}</span> • <span>{toViews(viewCount)}</span> •{" "}
            <span>{toPublishedDate(publishedAt)}</span>
          </div>
        </div>
      </div>
    </li>
  );
};
export default VideoCard;

export const VideoCardShimmer = () => {
  return (
    <li className="relative animate-pulse" aria-hidden="true">
      <div className={`bg-grey-a8 aspect-video relative rounded-2xl`}></div>
      <div className="flex items-center gap-2 mt-2">
        <div className="w-16 aspect-square rounded-full bg-grey-a8"></div>
        <div className="w-full flex flex-col gap-2">
          <div className="h-6 w-9/12 mt-2 rounded-sm bg-grey-a8"></div>
          <div className="flex w-7/12 gap-2">
            <div className="h-4 w-14 flex-1 rounded-sm bg-grey-a8"></div>
            <div className="h-4 w-14 flex-1 rounded-sm bg-grey-a8"></div>
            <div className="h-4 w-14 flex-1 rounded-sm bg-grey-a8"></div>
          </div>
        </div>
      </div>
    </li>
  );
};
