import useFetch from "../../hooks/useFetch";
import YoutubeIcon from "../common/YoutubeIcon";
import { useEffect, useRef, useState } from "react";
import {
  formatToViewsSummary,
  formatToTimeAgo,
  formatToDate,
  formatToDescription,
} from "../../utils/formatting";
import extractColor from "../../utils/extract-color";
import AskSigninPopoverContent from "../common/AskSigninPopoverContent";
import Popover from "../common/Popover";

const ButtonWrapper = ({ children, id, heading, sub }) => {
  const [showPopover, setShowPopover] = useState(false);

  return (
    <div
      onClick={() => setShowPopover(true)}
      className="popover-container relative"
      data-container-id={id}
    >
      {children}

      {showPopover && (
        <Popover closePopover={() => setShowPopover(false)} parentId={id}>
          <AskSigninPopoverContent heading={heading} sub={sub} />
        </Popover>
      )}
    </div>
  );
};

const VideoDescription = ({ video }) => {
  const { title, channelTitle, channelId, description, publishedAt } =
    video.snippet;
  const { viewCount, likeCount } = video.statistics;

  const [collapsed, setCollapsed] = useState(true);
  const [color, setColor] = useState(null);
  const [showPopover, setShowPopover] = useState(false);

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
    <div className="px-4 lg:px-0">
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
      <div className="flex flex-col sm:flex-row gap-4 w-full justify-between items-center">
        <div className="flex self-start gap-2 items-center">
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
          <ButtonWrapper
            id="subscribe"
            heading="Want to subscribe to this channel?"
            sub="Sign in to subscribe to this channel."
          >
            <button className="bg-fg-primary text-bg-primary cursor-pointer py-2 px-4 rounded-4xl">
              Subscribe
            </button>
          </ButtonWrapper>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="flex">
            <ButtonWrapper
              id="i-like-this"
              heading="Like this video?"
              sub="Sign in to make your opinion count."
            >
              <button
                title="I like this"
                className="flex h-10 rounded-s-4xl items-center gap-2 px-4 bg-grey-e8 cursor-pointer hover:bg-grey-d8"
              >
                <YoutubeIcon icon="like" />
                <span className="text-sm">
                  {formatToViewsSummary(likeCount)}
                </span>
              </button>
            </ButtonWrapper>

            <ButtonWrapper
              id="i-dislike-this"
              heading="Don't like this video?"
              sub="Sign in to make your opinion count."
            >
              <button
                title="I dislike this"
                className="h-10 rounded-e-4xl px-4 bg-grey-e8 cursor-pointer hover:bg-grey-d8 relative"
              >
                <div className="w-px h-[70%] top-1/2 -translate-y-1/2 absolute left-0 bg-grey-a8"></div>
                <YoutubeIcon icon="dislike" />
              </button>
            </ButtonWrapper>
          </div>
          <button
            title="Share"
            className="h-10 ms-auto flex justify-center items-center aspect-square rounded-full bg-grey-e8 cursor-pointer hover:bg-grey-d8"
          >
            <YoutubeIcon icon="share" />
          </button>
          <ButtonWrapper
            id="save-for-later"
            heading="Want to watch this again later?"
            sub="Sign in to add this video to a playlist."
          >
            <button
              title="Save"
              className="h-10 flex justify-center items-center aspect-square rounded-full bg-grey-e8 cursor-pointer hover:bg-grey-d8"
            >
              <YoutubeIcon icon="save" />
            </button>
          </ButtonWrapper>
          <div
            className="popover-container relative"
            data-container-id="report-video"
          >
            <button
              onClick={() => setShowPopover((prev) => !prev)}
              className="h-10 aspect-square flex justify-center items-center rounded-full bg-grey-e8 cursor-pointer hover:bg-grey-d8"
            >
              <YoutubeIcon icon="threeDots" tailwindStyles="rotate-90" />
            </button>
            {showPopover && (
              <Popover
                closePopover={() => setShowPopover(false)}
                parentId="report-video"
              >
                <button className="py-2 px-4 text-xs cursor-pointer flex gap-2 hover:bg-grey-e8 items-center">
                  <YoutubeIcon icon="report" /> Report
                </button>
              </Popover>
            )}
          </div>
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
