import { useEffect, useRef, useState } from "react";
import {
  formatToViewsSummary,
  formatToTimeAgo,
  formatToDate,
  formatToDescription,
} from "../../utils/formatting";
import extractColor from "../../utils/extract-color";

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
  }, []);

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
        onLoad={(e) => {
          const prominent = extractColor(e.target);

          setColor({
            "--prominent": prominent,
          });
        }}
      />
      <div className="flex gap-2 text-sm font-medium">
        <span className="whitespace-nowrap">
          {collapsed
            ? formatToViewsSummary(viewCount)
            : Number(viewCount).toLocaleString()}{" "}
          views
        </span>
        <span className="whitespace-nowrap">
          {collapsed ? formatToTimeAgo(publishedAt) : formatToDate(publishedAt)}
        </span>
        <ul className="flex gap-1 items-center overflow-hidden flex-wrap">
          {/((?<=\s)#[^\s#]+)/gi.test(description) &&
            description.match(/((?<=\s)#[^\s#]+)/gi).map((found, i) => (
              <a
                className="text-blue-500 cursor-pointer"
                href={"/results?q=" + found.replace("#", "")}
                key={i}
              >
                {found}
              </a>
            ))}
        </ul>
      </div>
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
