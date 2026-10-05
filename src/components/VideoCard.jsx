import YoutubeIcon from "./YoutubeIcon";

const VideoCard = ({ data, channelData }) => {
  const { thumbnails, title, channelTitle } = data.snippet;
  const { duration } = data.contentDetails;
  const { viewCount } = data.statistics;
  const { thumbnails: channelThumbnails } = channelData?.snippet ?? {};

  return (
    <li className="group relative">
      <div className="absolute border-2 pointer-events-none border-grey-a8 inset-20 opacity-0 transition-all duration-400 ease rounded-2xl group-hover:opacity-100 group-hover:-inset-2"></div>
      <div
        className={`bg-bg-primary aspect-video relative overflow-hidden rounded-2xl`}
      >
        <img
          src={thumbnails.high.url}
          className="w-full h-full object-cover"
          alt="video thumbnail"
        />
        {duration && (
          <span className="absolute right-4 bottom-4 text-xs bg-grey-31 text-bg-primary p-0.5 rounded-xs opacity-75">
            {duration}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 mt-2">
        <div className="w-16 aspect-square rounded-full overflow-hidden bg-border-clr">
          <img src={channelThumbnails?.default?.url} alt="channel profile" />
        </div>
        <div className="w-full">
          <div className="flex w-full justify-between items-center">
            <h3 className="font-bold text-xl">{title}</h3>
            <button className="p-2 rounded-full self-start cursor-pointer transition-button border-bg-primary active:bg-grey-e8  active:border-grey-e8">
              <YoutubeIcon icon="threeDots" />
            </button>
          </div>
          <div>
            <span>{channelTitle}</span> • <span>{viewCount}</span> •{" "}
            <span>3 months ago</span>
          </div>
        </div>
      </div>
    </li>
  );
};
export default VideoCard;
