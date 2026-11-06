import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Thumbnail from "./Thumbnail";
import CardDetails from "./CardDetails";

const VideoCard = ({ data, channelData }) => {
  const { thumbnails, title, channelTitle, publishedAt } = data.snippet;
  const { duration } = data.contentDetails;
  const { viewCount } = data.statistics;
  const { thumbnails: channelThumbnails } = channelData?.snippet ?? {};
  const [color, setColor] = useState(null);
  const isWatchPage = useSelector(
    (store) => store.app.currentPage === "watchpage",
  );
  const navigate = useNavigate();

  const onCardClick = (e) => {
    if (!e.target.closest(".more")) navigate("/watch?v=" + data.id);
  };

  return (
    <li
      onClick={onCardClick}
      className={`group relative cursor-pointer ${isWatchPage && "flex flex-col lg:flex-row w-full gap-2 items-start"}`}
    >
      <div
        style={color}
        className={`absolute pointer-events-none inset-3 opacity-0 transition-all duration-300 ease group-hover:opacity-100 group-hover:bg-(--prominent) ${isWatchPage ? "group-hover:-inset-1 rounded-lg" : "group-hover:-inset-3 rounded-2xl"} ${color != null ? "" : " border border-grey-a8"}`}
      ></div>
      <Thumbnail
        isWatchPage={isWatchPage}
        thumbnails={thumbnails}
        setColor={setColor}
        duration={duration}
      />
      <CardDetails
        isWatchPage={isWatchPage}
        title={title}
        channelTitle={channelTitle}
        publishedAt={publishedAt}
        viewCount={viewCount}
        channelThumbnails={channelThumbnails}
      />
    </li>
  );
};
export default VideoCard;

export const VideoCardShimmer = () => {
  const isWatchPage = useSelector(
    (store) => store.app.currentPage === "watchpage",
  );

  return (
    <li
      className={`relative animate-pulse ${isWatchPage && "flex flex-col w-full lg:flex-row gap-2 items-start"}`}
      aria-hidden="true"
    >
      <div
        className={`bg-grey-a8 aspect-video relative ${isWatchPage ? "rounded-lg w-full lg:w-175" : "rounded-2xl flex-1"}`}
      ></div>
      <div
        className={`flex w-full items-center gap-2 ${!isWatchPage && "mt-2"}`}
      >
        {!isWatchPage && (
          <div className="w-16 aspect-square rounded-full bg-grey-a8"></div>
        )}
        <div className="w-full flex flex-col gap-2">
          <div className="h-6 w-9/12 mt-2 rounded-sm bg-grey-a8"></div>

          {isWatchPage && (
            <div className="h-4 w-[60%] mt-2 rounded-sm bg-grey-a8"></div>
          )}
          <div className="flex w-7/12 gap-2">
            <div className="h-4 w-14 flex-1 rounded-sm bg-grey-a8"></div>
            <div className="h-4 w-14 flex-1 rounded-sm bg-grey-a8"></div>
            {!isWatchPage && (
              <div className="h-4 w-14 flex-1 rounded-sm bg-grey-a8"></div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};
