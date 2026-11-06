import { useEffect, useRef, useState } from "react";
import { formatToDescription } from "../../utils/formatting";
import extractColor from "../../utils/extract-color";
import VideoViewsAndDate from "./VideoViewsAndDate";

const VideoDescription = ({ video }) => {
  const { description, publishedAt } = video.snippet;
  const { viewCount } = video.statistics;

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
      className={`w-full mt-4 transition-button overflow-hidden p-3 scroll-mt-[25vh] bg-grey-e8 rounded-xl ${collapsed ? "cursor-pointer hover:bg-(--prominent) active:bg-grey-d8 active:border-grey-d8" : ""}`}
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
      />
      <pre
        ref={preRef}
        className={`whitespace-pre-wrap text-sm font-roboto ${collapsed ? "line-clamp-3" : ""}`}
      ></pre>
      {!collapsed && (
        <button
          className="mt-8 cursor-pointer font-medium text-sm"
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
