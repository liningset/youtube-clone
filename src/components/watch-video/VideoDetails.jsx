import VideoDescription from "./VideoDescription";
import VideoAssociatedChannel from "./VideoAssociatedChannel";
import VideoActions from "./VideoActions";
import { useContext } from "react";
import WatchPageContext from "../../data/WatchPageContext";

const VideoDetails = () => {
  const { watchVideo } = useContext(WatchPageContext);
  const { title, channelId } = watchVideo.snippet;
  const { likeCount } = watchVideo.statistics;

  return (
    <div className="px-4 lg:px-0">
      <h1 className="text-2xl text-fg-primary font-bold my-2">{title}</h1>
      <div className="flex flex-col sm:flex-row gap-4 w-full justify-between items-center">
        <VideoAssociatedChannel channelId={channelId} />
        <VideoActions likeCount={likeCount} />
      </div>
      <VideoDescription video={watchVideo} />
    </div>
  );
};

export default VideoDetails;
