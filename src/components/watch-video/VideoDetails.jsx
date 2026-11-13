import VideoDescription from "./VideoDescription";
import VideoAssociatedChannel from "./VideoAssociatedChannel";
import VideoActions from "./VideoActions";
import { useContext } from "react";
import WatchPageContext from "../../data/WatchPageContext";
import LiveChatOpener from "../live-chat/LiveChatOpener";

const VideoDetails = () => {
  const { watchVideo, isLive, chatDisabled } = useContext(WatchPageContext);
  const { title, channelId } = watchVideo.snippet;
  const { likeCount } = watchVideo.statistics;

  return (
    <div className="-mt-8 px-4 [grid-area:videodetails] lg:-mt-4 lg:px-0">
      <h1 className="text-fg-primary my-2 text-2xl font-bold">{title}</h1>
      <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
        <VideoAssociatedChannel channelId={channelId} />
        <VideoActions likeCount={likeCount} />
      </div>
      <div className="mt-4 flex flex-col flex-wrap gap-2 md:flex-row">
        <VideoDescription video={watchVideo} />
        {isLive && !chatDisabled && <LiveChatOpener />}
      </div>
    </div>
  );
};

export default VideoDetails;
