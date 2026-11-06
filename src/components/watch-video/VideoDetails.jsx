import VideoDescription from "./VideoDescription";
import VideoAssociatedChannel from "./VideoAssociatedChannel";
import VideoActions from "./VideoActions";

const VideoDetails = ({ video }) => {
  const { title, channelTitle, channelId } = video.snippet;
  const { likeCount } = video.statistics;

  return (
    <div className="px-4 lg:px-0">
      <h1 className="text-2xl text-fg-primary font-bold my-2">{title}</h1>
      <div className="flex flex-col sm:flex-row gap-4 w-full justify-between items-center">
        <VideoAssociatedChannel
          channelId={channelId}
          channelTitle={channelTitle}
        />
        <VideoActions likeCount={likeCount} />
      </div>
      <VideoDescription video={video} />
    </div>
  );
};

export default VideoDetails;
