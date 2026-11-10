import YoutubeIcon from "../common/YoutubeIcon";
import ViewsAndDate from "./ViewsAndDate";

const CardDetails = ({
  isWatchPage,
  channelThumbnails,
  title,
  channelTitle,
  viewCount,
  publishedAt,
  isLive,
  liveDetails,
}) => {
  return (
    <div className="flex items-center gap-2 mt-2 flex-1 min-w-0">
      {!isWatchPage && (
        <div className="w-16 aspect-square rounded-full overflow-hidden bg-border-clr">
          <img src={channelThumbnails?.default?.url} alt="channel profile" />
        </div>
      )}
      <div className="w-full">
        <div className="flex w-full justify-between items-center">
          <h3
            className={`font-bold line-clamp-2 ${isWatchPage ? "text-sm" : "text-lg"}`}
          >
            {title}
          </h3>
          <button
            className={`more p-2 rounded-full self-start cursor-pointer ${isWatchPage && "absolute bottom-0 right-0 hidden group-hover:block"} transition-button border-bg-primary active:bg-grey-e8  active:border-grey-e8`}
          >
            <YoutubeIcon icon="threeDots" />
          </button>
        </div>
        <div
          className={`text-grey-31 ${isWatchPage ? "text-xs" : "text-sm flex gap-2"}`}
        >
          <span className="line-clamp-1 max-w-[50%]">{channelTitle}</span>
          <ViewsAndDate
            viewCount={viewCount}
            publishedAt={publishedAt}
            isLive={isLive}
            liveDetails={liveDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
