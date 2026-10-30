import useFetch from "../hooks/useFetch";
import YoutubeIcon from "./YoutubeIcon";
import { useEffect, useRef, useState } from "react";
import {
  formatToViewsSummary,
  formatToTimeAgo,
  formatToDate,
  formatToDescription,
} from "../utils/formatting";
import extractColor from "../utils/extract-color";

const VideoDescription = ({ video }) => {
  const { title, channelTitle, channelId, description, publishedAt } =
    video.snippet;
  const { viewCount, likeCount } = video.statistics;

  const [collapsed, setCollapsed] = useState(true);
  const [color, setColor] = useState(null);

  const preRef = useRef(null);

  const onDescriptionClick = () => {
    if (!collapsed) return;
    setCollapsed(false);
  };

  const { data } = useFetch("channels", {
    id: channelId,
    part: "snippet,statistics",
  });
  const channelAvatar = data?.items[0]?.snippet?.thumbnails?.default?.url;
  const subscriberCount = data?.items[0]?.statistics?.subscriberCount;

  useEffect(() => {
    preRef.current.innerHTML = !description
      ? '<span class="opacity-75">No description has been added to this video<span>'
      : formatToDescription(description);
  }, []);

  return (
    <div>
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
      <h1 className="text-2xl text-fg-primary font-bold my-2">{title}</h1>
      <div className="flex w-full justify-between items-center">
        <div className="flex gap-2 items-center">
          <div className="w-12 aspect-square rounded-full overflow-hidden bg-border-clr">
            <img src={channelAvatar} alt="avatar" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-semibold text-md">{channelTitle}</h3>
            <span className="text-xs opacity-85">
              {subscriberCount && formatToViewsSummary(subscriberCount)}{" "}
              subscribers
            </span>
          </div>
          <button className="bg-fg-primary text-bg-primary cursor-pointer py-2 px-4 rounded-4xl">
            Subscribe
          </button>
        </div>
        <div className="flex gap-2">
          <div className="flex h-10 rounded-4xl overflow-hidden">
            <button
              title="I like this"
              className="flex items-center gap-2 px-4 bg-grey-e8 cursor-pointer hover:bg-grey-d8"
            >
              <YoutubeIcon icon="like" />
              <span className="text-sm">{formatToViewsSummary(likeCount)}</span>
            </button>

            <button
              title="I dislike this"
              className="h-10 px-4 bg-grey-e8 cursor-pointer hover:bg-grey-d8 relative"
            >
              <div className="w-px h-[70%] top-1/2 -translate-y-1/2 absolute left-0 bg-grey-a8"></div>
              <YoutubeIcon icon="dislike" />
            </button>
          </div>
          <button
            title="Share"
            className="h-10 flex justify-center items-center aspect-square rounded-full bg-grey-e8 cursor-pointer hover:bg-grey-d8"
          >
            <YoutubeIcon icon="share" />
          </button>
          <button
            title="Save"
            className="h-10 flex justify-center items-center aspect-square rounded-full bg-grey-e8 cursor-pointer hover:bg-grey-d8"
          >
            <YoutubeIcon icon="save" />
          </button>
          <button className="h-10 aspect-square flex justify-center items-center rounded-full bg-grey-e8 cursor-pointer hover:bg-grey-d8">
            <YoutubeIcon icon="threeDots" tailwindStyles="rotate-90" />
          </button>
        </div>
      </div>

      <div
        onClick={onDescriptionClick}
        style={color}
        className={`w-full mt-4 transition-button overflow-hidden p-3 scroll-mt-[25vh] bg-grey-e8 rounded-xl ${collapsed ? "cursor-pointer hover:bg-(--prominent) active:bg-grey-d8 active:border-grey-d8" : ""}`}
      >
        <div className="flex gap-2 text-sm font-medium">
          <span className="whitespace-nowrap">
            {collapsed
              ? formatToViewsSummary(viewCount)
              : Number(viewCount).toLocaleString()}{" "}
            views
          </span>
          <span className="whitespace-nowrap">
            {collapsed
              ? formatToTimeAgo(publishedAt)
              : formatToDate(publishedAt)}
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
    </div>
  );
};

export default VideoDescription;
