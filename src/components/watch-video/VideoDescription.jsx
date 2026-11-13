import { useContext, useEffect, useRef, useState } from "react";
import { formatToDescription } from "../../utils/formatting";
import extractColor from "../../utils/extract-color";
import VideoViewsAndDate from "./VideoViewsAndDate";
import WatchPageContext from "../../data/WatchPageContext";

const VideoDescription = ({ video }) => {
  const { description, publishedAt } = video.snippet;
  const { viewCount } = video.statistics;
  const { isLive, watchVideo, chatDisabled } = useContext(WatchPageContext);

  const liveDetails = watchVideo?.liveStreamingDetails;

  const [collapsed, setCollapsed] = useState(true);
  const [color, setColor] = useState(null);

  const preRef = useRef(null);

  const onDescriptionClick = () => {
    if (!collapsed) return;
    setCollapsed(false);
  };

  useEffect(() => {
    preRef.current.innerHTML = !description
      ? '<span class="opacity-75">No description has been added to this video<span>'
      : formatToDescription(description);
  }, [description]);

  return (
    <div
      onClick={onDescriptionClick}
      style={color}
      className={`transition-button bg-grey-f8 scroll-mt-[25vh] overflow-hidden rounded-xl p-3 ${collapsed ? `active:bg-grey-d8 active:border-grey-d8 cursor-pointer hover:bg-(--prominent) ${isLive && !chatDisabled ? "md:w-1/2" : "md:w-full"}` : "w-full"}`}
    >
      <img
        src={video?.snippet?.thumbnails?.default.url}
        aria-hidden="true"
        className="hidden"
        crossOrigin="anonymous"
        onLoad={(e) => setColor({ "--prominent": extractColor(e.target) })}
      />
      <VideoViewsAndDate
        viewCount={viewCount}
        publishedAt={publishedAt}
        collapsed={collapsed}
        description={description}
        isLive={isLive}
        liveDetails={liveDetails}
      />
      <pre
        ref={preRef}
        className={`font-roboto text-sm whitespace-pre-wrap ${collapsed ? "line-clamp-3" : ""}`}
      ></pre>
      {!collapsed && (
        <button
          className="mt-8 cursor-pointer text-sm font-medium"
          onClick={(e) => {
            setCollapsed(true);
            const toBeScrolled = e.target.closest("div");
            toBeScrolled.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        >
          Show less
        </button>
      )}
    </div>
  );
};

export default VideoDescription;
