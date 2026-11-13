import IncludePopover from "./IncludePopover";
import { formatToViewsSummary } from "../../utils/formatting";
import useFetch from "../../hooks/useFetch";

const VideoAssociatedChannel = ({ channelId }) => {
  const { data } = useFetch("channels", {
    id: channelId,
    part: "snippet,statistics",
  });
  const channelAvatar = data?.items[0]?.snippet?.thumbnails?.default?.url;
  const subscriberCount = data?.items[0]?.statistics?.subscriberCount;
  const channelTitle = data?.items[0]?.snippet?.title;

  return (
    <div className="flex self-start gap-4 items-center">
      <div className="w-12 aspect-square rounded-full overflow-hidden bg-border-clr">
        <img src={channelAvatar} alt="avatar" />
      </div>
      <div className="flex flex-col">
        <h3 className="font-semibold text-md">{channelTitle}</h3>
        <span className="text-xs opacity-85">
          {subscriberCount && formatToViewsSummary(subscriberCount)} subscribers
        </span>
      </div>
      <IncludePopover
        id="subscribe"
        heading="Want to subscribe to this channel?"
        sub="Sign in to subscribe to this channel."
      >
        <button className="bg-fg-primary text-bg-primary cursor-pointer py-2 px-4 rounded-4xl">
          Subscribe
        </button>
      </IncludePopover>
    </div>
  );
};

export default VideoAssociatedChannel;
